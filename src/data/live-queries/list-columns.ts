import { teamCollection, columnCollection } from "@/lib/collections";
import { eq, useLiveQuery } from "@tanstack/react-db";

export function useColumnsByTeamSlug({ teamSlug }: { teamSlug: string }) {
  return useLiveQuery(
    (q) =>
      q
        .from({ team: teamCollection })
        .join({ column: columnCollection }, ({ team, column }) =>
          eq(column.team_id, team.id),
        )
        .where(({ team }) => eq(team.key, teamSlug))
        .select(({ column }) => ({
          ...column,
        })),
    [teamSlug],
  );
}
