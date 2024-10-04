import { UserVo } from "../vo/UserVo";

export class UserMapper {
  toVo(user: any): UserVo {
    return new UserVo(
      user._id.toString(),
      user.firstName,
      user.lastName,
      user.phone,
      user.email,
      user.ci,
      user.firstLogin,
    );
  }
}
