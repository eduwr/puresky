import { fetchBsky } from "@/lib/api/bluesky-social";
import { getSession } from "@/lib/api/dal";
import { err, ok, Result } from "@/lib/common/error-handling";
import { ResponseError, ResponseSuccess } from "../response.type";
import { Profile, profileSchema } from "@/lib/schemas/profile";

export const getProfile = async (): Promise<
  Result<ResponseSuccess<Profile>, ResponseError>
> => {
  const session = getSession();

  const params = new URLSearchParams({
    actor: session.did,
  });
  const url = `app.bsky.actor.getProfile?${params.toString()}`;
  const response = await fetchBsky(url);

  if (!response.ok) {
    console.log(response.headers);
    return err({
      status: response.status,
      message: (() => {
        const { status } = response;
        if (status === 404) {
          return "profile not found";
        }
        if (status === 401) {
          return "unauthorized";
        }
        return "internal server error";
      })(),
    });
  }
  const data = await response.json();

  const parsed = profileSchema.safeParse(data);
  if (!parsed.success) {
    return err({
      status: 500,
      message: "internal server error",
    });
  }

  return ok({
    status: response.status,
    data: parsed.data,
  });
};
