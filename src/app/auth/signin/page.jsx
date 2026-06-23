"use client";

import { useEffect, useState } from "react";
import { Card, Button, Link, TextField, Label, InputGroup, Input, toast } from "@heroui/react";
import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
import { authClient, signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function SigninPage() {
    // Form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";
    const message = searchParams.get("message");

    useEffect(() => {
        if (message === "login_required") {
            toast.warning("Authentication Required", {
                description: "Please sign in to access that premium page.",
                timeout: 3000,
            });

            // clear the massage parameter from the browser history for clean URL
            const newUrl = window.location.pathname +
                (redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : "");
            window.history.replaceState({}, "", newUrl);
        }
    }, [message, redirectTo]);

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignin = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const { data, error: authError } = await signIn.email({
                email,
                password,
            });

            if (authError) {
                setError(authError.message || "Invalid email or password.");
            } else {
                setSuccess("Signed in successfully! Redirecting...");
                toast.success("Signed in successfully", {
                    description: "You have been logged into your account.",
                    timeout: 2000,
                });
                setEmail("");
                setPassword("");
                router.push(redirectTo); // Redirect to the specified page after successful sign-in
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const signInGoogle = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: redirectTo
            });
        } catch (err) {
            console.error("Google sign in failed", err);
        }
    };

    return (
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-zinc-50 dark:bg-zinc-950">

            {/* ── LEFT SIDE: INTERACTIVE FORM CHAMBER ── */}
            <div className="flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-16 xl:px-24 bg-zinc-50 dark:bg-zinc-950">
                <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">

                    {/* ── REFACTORED HEADER: LOGO THEN NAME ── */}
                    <div className="flex flex-col items-center justify-center pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
                        <Link href="/" className="flex flex-col items-center gap-2 group mb-4">
                            {/* Logo Visual Icon */}
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-rose-500 shadow-lg group-hover:scale-105 transition-transform duration-200">
                                <span className="text-2xl font-bold text-white">R</span>
                            </div>
                            {/* Brand Name Text (Always visible on all screen sizes) */}
                            <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                                Recipe<span className="bg-linear-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">Hub</span>
                            </span>
                        </Link>

                        {/* Subtext Context Details */}
                        <div className="space-y-1">
                            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Welcome back</h1>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Enter your credentials to access your account</p>
                        </div>
                    </div>

                    <div className="flex justify-center mb-5">
                        <Button
                            variant="bordered"
                            className="rounded-xl border border-zinc-200 dark:border-zinc-800 font-bold text-zinc-900 dark:text-zinc-100 h-12 w-full gap-2 bg-transparent"
                            onPress={signInGoogle}
                        >
                            <FcGoogle className="text-lg" />
                            Continue with Google
                        </Button>
                    </div>

                    {/* Form Body */}
                    <form onSubmit={handleSignin} className="flex flex-col gap-5">

                        {/* Email Field */}
                        <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</Label>
                            <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                                <At className="text-zinc-400 pointer-events-none" size={16} />
                                <Input
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                                />
                            </InputGroup>
                        </TextField>

                        {/* Password Field */}
                        <TextField isRequired name="password" className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</Label>
                            <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                                <ShieldKeyhole className="text-zinc-400 pointer-events-none" size={16} />
                                <Input
                                    type={isVisible ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                                />
                                <button
                                    className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                                    type="button"
                                    onClick={toggleVisibility}
                                    aria-label="toggle password visibility"
                                >
                                    {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                                </button>
                            </InputGroup>
                        </TextField>

                        {/* Dynamic Status Badges */}
                        {error && (
                            <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                                <span className="font-semibold">Error:</span> {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                                <span className="font-semibold">Success:</span> {success}
                            </div>
                        )}

                        {/* Action Button */}
                        <Button
                            type="submit"
                            color="primary"
                            className="w-full font-semibold rounded-xl text-sm h-12"
                            isLoading={isLoading}
                            isDisabled={isLoading}
                        >
                            Sign In
                        </Button>

                        {/* Navigation Option */}
                        <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            New to Recipe Hub?{" "}
                            <Link href={`/auth/signup?redirect=${redirectTo}`} className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400">
                                Create an account
                            </Link>
                        </div>

                    </form>
                </Card>
            </div>

            {/* ── RIGHT SIDE: VISUAL COVER MEDIA PRIMITIVE ── */}
            <div className="hidden lg:block relative p-4 h-screen top-0">
                <div
                    className="w-full h-full rounded-[2.5rem] bg-cover bg-center shadow-md dark:border dark:border-zinc-900"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1650012763119-dba5b352b5f6?q=80&w=1600&auto=format&fit=crop')`
                    }}
                >
                    <div className="w-full h-full bg-linear-to-tr from-black/20 via-transparent to-transparent rounded-[2.5rem]" />
                </div>
            </div>

        </div>
    );
}