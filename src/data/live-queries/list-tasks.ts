import { teamCollection, taskCollection } from "@/lib/collections";
import { eq, useLiveQuery } from "@tanstack/react-db";

export function useTasksByTeamSlug({ teamSlug }: { teamSlug: string }) {
  return useLiveQuery(
    (q) =>
      q
        .from({ team: teamCollection })
        .join({ task: taskCollection }, ({ team, task }) =>
          eq(task.team_id, team.id),
        )
        .where(({ team }) => eq(team.key, teamSlug))
        .select(({ task }) => ({
          ...task,
        })), // apenas a task
    [teamSlug],
  );
}
