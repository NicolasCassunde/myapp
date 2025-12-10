import { db } from "@/lib/db/db";
import { insertTaskSchema, task } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";

export const createTaskServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertTaskSchema)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.insert(task).values({
        id: data.id,
        identifier: data.identifier,
        title: data.title,
        description: data.description || null,
        priority: data.priority,
        position: data.position,
        estimatePoints: data.estimatePoints || null,
        dueDate: data.dueDate || null,
        startedAt: data.startedAt || null,
        completedAt: data.completedAt || null,
        canceledAt: data.canceledAt || null,
        teamId: data.teamId,
        columnId: data.columnId,
        assigneeId: data.assigneeId || null,
        creatorId: data.creatorId,
        parentTaskId: data.parentTaskId || null,
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

export const updateTaskServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertTaskSchema.partial().required({ id: true }))
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      const updateData: any = { ...data };
      delete updateData.id;

      await tx.update(task).set(updateData).where(eq(task.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });

export const deleteTaskServerFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.delete(task).where(eq(task.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });
