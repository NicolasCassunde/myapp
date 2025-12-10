import { db } from "@/lib/db/db";
import { insertTaskLabelSchema, task_label } from "@/lib/db/schema";

import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";
export const createTaskLabelServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertTaskLabelSchema)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.insert(task_label).values({
        id: data.id,
        name: data.name,
        color: data.color,
        workspace_id: data.workspace_id,
      });

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });

export const updateTaskLabelServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertTaskLabelSchema.partial().required({ id: true }))
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      const updateData: any = { ...data };
      delete updateData.id;

      await tx
        .update(task_label)
        .set(updateData)
        .where(eq(task_label.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });

export const deleteTaskLabelServerFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.delete(task_label).where(eq(task_label.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });
