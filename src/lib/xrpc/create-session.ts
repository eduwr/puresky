import { blueSkySocialAPI } from "../api/bluesky-social";
import { Session, sessionSchema } from "../schemas/session";

export type CreateSessionInput = {
  identifier: string;
  password: string;
};
export const createSession = async ({
  identifier,
  password,
}: CreateSessionInput): Promise<Session> => {
  const { data } = await blueSkySocialAPI.post(
    "com.atproto.server.createSession",
    {
      identifier,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  const sessionData = {
    did: data.did,
    accessJwt: data.accessJwt,
    refreshJwt: data.refreshJwt,
    service: data.didDoc.service,
  };

  return sessionSchema.parse(sessionData);
};
