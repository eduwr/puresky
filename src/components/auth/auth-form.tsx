"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

const authSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(1),
  authFactorToken: z.string(),
});

type AuthData = z.infer<typeof authSchema>;

export const AuthForm = () => {
  const form = useForm<AuthData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      identifier: "",
      password: "",
      authFactorToken: "",
    },
  });

  const onSubmit = (values: AuthData) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
