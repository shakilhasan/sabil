import express from "express";
import jwt from "jsonwebtoken";
import {v4 as uuidv4} from "uuid";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import {handleValidation} from "../../common/middlewares";
import {validateRegistration, validateUsername} from "./request";
import {checkUser, searchOne, changePassword, tryCreateUser, searchPermissions} from "./service";
import config from "config";

const JWT_SECRET = config.get<string>("jwt.secret");
const JWT_EXPIRES_IN = config.get<string>("jwt.accessTokenExpiresIn");
const authRouter = express.Router();
const modelName = "User";

const createUserHandler = async (req: any, res: any, next: any) => {
    try {
        const user = req.body;
        const id = await tryCreateUser(user);
        if (!id) {
            return res.status(400).send({
                status: "error",
                message: "User already exists by username or email or phone number.",
            });
        }
        return res
            .status(201)
            .send({status: "ok", message: "User created successfully", id});
    } catch (error) {
        return next(error);
    }
};

const loginHandler = async (req: any, res: any) => {
    if (req.body.username && req.body.password) {
        const user = await checkUser(req.body.username, req.body.password);
        if (user) {
            const permissions = await searchPermissions(user.roleId);
            const token = jwt.sign(
                {
                    id: user._id,
                    username: req.body.username,
                    roleId: user.roleId,
                    exp:
                        Math.floor(Date.now() / 1000) +
                        parseInt(JWT_EXPIRES_IN, 10),
                },
                JWT_SECRET
            );
            const {passwordHash, ...rest} = user;

            const antdPayload = {
                status: "ok",
                accessToken: token,
                type: "account",
                currentAuthority: "admin",
                user: rest,
                permissions,
                sessionId: uuidv4(),
                userInfo: {
                    name: "Serati Ma",
                    avatar:
                        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
                    userid: "00000001",
                    email: "antdesign@alipay.com",
                    signature: "海纳百川，有容乃大",
                    title: "交互专家",
                    group: "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED",
                    tags: [
                        {
                            key: "0",
                            label: "很有想法的",
                        },
                        {
                            key: "1",
                            label: "专注设计",
                        },
                        {
                            key: "2",
                            label: "辣~",
                        },
                        {
                            key: "3",
                            label: "大长腿",
                        },
                        {
                            key: "4",
                            label: "川妹子",
                        },
                        {
                            key: "5",
                            label: "海纳百川",
                        },
                    ],
                    notifyCount: 12,
                    unreadCount: 11,
                    country: "China",
                    access: "admin",
                    geographic: {
                        province: {
                            label: "浙江省",
                            key: "330000",
                        },
                        city: {
                            label: "杭州市",
                            key: "330100",
                        },
                    },
                    address: "西湖区工专路 77 号",
                    phone: "0752-268888888",
                },
            };

            res.status(200).send(antdPayload);
            return;
        }
    }

    res.status(400).send("Invalid username or password xyz");
};

const forgotPasswordHandler = async (req: any, res: any) => {
    if (req.body.email) {
        const user = await searchOne({email: req.body.email}, modelName);
        if (user) {
            const newPassword = "a123"; // we will replace this and set from random string when we have the email service
            await changePassword(user, newPassword);
            res.status(200).send("Password changed successfully");
            return;
        }
    }

    res.status(400).send("Invalid email");
};

const checkUsernameHandler = async (req: any, res: any) => {
    const user = await searchOne(
        {username: req.body.username.toLowerCase()},
        modelName
    );
    if (user) {
        return res
            .status(400)
            .send({status: "unavailable", message: "Username is taken"});
    }
    return res
        .status(200)
        .send({status: "available", message: "Username is available"});
};

// add user
async function postHandler(req: any, res: any) {
    // todo remove later by /register
    // eslint-disable-next-line no-console
    console.log("postHandler....");
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const newUser = new mongoose.models[modelName]({
        ...req.body,
        passwordHash,
    });
    // generate token
    const accessToken = jwt.sign(
        {
            id: newUser._id,
            roleId: newUser?.roleId,
            username: newUser?.username,
            exp:
                Math.floor(Date.now() / 1000) +
                parseInt(JWT_EXPIRES_IN, 10),
        },
        JWT_SECRET
    );
    // postHandler user or send error
    try {
        await newUser.save();
        res.status(200).send({user: newUser, accessToken});
    } catch (err) {
        console.error("error---------", err);
        res
            .status(500)
            .json({errors: {common: {msg: "Unknown error occurred!"}}});
    }
}

authRouter.post("/signup", postHandler); // todo remove later by /register
authRouter.post(
    "/register",
    handleValidation(validateRegistration),
    createUserHandler
);
authRouter.post("/login", loginHandler);
authRouter.post("/forgotPassword", forgotPasswordHandler);
authRouter.post(
    "/check-username",
    handleValidation(validateUsername),
    checkUsernameHandler
);

export {authRouter};
