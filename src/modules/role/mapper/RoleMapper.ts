import { RoleVo } from "../vo/RoleVo";

const roleMappper = (role: any) => {
  return new RoleVo(role._id.toString(), role.name);
};

export default roleMappper;
