import { UserVo } from "../vo/UserVo";

const userMapper = (user: any) => {
  return new UserVo(
    user._id.toString(),
    user.firstName,
    user.lastName,
    user.phone,
    user.email,
    user.ci,
    user.firstLogin,
  );
};
export default userMapper;
