import { db } from "@/lib/db/db";
import { insertWorkspaceUserSchema, workspace_user } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";

export const createWorkspaceUserServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertWorkspaceUserSchema)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.insert(workspace_user).values({
        id: data.id,
        user_id: data.user_id,
        workspace_id: data.workspace_id,
        role: data.role || "member",
        created_at: data.created_at,
        updated_at: data.updated_at,
      });

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );

      return txidResult.rows[0].txid;
    });

    return { txid: result };
  });

export const updateWorkspaceUserServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertWorkspaceUserSchema.partial().required({ id: true }))
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      const updateData: any = { ...data };
      delete updateData.id;

      await tx
        .update(workspace_user)
        .set(updateData)
        .where(eq(workspace_user.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );

      return txidResult.rows[0].txid;
    });

    return { txid: result };
  });

export const deleteWorkspaceUserServerFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.delete(workspace_user).where(eq(workspace_user.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );

      return txidResult.rows[0].txid;
    });

    return { txid: result };
  });
