import { compareSync, hashSync } from 'bcryptjs';

export const encryptPassword = async (password: string): Promise<string> => {
  const cryptPassword: string = await hashSync(password, 13);
  return cryptPassword;
};

export const validateEncryptPassword = async (
  password: string,
  hashPassord: string,
): Promise<boolean> => {
  const comparePassword: boolean = await compareSync(password, hashPassord);
  return comparePassword;
};