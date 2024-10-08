import { fetchBsky } from "@/lib/api/bluesky-social";
import { err, ok, Result } from "@/lib/common/error-handling";
import { ResponseError, ResponseSuccess } from "../response.type";
import { getFollowsSchema, FollowsData } from "@/lib/schemas/follow";

type Options = {
  cursor?: string;
};

export const getFollows = async (
  actor: string,
  options?: Options,
): Promise<Result<ResponseSuccess<FollowsData>, ResponseError>> => {
  if (!actor) throw new Error("getFollowers - Actor is required");

  const params = new URLSearchParams();
  params.append("actor", actor);
  if (options?.cursor) {
    params.append("cursor", options.cursor);
  }

  const url = `app.bsky.graph.getFollows?${params.toString()}`;

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
