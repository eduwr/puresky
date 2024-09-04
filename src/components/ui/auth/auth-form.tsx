"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../button";
import { AuthFormData, signInSchema } from "@/lib/schemas/auth";
import { signInAction } from "@/app/actions/auth";
import { useFormState } from "react-dom";
import { useRef } from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../alert";
export const AuthForm = () => {
  const [state, formAction] = useFormState(signInAction, {
    message: "",
  });
  const form = useForm<AuthFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
      authFactorToken: "",
      ...(state?.fields ?? {}),
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Form {...form}>
      {state.message && !form.formState.isDirty && (
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>Try again</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      {state.issues?.map((issue) => (
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>Validation error</AlertTitle>
          <AlertDescription>{issue}</AlertDescription>
        </Alert>
      ))}
      <form
        ref={formRef}
        className="space-y-8"
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
          })(evt);
        }}
      >
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identifier</FormLabel>
              <FormControl>
                <Input placeholder="yourhandle.bsky.social" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>App Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="abcd-1234-efgh-5678"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authFactorToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>2FA Token (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="ABC12-EFG34" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
