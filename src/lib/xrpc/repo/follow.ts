import { fetchBsky } from "@/lib/api/bluesky-social";
import { err, ok, Result } from "@/lib/common/error-handling";
import { ResponseError, ResponseSuccess } from "../response.type";

type FollowProps = {
  subject: string;
  repo: string;
};
const createRecord = ({ subject, repo }: FollowProps) => ({
  repo,
  collection: "app.bsky.graph.follow",
  record: {
    $type: "app.bsky.graph.follow",
    subject,
    createdAt: new Date().toISOString(),
  },
});

export const follow = async (
  props: FollowProps,
): Promise<Result<ResponseSuccess<"success">, ResponseError>> => {
  if (!props.repo || !props.subject)
    return err({
      message: "bad request",
      status: 404,
    });

  const url = `com.atproto.repo.createRecord`;
  const response = await fetchBsky(url, {
    method: "post",
    body: createRecord(props),
  });

  if (!response.ok) {
    return err({
      status: response.status,
      message: `could not follow user, ${props.subject} `,
    });
  }

  return ok({
    data: "success",
    status: response.status,
  });
};
