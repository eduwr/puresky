import { fetchBsky } from "@/lib/api/bluesky-social";
import { err, ok, Result } from "@/lib/common/error-handling";
import { ResponseError, ResponseSuccess } from "../response.type";

type UnfollowProps = {
  repo: string;
  recordKey?: string;
};

const createDeleteRecordData = ({ repo, recordKey }: UnfollowProps) => ({
  repo,
  rkey: recordKey,
  collection: "app.bsky.graph.follow",
});

export const unfollow = async (
  props: UnfollowProps,
): Promise<Result<ResponseSuccess<"success">, ResponseError>> => {
  if (!props.repo)
    return err({
      message: "bad request",
      status: 404,
    });

  const url = `com.atproto.repo.deleteRecord`;
  const response = await fetchBsky(url, {
    method: "post",
    body: createDeleteRecordData(props),
  });

  if (!response.ok) {
    return err({
      status: response.status,
      message: `could not unfollow user, ${props.repo} `,
    });
  }

  return ok({
    data: "success",
    status: response.status,
  });
};
