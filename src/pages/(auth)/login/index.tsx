import { useAuthStore } from "@/store/auth";
import AuthForm from "@/components/AuthForm";

const LoginPage = () => {
  const login = useAuthStore((state) => state.login);

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password?: string;
  }) => {
    if (!password) throw new Error("Password is required");
    await login(email, password);
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
};

export default LoginPage;
