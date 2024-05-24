"use client";

import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SignInType } from "@/lib/types/auth";
import { signInSchema } from "@/lib/zod/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSignup = (inputData: SignInType) => {
    console.log(inputData);
  };
  return (
    <div className="space-y-10">
      <h1 className="text-3xl text-accent-foreground font-semibold text-center">
        {"Login"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSignup)} className="space-y-3">
          <FormInput
            key="email"
            form={form}
            name="email"
            type="email"
            label="Email"
            placeholder="John@example.com"
          />
          <FormInput
            key="password"
            form={form}
            name="password"
            type="password"
            label="Password"
            placeholder="******"
          />
          <Button type="submit" className="w-full bg-main hover:bg-main/90">
            {"Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
