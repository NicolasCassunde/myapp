import { nanoid } from "nanoid";
import {
  columnCollection,
  organizationCollection,
  organizationUserCollection,
  taskCollection,
  teamCollection,
  teamMemberCollection,
  userCollection,
  workspaceCollection,
} from "./collections";

/**
 * Gera uma key para o team baseada no nome da organização
 * Ex: "Botafogo" -> "BOT", "Linear" -> "LIN"
 */
function generateTeamKey(name: string): string {
  const cleaned = name.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return cleaned.substring(0, 3).padEnd(3, "X");
}

export async function createOrganizationWithDefaults(
  organizationName: string,
  userId: string,
) {
  const orgId = nanoid();
  const workspaceId = nanoid();
  const teamId = nanoid();
  const orgUserId = nanoid();
  const teamMemberId = nanoid();

  const slug = organizationName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const teamKey = generateTeamKey(organizationName);

  const columnIds = {
    backlog: nanoid(),
    todo: nanoid(),
    inProgress: nanoid(),
    done: nanoid(),
  };

  const taskId = nanoid();

  // 1. Organization
  const orgMutation = organizationCollection.insert({
    id: orgId,
    name: organizationName,
    slug,
    logo: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await orgMutation.isPersisted.promise;

  // 2. Organization User
  const orgUserMutation = organizationUserCollection.insert({
    id: orgUserId,
    userId,
    organizationId: orgId,
    role: "owner",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await orgUserMutation.isPersisted.promise;

  // 3. Workspace
  const workspaceMutation = workspaceCollection.insert({
    id: workspaceId,
    name: organizationName,
    urlKey: slug,
    previousUrlKeys: [],
    icon: null,
    color: "#3b82f6",
    organizationId: orgId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await workspaceMutation.isPersisted.promise;

  // 4. Team
  const teamMutation = teamCollection.insert({
    id: teamId,
    name: organizationName,
    key: teamKey,
    description: "Default team for general tasks",
    icon: "🚀",
    color: "#3b82f6",
    workspaceId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await teamMutation.isPersisted.promise;

  // 5. Team Member
  const teamMemberMutation = teamMemberCollection.insert({
    id: teamMemberId,
    userId,
    teamId,
    createdAt: new Date(),
  });
  await teamMemberMutation.isPersisted.promise;

  // 6. Columns
  const backlogMutation = columnCollection.insert({
    id: columnIds.backlog,
    name: "Backlog",
    position: 0,
    color: "#6b7280",
    type: "backlog",
    teamId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await backlogMutation.isPersisted.promise;

  const todoMutation = columnCollection.insert({
    id: columnIds.todo,
    name: "To Do",
    position: 1,
    color: "#3b82f6",
    type: "unstarted",
    teamId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await todoMutation.isPersisted.promise;

  const inProgressMutation = columnCollection.insert({
    id: columnIds.inProgress,
    name: "In Progress",
    position: 2,
    color: "#f59e0b",
    type: "started",
    teamId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await inProgressMutation.isPersisted.promise;

  const doneMutation = columnCollection.insert({
    id: columnIds.done,
    name: "Done",
    position: 3,
    color: "#10b981",
    type: "completed",
    teamId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await doneMutation.isPersisted.promise;

  // 7. Welcome Task
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
    estimatePoints: null,
    dueDate: null,
    startedAt: null,
    completedAt: null,
    canceledAt: null,
    teamId,
    columnId: columnIds.todo,
    assigneeId: userId,
    creatorId: userId,
    parentTaskId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await taskMutation.isPersisted.promise;

  // 8. Update User
  const userMutation = userCollection.update(userId, (draft) => {
    draft.activeOrganizationId = orgId;
  });
  await userMutation.isPersisted.promise;

  return {
    organizationId: orgId,
    workspaceId,
    teamId,
    slug,
  };
}
