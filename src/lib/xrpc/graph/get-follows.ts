import { fetchBsky } from "@/lib/api/bluesky-social";
import { err, ok, Result } from "@/lib/common/error-handling";
import { ResponseError, ResponseSuccess } from "../response.type";
import { getFollowsSchema, FollowsData } from "@/lib/schemas/follow";

export const getFollows = async (
  actor: string,
): Promise<Result<ResponseSuccess<FollowsData>, ResponseError>> => {
  if (!actor) throw new Error("getFollowers - Actor is required");
  const cursor = undefined;

  const params = new URLSearchParams();
  params.append("actor", actor);
  if (cursor) {
    params.append("cursor", cursor);
  }

  const url = cursor
    ? `app.bsky.graph.getFollows?actor=${actor}&cursor=${cursor}`
    : `app.bsky.graph.getFollows?actor=${actor}`;

  const response = await fetchBsky(url);

  if (!response.ok) {
    return err({
      status: response.status,
      message: "internal server error",
    });
  }

  const data = await response.json();
  const parsed = getFollowsSchema.safeParse(data);

  if (!parsed.success) {
    return err({
      status: 500,
      message: "internal server error",
    });
  }

  return ok({
    data: parsed.data,
    status: response.status,
  });
};
