import "server-only";

import { cookies } from "next/headers";

export const verifySession = async () => {
  const cookie = (await cookies()).get("auth")?.value;

  return { isAuth: Boolean(cookie) };
};
