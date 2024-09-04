import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { isErr } from "@/lib/common/error-handling";
import { getProfile } from "@/lib/xrpc/actor/get-profile";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarIcon } from "@radix-ui/react-icons";

export default async function DashboardPage() {
  const data = await getProfile();
  if (isErr(data)) {
    return <div>error</div>;
  }
  const profile = data.value.data;
  return (
    <main>
      <h1>DashBoard</h1>
      <Card>
        <CardTitle className="flex flex-col items-center justify-center">
          <div className="">
            <Avatar>
              <AvatarImage
                src={profile.avatar}
                alt={`${profile.displayName} avatar`}
              />
              <AvatarFallback delayMs={2000}>
                <AvatarIcon />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center prose">
            <h3 className="text-primary opacity-60 m-0 p-0 leading-none">
              {profile.displayName}{" "}
            </h3>
            <span className="text-secondary">@{profile.handle}</span>
          </div>
        </CardTitle>
        <CardContent>
          <div className="flex items-center justify-center opacity-80">
            <span className="font-light text-xs ml-1 opacity-80">
              Followers
            </span>
            <span>{profile.followersCount}</span>

            <span className="font-light text-xs ml-1 opacity-80">
              Following
            </span>
            <span>{profile.followsCount}</span>
          </div>
          <p>{profile.description}</p>
        </CardContent>
      </Card>
    </main>
  );
}
