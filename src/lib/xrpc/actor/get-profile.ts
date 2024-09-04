import { blueSkySocialAPI } from "@/lib/api/bluesky-social";
import { getSession } from "@/lib/api/dal";

export const getProfile = async () => {
  const session = getSession();
  const params = new URLSearchParams({
    actor: session.did,
  });
  try {
    const url = `app.bsky.actor.getProfile?${params.toString()}`;

    const { data } = await blueSkySocialAPI.get(url);

    console.log("profile data ", data);

    return data;
  } catch (e) {
    console.log(e);
  }
};
