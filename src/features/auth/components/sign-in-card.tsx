"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DottedSeprator } from "@/components/dottedSeprator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { LoginSchema } from "../schemas";
import { useLogin } from "../api/use-login";

export const SignInCard = () => {
  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    mutate({ json: values });
    // console.log(values)
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome back! 👋🏻</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeprator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}></FormField>

            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeprator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button className="w-full" variant="secondary" disabled={isPending}>
          <FcGoogle className="mr-2 size-2" />
          Login with google
        </Button>
        <Button className="w-full" variant="secondary" disabled={isPending}>
          <FaGithub className="mr-2 size-2" />
          Login with github
        </Button>
      </CardContent>
      <div className="p-7">
        <DottedSeprator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up">
            <span className="text-blue-700">&nbsp;Sign up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
