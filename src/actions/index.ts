// import bcrypt from "bcrypt";
import crypto from "crypto";

export async function hashPassword(password: string) {
  // const salt = await bcrypt.genSalt(5);
  // const hashPassword = await bcrypt.hash(password, salt);
  const hash = crypto.createHash("sha256").update(password).digest("hex");

  return hash;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  // const compare = await bcrypt.compare(password, hashedPassword);
  const hash = crypto.createHash("sha256").update(password).digest("hex");

  return hash === hashedPassword;
}
