"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSignUp } from "@/lib/api/auth/mutations";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Password validation regex
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Define the form schema using zod
const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    fullname: z.string().min(2, {
      message: "Full name must be at least 2 characters.",
    }),
    gender: z.enum(["MALE", "FEMALE"], {
      message: "Please select a gender.",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(passwordRegex, {
        message:
          "Password must include uppercase, lowercase, number & special character.",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const SignupForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      fullname: "",
      gender: "MALE",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const { mutate: signUp, isPending } = useSignUp();

  function onSubmit(values: z.infer<typeof formSchema>) {
    signUp(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border h-fit border-white/15 min-w-[30rem] max-w-[30rem] p-8 rounded-3xl flex flex-col gap-10"
      >
        <header className="flex flex-col gap-1">
          <h2 className="text-white font-bold text-2xl">SignUp</h2>
          <p className="text-white/70">
            Create an account and start vibing with your friends!
          </p>
        </header>
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-white">Username</FormLabel>
                <FormControl>
                  <Input
                    className="text-white border border-white/15 focus-visible:ring-0"
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-white">Full Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-white border border-white/15 focus-visible:ring-0"
                    placeholder="Full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-white">Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-5"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem
                          value="MALE"
                          className="h-5 w-5 border-2 border-white/30 text-white cursor-pointer"
                        />
                      </FormControl>
                      <FormLabel className="!text-white">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem
                          value="FEMALE"
                          className="h-5 w-5 border-2 border-white/30 text-white cursor-pointer"
                        />
                      </FormControl>
                      <FormLabel className="!text-white">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
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
                <FormLabel className="!text-white">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="text-white border border-white/15 focus-visible:ring-0 pr-10"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-white">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-white border border-white/15 focus-visible:ring-0"
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-white">
            Already registered?{" "}
            <Link href="/login" className="text-blue-500">
              Log In
            </Link>
          </p>
        </div>

        <Button
          className="px-8 py-5 cursor-pointer bg-blue-700 text-white hover:bg-blue-700 font-bold"
          type="submit"
          disabled={isPending}
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
