import { fetchBsky } from "../api/bluesky-social";
import { err, ok, Result } from "../common/error-handling";
import { Session, sessionSchema } from "../schemas/session";
import { ResponseError, ResponseSuccess } from "./response.type";

export type CreateSessionInput = {
  identifier: string;
  password: string;
};

export const createSession = async ({
  identifier,
  password,
}: CreateSessionInput): Promise<
  Result<ResponseSuccess<Session>, ResponseError>
> => {
  const response = await fetchBsky("com.atproto.server.createSession", {
    body: {
      identifier,
      password,
    },
    redirect: false,
    method: "post",
  });

  if (!response.ok) {
    return err({
      status: response.status,
      message:
        response.status >= 500
          ? "couldn't create session try again later"
          : "invalid credentials",
    });
  }

  const data = await response.json();

  const sessionData = {
    did: data.did,
    accessJwt: data.accessJwt,
    refreshJwt: data.refreshJwt,
    service: data.didDoc.service,
  };

  return ok({
    status: response.status,
    data: sessionSchema.parse(sessionData),
  });
};
