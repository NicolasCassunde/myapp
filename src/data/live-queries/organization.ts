import {
  workspaceCollection,
  workspaceUserCollection,
  teamCollection,
  teamMemberCollection,
} from "@/lib/collections";
import { eq, and, useLiveQuery } from "@tanstack/react-db";

export function useTeamPage({
  workspaceSlug,
  teamKey,
  userId,
}: {
  workspaceSlug: string;
  teamKey: string;
  userId: string;
}) {
  return useLiveQuery(
    (q) =>
      q
        .from({ workspace: workspaceCollection })
        .join(
          { team: teamCollection },
          ({ workspace, team }) => eq(team.workspace_id, workspace.id), // ← snake_case
        )
        .join(
          { teamMember: teamMemberCollection },
          ({ team, teamMember }) => eq(teamMember.team_id, team?.id), // ← snake_case
        )
        .where(({ workspace, team, teamMember }) =>
          and(
            eq(workspace.slug, workspaceSlug),
            eq(team?.key, teamKey),
            eq(teamMember?.user_id, userId), // ← snake_case
          ),
        )
        .select(({ workspace, team, teamMember }) => ({
          workspace,
          team,
          teamMember,
        })),
    [workspaceSlug, teamKey, userId],
  );
}
