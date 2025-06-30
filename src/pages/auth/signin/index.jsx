import { useState, useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/router";
import Head from "next/head";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [googleLoaded, setGoogleLoaded] = useState(false);

  // Load Google Identity Services library
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError(error || "An unknown error occurred.");
        return;
      }

      const { accessToken, refreshToken } = await response.json();
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error during login:", error.message || error);
      setError(error.message || "An unknown error occurred.");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
        <img
          src="/Decore.svg"
          alt="Decoration"
          className="absolute top-0 right-0 z-0 max-w-[600px] sm:max-w-[900px]"
        />
        <div className="flex w-full max-w-sm flex-col gap-6 z-20">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {googleLoaded && (
            <LoginForm
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.elements.email.value;
                const password = e.target.elements.password.value;
                if (email && password) {
                  handleLogin(email, password);
                } else {
                  setError("Email and password are required.");
                }
              }}
            />
          )}
        </div>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </>
  );
}