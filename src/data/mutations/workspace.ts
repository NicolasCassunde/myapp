import { db } from "@/lib/db/db";
import { insertWorkspaceSchema, workspace } from "@/lib/db/schema";

import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";

export const createWorkspaceServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertWorkspaceSchema)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.insert(workspace).values({
        id: data.id,
        name: data.name,
        urlKey: data.urlKey,
        previousUrlKeys: data.previousUrlKeys || [],
        icon: data.icon || null,
        color: data.color || null,
        organizationId: data.organizationId,
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

export const updateWorkspaceServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertWorkspaceSchema.partial().required({ id: true }))
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      const updateData: any = { ...data };
      delete updateData.id;

      await tx
        .update(workspace)
        .set(updateData)
        .where(eq(workspace.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });

export const deleteWorkspaceServerFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.delete(workspace).where(eq(workspace.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });
