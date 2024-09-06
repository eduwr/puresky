import { z } from "zod";
import { followSchema } from "./follow";
import { subjectSchema } from "./subjectSchema";

export const getFollowersSchema = z.object({
  followers: z.array(followSchema),
  subject: subjectSchema,
  cursor: z.string().optional(),
});

export type FollowersData = z.infer<typeof getFollowersSchema>;
