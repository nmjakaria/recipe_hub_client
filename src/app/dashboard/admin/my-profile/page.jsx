import ProfileClient from "@/components/dashboard/ProfileClient";
import { requireRole } from "@/lib/core/session";


export const metadata = {
    title: "User Profile | RecipeHub",
    description: "Manage your culinary identity and platform credentials.",
};

export default async function UserProfilePage() {
    // 1. Securely check session on the server. 
    // This handles automatic redirects to /auth/signin or /unauthorized natively.
    const user = await requireRole("admin"); 

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* 2. Feed the server-side user data into the client layer */}
            <ProfileClient initialUser={user} />
        </main>
    );
}