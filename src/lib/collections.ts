import { createCollection } from "@tanstack/react-db";
import { electricCollectionOptions } from "@tanstack/electric-db-collection";
import {
  Column,
  Organization,
  OrganizationUser,
  Task,
  TaskLabel,
  TaskLabelAssignment,
  Team,
  TeamMember,
  User,
  Workspace,
} from "./db/schema";
import { updateUserServerFn } from "@/data/mutations/user";
import {
  createOrganizationServerFn,
  deleteOrganizationServerFn,
  updateOrganizationServerFn,
} from "@/data/mutations/organization";
import {
  createOrganizationUserServerFn,
  updateOrganizationUserServerFn,
} from "@/data/mutations/organization-user";
import {
  createWorkspaceServerFn,
  updateWorkspaceServerFn,
} from "@/data/mutations/workspace";
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
    onUpdate: async ({ transaction }) => {
      const modified = transaction.mutations[0].modified;
      await updateUserServerFn({
        data: modified,
      });
    },
  }),
);

export const organizationCollection = createCollection(
  electricCollectionOptions<Organization>({
    id: "organizations",
    shapeOptions: {
      url: ELECTRIC_URL,
      params: { table: "organization" },
    },
    getKey: (item) => item.id,
    onInsert: async ({ transaction }) => {
      const data = transaction.mutations[0].modified;
      await createOrganizationServerFn({ data });
    },
    onUpdate: async ({ transaction }) => {
      const modified = transaction.mutations[0].modified;
      await updateOrganizationServerFn({
        data: modified,
      });
    },
    // onDelete: async ({ transaction }) => {
    //   const id = transaction.mutations[0].original?.id;
    //   if (id) await deleteOrganizationServerFn({ id });
    // },
  }),
);

export const organizationUserCollection = createCollection(
  electricCollectionOptions<OrganizationUser>({
    id: "organization-users",
    shapeOptions: {
      url: ELECTRIC_URL,
      params: { table: "organization_user" },
    },
    getKey: (item) => item.id,
    onInsert: async ({ transaction }) => {
      const data = transaction.mutations[0].modified;
      await createOrganizationUserServerFn({ data });
    },
    // onUpdate: async ({ transaction }) => {
    //   const modified = transaction.mutations[0]
    //     .modified as Partial<OrganizationUser>;
    //   await updateOrganizationUserServerFn({ data: modified });
    // },
    // onDelete: async ({ transaction }) => {
    //   const id = transaction.mutations[0].original?.id;
    //   if (id) await deleteOrganizationUserServerFn({ id });
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
    // onUpdate: async ({ transaction }) => {
    //   const modified = transaction.mutations[0].modified as Partial<Workspace>;
    //   await updateWorkspaceServerFn({ data: modified });
    // },
    // onDelete: async ({ transaction }) => {
    //   const id = transaction.mutations[0].original?.id;
    //   if (id) await deleteWorkspaceServerFn({ id });
    // },
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
    //   if (id) await deleteTeamServerFn({ id });
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
    //   if (id) await deleteTeamMemberServerFn({ id });
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
    //   if (id) await deleteColumnServerFn({ id });
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
    //   if (id) await deleteTaskServerFn({ id });
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
    //   if (id) await deleteTaskLabelServerFn({ id });
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
    //   if (id) await deleteTaskLabelAssignmentServerFn({ id });
    // },
  }),
);

export const collections = {
  users: userCollection,
  organizations: organizationCollection,
  organizationUsers: organizationUserCollection,
  workspaces: workspaceCollection,
  teams: teamCollection,
  teamMembers: teamMemberCollection,
  columns: columnCollection,
  tasks: taskCollection,
  taskLabels: taskLabelCollection,
  taskLabelAssignments: taskLabelAssignmentCollection,
};
