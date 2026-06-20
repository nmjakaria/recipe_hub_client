// app/dashboard/user/page.jsx
import UserDashboardClient from "@/components/dashboard/user/UserDashboardClient";
import { getUserSession } from "@/lib/core/session";


export default async function UserDashboardPage() {
    // Secure backend data fetching
    const user = await getUserSession();
    
    return <UserDashboardClient user={user} />;
}