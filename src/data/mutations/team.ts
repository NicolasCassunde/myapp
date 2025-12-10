import { db } from "@/lib/db/db";
import { insertTeamSchema, team } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";

export const createTeamServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertTeamSchema)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.insert(team).values({
        id: data.id,
        name: data.name,
        key: data.key,
        description: data.description || null,
        icon: data.icon || null,
        color: data.color || null,
        workspaceId: data.workspaceId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });

export const updateTeamServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertTeamSchema.partial().required({ id: true }))
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      const updateData: any = { ...data };
      delete updateData.id;

      await tx.update(team).set(updateData).where(eq(team.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });

export const deleteTeamServerFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.delete(team).where(eq(team.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });
