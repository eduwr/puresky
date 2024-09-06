"use client";

import { followAllBack } from "@/app/actions/followers/followBack";
import { Button } from "../button";

export const FollowAllBackBtn = () => (
  <Button type="button" onClick={() => followAllBack()}>
    Follow all back
  </Button>
);
