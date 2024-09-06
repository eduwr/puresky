"use server";

import { getSession } from "@/lib/api/dal";
import { err, isErr } from "@/lib/common/error-handling";
import { followSchema } from "@/lib/schemas/follow";
import { getFollowers } from "@/lib/xrpc/graph/get-followers";
import { follow } from "@/lib/xrpc/repo/follow";
import { z } from "zod";

export const followAllBack = async () => {
  console.log("Follow back");
  const session = getSession();

  let cursor = "";
  let followersToFollow: z.infer<typeof followSchema>[] = [];

  while (true) {
    console.log("START   \n\n");
    console.log("GetFollowersProps ", session.did, cursor);
    const followersResult = await getFollowers(session.did, { cursor });

    if (isErr(followersResult)) {
      return err(followersResult.error);
    }

    console.log("result count: ", followersResult.value.data.followers.length);
    followersToFollow.push(
      ...followersResult.value.data.followers.filter(
        (f) => !f.viewer.following,
      ),
    );

    const nextCursor = followersResult.value.data.cursor;
    console.log("request", cursor ?? "not", nextCursor);
    if (!nextCursor) {
      break;
    }

    cursor = nextCursor;
    console.log("END   \n\n");
  }

  console.log(`${followersToFollow.length} not mutual followers`);

  let count = 0;

  for (const follower of followersToFollow) {
    const result = await follow({ repo: session.did, subject: follower.did });
    if (isErr(result)) {
      console.error(result.error);
    }
    count++;
  }

  return count;
};
