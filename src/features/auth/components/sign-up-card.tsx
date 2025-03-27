"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DottedSeprator } from "@/components/dottedSeprator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { SignUpSchema } from "../schemas";
import { useSignup } from "../api/use-signup";

export const SignUpCard = () => {
  const { mutate, isPending } = useSignup();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    mutate({ json: values });
    console.log(values);
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl pb-4">Sign Up 👇🏻 Here!</CardTitle>
        <CardDescription>
          By signing up you are agreeing to our{" "}
          <Link href="/privacy">
            <span className="text-blue-700">privacy policy</span>
          </Link>{" "}
          and{" "}
          <Link href="/terms">
            <span className="text-blue-700"> Terms of service</span>
          </Link>
        </CardDescription>
      </CardHeader>

      <div className="px-7 mb-2">
        <DottedSeprator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="fullName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter Your Full Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter Your Email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter Your Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} size="lg" className="w-full">
              Sign-up
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
          Already have an account?{" "}
          <Link href="/sign-in">
            <span className="text-blue-700">&nbsp;Sign in</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
