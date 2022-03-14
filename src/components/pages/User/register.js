import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
// import { register, clearErrors } from '../../actions/userActions';
import MetaData from '../../../components/Layout/MetaData';
import {addUser} from "../../../helpers/backend_helper";

const Register = ({ history }) => {
    const initialState = {
        name: '',
        email: '',
        password: '',
        mobile: "+8801981998640",
        role: "admin"

    }
    const [user, setUser] = useState(initialState);

    // const { loading, error } = useSelector((state) => state.auth);

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(
        '/images/default_avatar.jpg'
    );
    const loading=false;

    // const dispatch = useDispatch();
    // const alert = useAlert();
    //
    // useEffect(() => {
    //     if (error) {
    //         alert.error(error);
    //         dispatch(clearErrors());
    //     }
    // }, [error, alert, dispatch, history]);

    const handleChange = e => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.set('name', name);
        // formData.set('email', email);
        // formData.set('password', password);
        // formData.set('avatar', avatar);
        // dispatch(register(formData))

        await addUser(user);
    }

    return (
        <>
            <MetaData title="register" />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        onSubmit={handleSubmit}
                        className="shadow-lg"
                        encType="multipart/form-data">
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                className="form-control"
                                onChange={handleChange}
                                value={user.name}
                                type="name"
                                id="name_field"
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                onChange={handleChange}
                                value={user.email}
                                className="form-control"
                                name="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                onChange={handleChange}
                                value={user.password}
                                id="password_field"
                                className="form-control"
                                name="password"
                            />
                        </div>

                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="avatar_upload">Avatar</label>*/}
                        {/*    <div className="d-flex align-items-center">*/}
                        {/*        <div>*/}
                        {/*            <figure className="avatar mr-3 item-rtl">*/}
                        {/*                <img*/}
                        {/*                    src={avatarPreview}*/}
                        {/*                    className="rounded-circle"*/}
                        {/*                    alt="avatar preview"*/}
                        {/*                />*/}
                        {/*            </figure>*/}
                        {/*        </div>*/}
                        {/*        <div className="custom-file">*/}
                        {/*            <input*/}
                        {/*                type="file"*/}
                        {/*                name="avatar"*/}
                        {/*                className="custom-file-input"*/}
                        {/*                id="customFile"*/}
                        {/*                accept='images/*'*/}
                        {/*                onChange={handleChange}*/}

                        {/*            />*/}
                        {/*            <label*/}
                        {/*                className="custom-file-label"*/}
                        {/*                htmlFor="customFile">*/}
                        {/*                Choose Avatar*/}
                        {/*            </label>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                        <Link to="/login" className="float-right mt-3">Already have an account? Log in</Link>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
