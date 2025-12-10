import { db } from "@/lib/db/db";
import { insertOrganizationSchema, organization } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";

// ==================== ORGANIZATION ====================
export const createOrganizationServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertOrganizationSchema)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.insert(organization).values({
        id: data.id,
        name: data.name,
        slug: data.slug,
        logo: data.logo || null,
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

export const updateOrganizationServerFn = createServerFn({ method: "POST" })
  .inputValidator(insertOrganizationSchema)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      const updateData: any = { ...data };
      delete updateData.id;

      await tx
        .update(organization)
        .set(updateData)
        .where(eq(organization.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });

export const deleteOrganizationServerFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const result = await db.transaction(async (tx) => {
      await tx.delete(organization).where(eq(organization.id, data.id));

      const txidResult = await tx.execute<{ txid: string }>(
        sql`SELECT txid_current()::text as txid`,
      );
      return txidResult.rows[0].txid;
    });
    return { txid: result };
  });
