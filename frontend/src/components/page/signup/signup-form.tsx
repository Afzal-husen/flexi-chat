"use client";

import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SignUpType } from "@/lib/types/auth";
import { signUpSchema } from "@/lib/zod/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSignup = (inputData: SignUpType) => {
    console.log(inputData);
  };

  return (
    <div className="w-[70%] mx-auto space-y-10">
      <h1 className="text-3xl text-accent-foreground font-semibold text-center">
        {"Create an Account"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSignup)} className="space-y-3">
          <div className="grid grid-cols-2 gap-x-3">
            <FormInput
              key="username"
              form={form}
              name="username"
              type="text"
              label="Username"
              placeholder="John doe"
            />
            <FormInput
              key="email"
              form={form}
              name="email"
              type="email"
              label="Email"
              placeholder="John@example.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <FormInput
              key="password"
              form={form}
              name="password"
              type="password"
              label="Password"
              placeholder="******"
            />
            <FormInput
              key="cpassword"
              form={form}
              name="cpassword"
              type="password"
              label="Confirm password"
              placeholder="******"
            />
          </div>
          <Button type="submit" className="w-full bg-main hover:bg-main/90">
            {"Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
