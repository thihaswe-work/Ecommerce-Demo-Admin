// src/components/AuthForm.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Mail, Lock, Loader2 } from "lucide-react";

type AuthMode = "login" | "register" | "reset";

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (data: {
    email: string;
    password?: string;
    confirmPassword?: string;
  }) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const formSchema = z
    .object({
      email: z.string().email("Invalid email address"),
      password:
        mode !== "reset"
          ? z.string().min(6, "Password must be at least 6 characters")
          : z.string().optional(),
      confirmPassword:
        mode === "register"
          ? z.string().min(6, "Confirm password is required")
          : z.string().optional(),
    })
    .refine(
      (data) =>
        mode === "register" ? data.password === data.confirmPassword : true,
      {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const title =
    mode === "login"
      ? "Login"
      : mode === "register"
      ? "Register"
      : "Reset Password";
  const buttonText =
    mode === "login"
      ? "Login"
      : mode === "register"
      ? "Sign Up"
      : "Send Reset Link";

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    try {
      await onSubmit(values);
      if (mode !== "reset") navigate("/");
    } catch (err: any) {
      console.log("error from ", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">{title}</h1>

        {error && (
          <p className="text-destructive text-center mb-4 font-medium">
            {error}
          </p>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <Input type="email" placeholder="Email" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            {mode !== "reset" && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {/* Confirm Password for register */}
            {mode === "register" && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {buttonText}
            </Button>
          </form>
        </Form>

        {/* Footer links */}
        {mode === "login" && (
          <p className="text-center text-muted-foreground text-sm mt-4 space-x-2">
            <span
              className="text-primary cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
            |
            <span
              className="text-primary cursor-pointer hover:underline"
              onClick={() => navigate("/reset-password")}
            >
              Forgot Password?
            </span>
          </p>
        )}

        {mode === "register" && (
          <p className="text-center text-muted-foreground text-sm mt-4">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
