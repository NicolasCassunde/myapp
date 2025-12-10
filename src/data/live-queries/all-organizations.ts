import {
  workspaceCollection,
  workspaceUserCollection,
} from "@/lib/collections";
import { eq, useLiveQuery } from "@tanstack/react-db";

export function useAllOrganizations({ userId }: { userId: string }) {
  return useLiveQuery(
    (q) =>
      q
        .from({ workspaceUser: workspaceUserCollection })
        .join(
          { workspace: workspaceCollection },
          ({ workspaceUser, workspace }) =>
            eq(workspaceUser.workspace_id, workspace.id),
        )
        .where(({ workspaceUser }) => eq(workspaceUser.user_id, userId))
        .select(({ workspace, workspaceUser }) => ({
          workspace,
          role: workspaceUser.role,
        })),
    [userId],
  );
}
