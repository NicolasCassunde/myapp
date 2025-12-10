import { nanoid } from "nanoid";
import {
  columnCollection,
  taskCollection,
  teamCollection,
  teamMemberCollection,
  userCollection,
  workspaceCollection,
  workspaceUserCollection,
} from "./collections";

function generateTeamKey(name: string): string {
  const cleaned = name.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return cleaned.substring(0, 3).padEnd(3, "X");
}

export async function createWorkspaceWithDefaults(
  workspaceName: string,
  userId: string,
) {
  const workspaceId = nanoid();
  const teamId = nanoid();
  const workspaceUserId = nanoid();
  const teamMemberId = nanoid();

  const slug = workspaceName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const teamKey = generateTeamKey(workspaceName);

  const columnIds = {
    backlog: nanoid(),
    todo: nanoid(),
    inProgress: nanoid(),
    done: nanoid(),
  };

  const taskId = nanoid();

  // 1. Workspace
  const workspaceMutation = workspaceCollection.insert({
    id: workspaceId,
    name: workspaceName,
    slug,
    url_key: slug,
    previous_url_keys: [],
    icon: null,
    color: "#3b82f6",
    logo: null,
    created_at: new Date(),
    updated_at: new Date(),
  });
  await workspaceMutation.isPersisted.promise;

  // 2. Workspace User (owner)
  const workspaceUserMutation = workspaceUserCollection.insert({
    id: workspaceUserId,
    user_id: userId,
    workspace_id: workspaceId,
    role: "owner",
    created_at: new Date(),
    updated_at: new Date(),
  });
  await workspaceUserMutation.isPersisted.promise;

  // 3. Team
  const teamMutation = teamCollection.insert({
    id: teamId,
    name: workspaceName,
    key: teamKey,
    description: "Default team for general tasks",
    icon: "🚀",
    color: "#3b82f6",
    workspace_id: workspaceId,
    created_at: new Date(),
    updated_at: new Date(),
  });
  await teamMutation.isPersisted.promise;

  // 4. Team Member
  const teamMemberMutation = teamMemberCollection.insert({
    id: teamMemberId,
    user_id: userId,
    team_id: teamId,
    created_at: new Date(),
  });
  await teamMemberMutation.isPersisted.promise;

  // 5. Columns
  const backlogMutation = columnCollection.insert({
    id: columnIds.backlog,
    name: "Backlog",
    position: 0,
    color: "#6b7280",
    type: "backlog",
    team_id: teamId,
    created_at: new Date(),
    updated_at: new Date(),
  });
  await backlogMutation.isPersisted.promise;

  const todoMutation = columnCollection.insert({
    id: columnIds.todo,
    name: "To Do",
    position: 1,
    color: "#3b82f6",
    type: "unstarted",
    team_id: teamId,
    created_at: new Date(),
    updated_at: new Date(),
  });
  await todoMutation.isPersisted.promise;

  const inProgressMutation = columnCollection.insert({
    id: columnIds.inProgress,
    name: "In Progress",
    position: 2,
    color: "#f59e0b",
    type: "started",
    team_id: teamId,
    created_at: new Date(),
    updated_at: new Date(),
  });
  await inProgressMutation.isPersisted.promise;

  const doneMutation = columnCollection.insert({
    id: columnIds.done,
    name: "Done",
    position: 3,
    color: "#10b981",
    type: "completed",
    team_id: teamId,
    created_at: new Date(),
    updated_at: new Date(),
  });
  await doneMutation.isPersisted.promise;

  // 6. Welcome Task
  const taskMutation = taskCollection.insert({
    id: taskId,
    identifier: `${teamKey}-1`,
    title: "Welcome to your workspace! 👋",
    description: `# Getting Started

Here are some things you can do:
- Create new tasks by clicking the "+" button
- Drag tasks between columns to update their status
- Invite team members to collaborate
- Customize columns and workflows

Feel free to edit or delete this task!`,
    priority: 0,
    position: 0,
    estimate_points: null,
    due_date: null,
    started_at: null,
    completed_at: null,
    canceled_at: null,
    team_id: teamId,
    column_id: columnIds.todo,
    assignee_id: userId,
    creator_id: userId,
    parent_task_id: null,
    created_at: new Date(),
    updated_at: new Date(),
  });
  await taskMutation.isPersisted.promise;

  // // 7. Update User
  // const userMutation = userCollection.update(userId, (draft) => {
  //   draft.activeWorkspaceId = workspaceId;
  // });
  // await userMutation.isPersisted.promise;

  return {
    workspaceId,
    workspaceSlug: slug,
    workspaceName,
    teamId,
    teamKey,
    teamName: workspaceName,
    userId,
    workspaceUserId,
    teamMemberId,
  };
}
