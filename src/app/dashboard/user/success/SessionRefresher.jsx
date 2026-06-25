"use client";

import { authClient } from "@/lib/auth-client"; // আপনার Better Auth ক্লায়েন্ট পাথ
import { useEffect } from "react";

export default function SessionRefresher() {
    useEffect(() => {
        const forceUpdateAndRedirect = async () => {
            try {
                console.log("🔄 Better Auth এর মাধ্যমে সরাসরি প্রোফাইল প্ল্যান আপডেট করা হচ্ছে...");
                
                // 💡 Better Auth ক্লায়েন্টকে দিয়ে সরাসরি 'plan' আপডেট করানো হচ্ছে
                // এটি ডাটাবেজও আপডেট করবে এবং ব্রাউজারের JWT টোকেনও ফ্রেশ করে দেবে
                await authClient.user.update({
                    plan: "premium"
                });

                console.log("🎉 Better Auth JWT Token Upgraded to Premium!");

                // এবার ড্যাশবোর্ডে হার্ড রিডাইরেক্ট করুন
                if (typeof window !== "undefined") {
                    window.location.href = "/dashboard/user"; 
                }
            } catch (err) {
                console.error("🔴 Better Auth client update failed:", err);
                // ফেইল করলেও ড্যাশবোর্ডে পাঠিয়ে দিন
                window.location.href = "/dashboard/user";
            }
        };

        forceUpdateAndRedirect();
    }, []);

    return null;
}