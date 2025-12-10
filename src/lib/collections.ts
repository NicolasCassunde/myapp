import { createCollection } from "@tanstack/react-db";
import { electricCollectionOptions } from "@tanstack/electric-db-collection";
import {
  Column,
  Task,
  TaskLabel,
  TaskLabelAssignment,
  Team,
  TeamMember,
  User,
  Workspace,
  WorkspaceUser,
} from "./db/schema";
import { updateUserServerFn } from "@/data/mutations/user";
import {
  createWorkspaceServerFn,
  updateWorkspaceServerFn,
  deleteWorkspaceServerFn,
} from "@/data/mutations/workspace";
import {
  createWorkspaceUserServerFn,
  updateWorkspaceUserServerFn,
  deleteWorkspaceUserServerFn,
} from "@/data/mutations/workspace-user";
import { createTeamServerFn } from "@/data/mutations/team";
import { createTeamMemberServerFn } from "@/data/mutations/team-member";
import {
  createColumnServerFn,
  updateColumnServerFn,
} from "@/data/mutations/column";
import { createTaskServerFn, updateTaskServerFn } from "@/data/mutations/task";
import { createTaskLabelServerFn } from "@/data/mutations/task-label";
import { createTaskLabelAssignmentServerFn } from "@/data/mutations/task-label-assignment";

const ELECTRIC_URL =
  process.env.NEXT_PUBLIC_ELECTRIC_URL || "http://localhost:3001/v1/shape";

function parseDate<T extends string | Date | null | undefined>(
  value: T,
): T extends null ? null : T extends undefined ? undefined : Date {
  if (value === null) return null as any;
  if (value === undefined) return undefined as any;
  if (value instanceof Date) return value as any;
  return new Date(value as string) as any;
}

export const userCollection = createCollection(
  electricCollectionOptions<User>({
    id: "users",
    shapeOptions: {
      url: ELECTRIC_URL,
      params: { table: "user" },
    },
    getKey: (item) => item.id,
  }),
);

export const workspaceCollection = createCollection(
  electricCollectionOptions<Workspace>({
    id: "workspaces",
    shapeOptions: {
      url: ELECTRIC_URL,
      params: { table: "workspace" },
    },
    getKey: (item) => item.id,
    onInsert: async ({ transaction }) => {
      const data = transaction.mutations[0].modified;
      await createWorkspaceServerFn({ data });
    },
    onUpdate: async ({ transaction }) => {
      const modified = transaction.mutations[0].modified as Partial<Workspace>;
      await updateWorkspaceServerFn({
        data: {
          id: modified.id!,
        },
      });
    },
    onDelete: async ({ transaction }) => {
      const id = transaction.mutations[0].original?.id;
      if (id) await deleteWorkspaceServerFn({ data: { id } });
    },
  }),
);

export const workspaceUserCollection = createCollection(
  electricCollectionOptions<WorkspaceUser>({
    id: "workspace-users",
    shapeOptions: {
      url: ELECTRIC_URL,
      params: { table: "workspace_user" },
    },
    getKey: (item) => item.id,
    onInsert: async ({ transaction }) => {
      const data = transaction.mutations[0].modified;
      await createWorkspaceUserServerFn({ data });
    },
    onUpdate: async ({ transaction }) => {
      const modified = transaction.mutations[0]
        .modified as Partial<WorkspaceUser>;
      await updateWorkspaceUserServerFn({
        data: {
          id: modified.id!,
        },
      });
    },
    onDelete: async ({ transaction }) => {
      const id = transaction.mutations[0].original?.id;
      if (id) await deleteWorkspaceUserServerFn({ data: { id } });
    },
  }),
);

export const teamCollection = createCollection(
  electricCollectionOptions<Team>({
    id: "teams",
    shapeOptions: {
      url: ELECTRIC_URL,
      params: { table: "team" },
    },
    getKey: (item) => item.id,
    onInsert: async ({ transaction }) => {
      const data = transaction.mutations[0].modified;
      await createTeamServerFn({ data });
    },
  }),
);

export const teamMemberCollection = createCollection(
  electricCollectionOptions<TeamMember>({
    id: "team-members",
    shapeOptions: {
      url: ELECTRIC_URL,
      params: { table: "team_member" },
    },
    getKey: (item) => item.id,
    onInsert: async ({ transaction }) => {
      const data = transaction.mutations[0].modified;
      await createTeamMemberServerFn({ data });
    },
  }),
);

export const columnCollection = createCollection(
  electricCollectionOptions<Column>({
    id: "columns",
    shapeOptions: {
      url: ELECTRIC_URL,
      params: { table: "column" },
    },
    getKey: (item) => item.id,
    onInsert: async ({ transaction }) => {
      const data = transaction.mutations[0].modified;
      await createColumnServerFn({ data });
    },
    onUpdate: async ({ transaction }) => {
      const modified = transaction.mutations[0].modified as Partial<Column>;
      await updateColumnServerFn({
        data: {
          id: modified.id!,
          color: modified.color,
          created_at: parseDate(modified.created_at!),
          updated_at: parseDate(modified.updated_at!),
          name: modified.name,
          position: modified.position,
          team_id: modified.team_id,
          type: modified.type,
        },
      });
    },
  }),
);

export const taskCollection = createCollection(
  electricCollectionOptions<Task>({
    id: "tasks",
    shapeOptions: {
      url: ELECTRIC_URL,
      params: { table: "task" },
    },
    getKey: (item) => item.id,
    onInsert: async ({ transaction }) => {
      const data = transaction.mutations[0].modified;
      await createTaskServerFn({ data });
    },
    onUpdate: async ({ transaction }) => {
      const modified = transaction.mutations[0].modified as Partial<Task>;
      await updateTaskServerFn({
        data: {
          id: modified.id!,
          assignee_id: modified.assignee_id,
          canceled_at: parseDate(modified.canceled_at!),
          completed_at: parseDate(modified.completed_at!),
          created_at: parseDate(modified.created_at!),
          description: modified.description,
          position: modified.position,
          priority: modified.priority,
          column_id: modified.column_id,
          creator_id: modified.creator_id,
          due_date: parseDate(modified.due_date!),
          estimate_points: modified.estimate_points,
          identifier: modified.identifier,
          parent_task_id: modified.parent_task_id,
          started_at: parseDate(modified.started_at!),
          team_id: modified.team_id,
          title: modified.title,
          updated_at: parseDate(modified.updated_at!),
        },
      });
    },
  }),
);

export const taskLabelCollection = createCollection(
  electricCollectionOptions<TaskLabel>({
    id: "task-labels",
    shapeOptions: {
      url: ELECTRIC_URL,
      params: { table: "task_label" },
    },
    getKey: (item) => item.id,
    onInsert: async ({ transaction }) => {
      const data = transaction.mutations[0].modified;
      await createTaskLabelServerFn({ data });
    },
  }),
);

export const taskLabelAssignmentCollection = createCollection(
  electricCollectionOptions<TaskLabelAssignment>({
    id: "task-label-assignments",
    shapeOptions: {
      url: ELECTRIC_URL,
      params: { table: "task_label_assignment" },
    },
    getKey: (item) => item.id,
    onInsert: async ({ transaction }) => {
      const data = transaction.mutations[0].modified;
      await createTaskLabelAssignmentServerFn({ data });
    },
  }),
);

export const collections = {
  users: userCollection,
  workspaces: workspaceCollection,
  workspaceUsers: workspaceUserCollection,
  teams: teamCollection,
  teamMembers: teamMemberCollection,
  columns: columnCollection,
  tasks: taskCollection,
  taskLabels: taskLabelCollection,
  taskLabelAssignments: taskLabelAssignmentCollection,
};
