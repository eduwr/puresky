import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle } from "@/components/ui/card";
import { isErr } from "@/lib/common/error-handling";
import { getProfile } from "@/lib/xrpc/actor/get-profile";

export default async function DashboardPage() {
  const userData = await getProfile();
  if (isErr(userData)) {
    return <div>error</div>;
  }
  return (
    <main>
      <h1>DashBoard</h1>
      <Card>
        <CardTitle>
          <Avatar>
            <AvatarImage src={userData.value.data.avatar} alt="avatar" />
          </Avatar>
        </CardTitle>
      </Card>
    </main>
  );
}
