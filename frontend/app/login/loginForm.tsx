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

// Define the form schema using zod
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username is at least 2 characters.",
  }),
  password: z
    .string()
    .min(8, { message: "Password is at least 8 characters." }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border h-fit border-white/15 min-w-[30rem] max-w-[30rem] p-8 rounded-3xl flex flex-col gap-10"
      >
        <header className="flex flex-col gap-1">
          <h2 className="text-white font-bold text-2xl">LogIn</h2>
          <p className="text-white/70">
            Log in to connect and vibe with your friends!
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
          <p className="text-white">
            Not registered yet?{" "}
            <Link href="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>

        <Button
          className="px-8 py-5 cursor-pointer bg-blue-700 text-white hover:bg-blue-700 font-bold"
          type="submit"
        >
          Log In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
