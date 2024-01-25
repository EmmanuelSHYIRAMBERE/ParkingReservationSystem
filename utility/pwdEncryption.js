import bcrypt from "bcrypt";

export const hashPwd = async (password) => {
  const saltRounds = await bcrypt.genSalt(parseInt(process.env.saltRounds));
  let hashedPwd = await bcrypt.hash(password, saltRounds);

  return hashedPwd;
};

export const comparePwd = async (password, hashedPwd) => {
  let isPwdMatch = await bcrypt.compare(password, hashedPwd);

  return isPwdMatch;
};
