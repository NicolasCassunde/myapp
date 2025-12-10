import { workspaceCollection, teamCollection } from "@/lib/collections";
import { eq, useLiveQuery } from "@tanstack/react-db";

export function useTeamsOfOrganization({
  workspaceSlug,
}: {
  workspaceSlug: string;
}) {
  return useLiveQuery(
    (q) =>
      q
        .from({ workspace: workspaceCollection })
        .join({ team: teamCollection }, ({ workspace, team }) =>
          eq(team.workspace_id, workspace.id),
        )
        .where(({ workspace }) => eq(workspace.slug, workspaceSlug)),
    [workspaceSlug],
  );
}
