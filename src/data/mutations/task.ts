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
        column_id: data.column_id,
        creator_id: data.creator_id,
        identifier: data.identifier,
        title: data.title,
        description: data.description || null,
        priority: data.priority,
        position: data.position,
        estimate_points: data.estimate_points || null,
        due_date: data.due_date || null,
        started_at: data.started_at || null,
        completed_at: data.completed_at || null,
        canceled_at: data.canceled_at || null,
        team_id: data.team_id,
        assignee_id: data.assignee_id || null,
        parent_task_id: data.parent_task_id || null,
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
