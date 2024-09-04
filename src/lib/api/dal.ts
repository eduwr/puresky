import { cookies } from "next/headers";
import { cache } from "react";
import "server-only";
import { Session, sessionSchema } from "../schemas/session";
import { redirect } from "next/navigation";

type GetSessionOptions = {
  redirect?: boolean;
};

function getSessionFn(options?: { redirect?: true }): Session;
function getSessionFn(options: { redirect: false }): Session | false;
function getSessionFn(options: { redirect?: boolean }): Session | false;

function getSessionFn(options: GetSessionOptions = {}): Session | false {
  options.redirect ??= true;
  const cookie = cookies().get("auth")?.value;
  const data = cookie && JSON.parse(cookie);

  const parsed = sessionSchema.safeParse(data);
  if (!parsed.success) {
    return options.redirect && redirect("/auth");
  }

  return parsed.data;
}

export const getSession = cache(getSessionFn);
