import { db } from "@/lib/db/db";
import { insertTeamMemberSchema, team_member } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";

export const createTeamMemberServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertTeamMemberSchema)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.insert(team_member).values({
        id: data.id,
        user_id: data.user_id,
        team_id: data.team_id,
        created_at: data.created_at,
      });

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });

export const deleteTeamMemberServerFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.delete(team_member).where(eq(team_member.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });
