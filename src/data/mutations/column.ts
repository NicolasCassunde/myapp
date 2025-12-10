import { db } from "@/lib/db/db";
import { column, insertColumnSchema } from "@/lib/db/schema";

import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";

export const createColumnServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertColumnSchema)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.insert(column).values({
        id: data.id,
        name: data.name,
        position: data.position,
        color: data.color || null,
        type: data.type,
        team_id: data.team_id,
      });

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });

export const updateColumnServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertColumnSchema.partial().required({ id: true }))
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      const updateData: any = { ...data };
      delete updateData.id;

      await tx.update(column).set(updateData).where(eq(column.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });

export const deleteColumnServerFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.delete(column).where(eq(column.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });
