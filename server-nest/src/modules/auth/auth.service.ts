import { UserService } from '../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import * as mongoose from "mongoose";
import {PermissionService} from "../permission/permission.service";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
              private readonly userService: UserService,
              private readonly permissionService: PermissionService) { }

  async createToken(user: JwtPayload) {
    // const user: JwtPayload = { email: 'test@email.com' };
    console.log("createToken user----",user);
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 100000,
      accessToken,
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    // Validate if token passed along with HTTP request
    // is associated with any registered account in the database
    return await this.userService.findByUsername({ username, password });
  }
  async searchPermissions(roleId: mongoose.Types.ObjectId) {
    return await this.permissionService.searchPermissions(roleId);
  }
}
