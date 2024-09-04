import { cookies } from "next/headers";
import { cache } from "react";
import "server-only";
import { sessionSchema } from "../schemas/session";
import { redirect } from "next/navigation";

export const getSession = cache(async () => {
  const cookie = cookies().get("auth")?.value;
  const data = cookie && JSON.parse(cookie);

  const parsed = sessionSchema.safeParse(data);
  if (!parsed.success) {
    redirect("/auth");
  }

  return parsed.data;
});
