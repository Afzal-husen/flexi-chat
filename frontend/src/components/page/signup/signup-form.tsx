"use client";

import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const userSignUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be atleast 3 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    cpassword: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
  })
  .refine((value) => value.password === value.cpassword, {
    message: "Password does not match",
  });

type UserSignUpType = z.infer<typeof userSignUpSchema>;

const SignupForm = () => {
  const form = useForm<UserSignUpType>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSignup = (inputData: UserSignUpType) => {
    console.log(inputData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignup)}>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SignupForm;
