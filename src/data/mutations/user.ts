import { db } from "@/lib/db/db";
import { insertUserSchema, user } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";

export const updateUserServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertUserSchema.partial().required({ id: true }))
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      const updateData: any = { ...data };
      delete updateData.id;

      // Atualiza o updatedAt automaticamente
      updateData.updatedAt = new Date();

      await tx.update(user).set(updateData).where(eq(user.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );

      return txidResult.rows[0].txid;
    });

    return { txid: result };
  });
