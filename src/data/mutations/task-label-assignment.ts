import { db } from "@/lib/db/db";
import {
  insertTaskLabelAssignmentSchema,
  task_label_assignment,
} from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";

export const createTaskLabelAssignmentServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(insertTaskLabelAssignmentSchema)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.insert(task_label_assignment).values({
        id: data.id,
        label_id: data.label_id,
        task_id: data.task_id,
        created_at: data.created_at,
      });

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });

export const deleteTaskLabelAssignmentServerFn = createServerFn({
  method: "POST",
})
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx
        .delete(task_label_assignment)
        .where(eq(task_label_assignment.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });
