import { db } from "@/lib/db/db";
import {
  insertOrganizationUserSchema,
  organizationUser,
  user,
} from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";

export const createOrganizationUserServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertOrganizationUserSchema)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.insert(organizationUser).values({
        id: data.id,
        role: data.role,
        userId: data.userId,
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

export const updateOrganizationUserServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertOrganizationUserSchema.partial().required({ id: true }))
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      const updateData: any = { ...data };
      delete updateData.id;

      await tx
        .update(organizationUser)
        .set(updateData)
        .where(eq(organizationUser.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });

export const deleteOrganizationUserServerFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.delete(organizationUser).where(eq(organizationUser.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });
