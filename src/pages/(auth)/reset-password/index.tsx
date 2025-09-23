// ResetPage.tsx
import React from "react";
import { useAuthStore } from "@/store/auth";
import AuthForm from "@/components/AuthForm";

const ResetPasswordPage = () => {
  const reset = useAuthStore((state) => state.resetPassword);

  const handleReset = async ({ email }: { email: string }) => {
    await reset(email);
  };

  return <AuthForm mode="reset" onSubmit={handleReset} />;
};

export default ResetPasswordPage;
