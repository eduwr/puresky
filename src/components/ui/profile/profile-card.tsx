import { isErr } from "@/lib/common/error-handling";
import { getProfile } from "@/lib/xrpc/actor/get-profile";
import { Card, CardContent, CardTitle } from "../card";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

export const ProfileCard = async () => {
  const data = await getProfile();
  if (isErr(data)) {
    return <div>error</div>;
  }
  const profile = data.value.data;
  return (
    <Card className="max-w-md px-5 py-8">
      <CardTitle className="flex flex-col items-center justify-center">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={profile.avatar}
            alt={`${profile.displayName} avatar`}
          />
          <AvatarFallback delayMs={2000}>
            <AvatarIcon />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center prose">
          <h3 className="text-primary opacity-60 m-0 p-0 leading-none">
            {profile.displayName}{" "}
          </h3>
          <span className="text-secondary">@{profile.handle}</span>
        </div>
      </CardTitle>
      <CardContent className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center opacity-80">
          <span className="font-light text-xs ml-1 opacity-80">Followers</span>
          <span className="ml-1">{profile.followersCount}</span>

          <span className="font-light text-xs ml-1 opacity-80 ml-3">
            Following
          </span>
          <span className="ml-1">{profile.followsCount}</span>
        </div>
        <p className="text-center mt-4">{profile.description}</p>
      </CardContent>
    </Card>
  );
};
