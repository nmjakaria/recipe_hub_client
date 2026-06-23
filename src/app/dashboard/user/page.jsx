// app/dashboard/user/page.jsx
import UserDashboardClient from "@/components/dashboard/user/UserDashboardClient";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "User Dashboard | Recipe Hub",
  description: "Access your saved recipes, manage your meal plans, view your cooking history, and update your profile settings in one place.",
};

export default async function UserDashboardPage() {
    // Secure backend data fetching
    const user = await getUserSession();
    
    return <UserDashboardClient user={user} />;
}