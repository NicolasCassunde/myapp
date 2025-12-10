import {
  workspaceCollection,
  workspaceUserCollection,
  teamCollection,
  teamMemberCollection,
} from "@/lib/collections";
import { eq, and, useLiveQuery } from "@tanstack/react-db";

export function useActiveOrgAndTeam({
  organizationSlug,
  teamKey,
  userId,
}: {
  organizationSlug: string;
  teamKey: string;
  userId: string;
}) {
  return useLiveQuery(
    (q) =>
      q
        .from({ workspaceUser: workspaceUserCollection })
        .join(
          { workspace: workspaceCollection },
          ({ workspaceUser, workspace }) =>
            eq(workspaceUser.workspace_id, workspace.id),
        )
        .join({ team: teamCollection }, ({ workspace, team }) =>
          eq(team.workspace_id, workspace?.id),
        )
        .join({ teamMember: teamMemberCollection }, ({ team, teamMember }) =>
          eq(teamMember.team_id, team?.id),
        )
        .where(({ workspaceUser, workspace, team, teamMember }) =>
          and(
            eq(workspaceUser.user_id, userId),
            eq(workspace?.slug, organizationSlug),
            eq(team?.key, teamKey),
            eq(teamMember?.user_id, userId),
          ),
        )
        .select(({ workspaceUser, workspace, team }) => ({
          activeOrganization: workspace,
          activeTeam: team,
          role: workspaceUser.role,
        })),
    [organizationSlug, teamKey, userId], // re-suspend quando qualquer parâmetro mudar
  );
}
