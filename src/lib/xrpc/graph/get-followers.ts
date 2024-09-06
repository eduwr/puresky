import { fetchBsky } from "@/lib/api/bluesky-social";
import { err, ok, Result } from "@/lib/common/error-handling";
import { ResponseError, ResponseSuccess } from "../response.type";
import { getFollowersSchema, FollowersData } from "@/lib/schemas/followers";

type Options = {
  cursor?: string;
};
export const getFollowers = async (
  actor: string,
  options?: Options,
): Promise<Result<ResponseSuccess<FollowersData>, ResponseError>> => {
  if (!actor) throw new Error("getFollowers - Actor is required");

  const params = new URLSearchParams();
  params.append("actor", actor);
  if (options?.cursor) {
    params.append("cursor", options.cursor);
  }

  const paramsString = params.toString();
  console.log(paramsString);
  const url = `app.bsky.graph.getFollowers?${params.toString()}`;

  console.log("url ", url);
  const response = await fetchBsky(url);

  if (!response.ok) {
    return err({
      status: response.status,
      message: "internal server error",
    });
  }

  console.log("__RESP__", response);
  const data = await response.json();
  const parsed = getFollowersSchema.safeParse(data);

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
