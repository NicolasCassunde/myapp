import { db } from "@/lib/db/db";
import {
  insertTaskLabelAssignmentSchema,
  taskLabelAssignment,
} from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";

export const createTaskLabelAssignmentServerFn = createServerFn({
  method: "POST",
})
  .inputValidator(insertTaskLabelAssignmentSchema)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.insert(taskLabelAssignment).values({
        id: data.id,
        taskId: data.taskId,
        labelId: data.labelId,
        createdAt: data.createdAt,
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
        .delete(taskLabelAssignment)
        .where(eq(taskLabelAssignment.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });
