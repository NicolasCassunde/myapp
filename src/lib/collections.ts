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
import { createColumnServerFn } from "@/data/mutations/column";
import { createTaskServerFn } from "@/data/mutations/task";
import { createTaskLabelServerFn } from "@/data/mutations/task-label";
import { createTaskLabelAssignmentServerFn } from "@/data/mutations/task-label-assignment";

const ELECTRIC_URL =
  process.env.NEXT_PUBLIC_ELECTRIC_URL || "http://localhost:3001/v1/shape";

export const userCollection = createCollection(
  electricCollectionOptions<User>({
    id: "users",
    shapeOptions: {
      url: ELECTRIC_URL,
      params: { table: "user" },
    },
    getKey: (item) => item.id,
    // onUpdate: async ({ transaction }) => {
    //   const modified = transaction.mutations[0].modified as Partial<User>;
    //   await updateUserServerFn({
    //     data: {
    //       id: modified.id!,
    //       activeWorkspaceId: modified.activeWorkspaceId,
    //       createdAt: modified.createdAt,
    //       updatedAt: modified.updatedAt,
    //       email: modified.email!,
    //       image: modified.image,
    //       emailVerified: modified.emailVerified,
    //       name: modified.name!,
    //     },
    //   });
    // },
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
    // onUpdate: async ({ transaction }) => {
    //   const modified = transaction.mutations[0].modified as Partial<Team>;
    //   await updateTeamServerFn({ data: modified });
    // },
    // onDelete: async ({ transaction }) => {
    //   const id = transaction.mutations[0].original?.id;
    //   if (id) await deleteTeamServerFn({ data: { id } });
    // },
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
    // onDelete: async ({ transaction }) => {
    //   const id = transaction.mutations[0].original?.id;
    //   if (id) await deleteTeamMemberServerFn({ data: { id } });
    // },
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
    // onUpdate: async ({ transaction }) => {
    //   const modified = transaction.mutations[0].modified as Partial<Column>;
    //   await updateColumnServerFn({ data: modified });
    // },
    // onDelete: async ({ transaction }) => {
    //   const id = transaction.mutations[0].original?.id;
    //   if (id) await deleteColumnServerFn({ data: { id } });
    // },
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
    // onUpdate: async ({ transaction }) => {
    //   const modified = transaction.mutations[0].modified as Partial<Task>;
    //   await updateTaskServerFn({ data: modified });
    // },
    // onDelete: async ({ transaction }) => {
    //   const id = transaction.mutations[0].original?.id;
    //   if (id) await deleteTaskServerFn({ data: { id } });
    // },
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
    // onUpdate: async ({ transaction }) => {
    //   const modified = transaction.mutations[0].modified as Partial<TaskLabel>;
    //   await updateTaskLabelServerFn({ data: modified });
    // },
    // onDelete: async ({ transaction }) => {
    //   const id = transaction.mutations[0].original?.id;
    //   if (id) await deleteTaskLabelServerFn({ data: { id } });
    // },
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
    // onDelete: async ({ transaction }) => {
    //   const id = transaction.mutations[0].original?.id;
    //   if (id) await deleteTaskLabelAssignmentServerFn({ data: { id } });
    // },
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
