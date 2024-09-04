"use server";
import { signInSchema } from "@/lib/schemas/auth";
import { createSession } from "@/lib/xrpc/create-session";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function signInAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const data = Object.fromEntries(formData);
  const result = signInSchema.safeParse(data);
  const cookieStore = cookies();
  if (!result.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      // @ts-expect-error implicitly has any type because of FormData
      fields[key] = formData[key].toString();
    }

    return {
      message: "Invalid credentials",
      fields,
      issues: result.error?.issues.map(
        (issue) => `${issue.path}: ${issue.message}`,
      ),
    };
  }
  try {
    const session = await createSession({
      identifier: result.data.identifier,
      password: result.data.password,
    });

    cookieStore.set("auth", JSON.stringify(session));
  } catch (e) {
    console.log(e);
    if (e instanceof AxiosError) {
      return {
        message: e.response?.data.message ?? e.message,
      };
    }
    return {
      message: "Internal Server Error",
      fields: {
        identifier: "",
        password: "",
      },
    };
  }
  redirect("/dashboard");
}
