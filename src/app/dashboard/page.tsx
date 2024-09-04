import { getProfile } from "@/lib/xrpc/actor/get-profile";

export default async function DashboardPage() {
  const userData = await getProfile();
  console.log(userData);
  return (
    <main>
      <h1>DashBoard</h1>
    </main>
  );
}
