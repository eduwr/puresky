"use server";
import { isErr } from "@/lib/common/error-handling";
import { signInSchema } from "@/lib/schemas/auth";
import { createSession } from "@/lib/xrpc/create-session";
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
): Promise<FormState | undefined> {
  const data = Object.fromEntries(formData);
  const result = signInSchema.safeParse(data);
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

  const response = await createSession({
    identifier: result.data.identifier,
    password: result.data.password,
  });

  console.log(response);

  if (isErr(response)) {
    return {
      message: response.error.message,
    };
  }

  cookies().set("auth", JSON.stringify(response.value.data), {
    maxAge: Infinity,
  });

  redirect("/dashboard");
}
