import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  integer,
  jsonb,
  unique,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  activeOrganizationId: text("active_organization_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const organization = pgTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const organizationUser = pgTable(
  "organization_user",
  {
    id: text("id").primaryKey(),
    role: text("role").notNull().default("member"), // owner, admin, member
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("organizationUser_userId_idx").on(table.userId),
    index("organizationUser_organizationId_idx").on(table.organizationId),
  ],
);

export const workspace = pgTable(
  "workspace",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    urlKey: text("url_key").notNull(), // current key for URLs
    previousUrlKeys: jsonb("previous_url_keys")
      .$type<string[]>()
      .default([])
      .notNull(), // historical keys
    icon: text("icon"),
    color: text("color"),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("workspace_organizationId_idx").on(table.organizationId),
    index("workspace_urlKey_idx").on(table.urlKey),
  ],
);

export const team = pgTable(
  "team",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    key: text("key").notNull(), // e.g., "ENG" for Engineering (usado em task IDs)
    description: text("description"),
    icon: text("icon"),
    color: text("color"),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("team_workspaceId_idx").on(table.workspaceId),
    index("team_key_idx").on(table.key),
  ],
);

export const teamMember = pgTable(
  "team_member",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    teamId: text("team_id")
      .notNull()
      .references(() => team.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("teamMember_userId_idx").on(table.userId),
    index("teamMember_teamId_idx").on(table.teamId),
  ],
);

export const column = pgTable(
  "column",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    position: integer("position").notNull(), // ordem das colunas
    color: text("color"),
    type: text("type").notNull().default("default"), // backlog, unstarted, started, completed, canceled
    teamId: text("team_id")
      .notNull()
      .references(() => team.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("column_teamId_idx").on(table.teamId),
    index("column_position_idx").on(table.position),
  ],
);

export const task = pgTable(
  "task",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(), // e.g., "ENG-123" - removido .unique()
    title: text("title").notNull(),
    description: text("description"),
    priority: integer("priority").notNull().default(0), // 0=none, 1=urgent, 2=high, 3=medium, 4=low
    position: integer("position").notNull(), // posição dentro da coluna (para ordenação)
    estimatePoints: integer("estimate_points"), // story points
    dueDate: timestamp("due_date"),
    startedAt: timestamp("started_at"),
    completedAt: timestamp("completed_at"),
    canceledAt: timestamp("canceled_at"),
    teamId: text("team_id")
      .notNull()
      .references(() => team.id, { onDelete: "cascade" }),
    columnId: text("column_id")
      .notNull()
      .references(() => column.id, { onDelete: "restrict" }),
    assigneeId: text("assignee_id").references(() => user.id, {
      onDelete: "set null",
    }),
    creatorId: text("creator_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    parentTaskId: text("parent_task_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("task_teamId_idx").on(table.teamId),
    index("task_columnId_idx").on(table.columnId),
    index("task_assigneeId_idx").on(table.assigneeId),
    index("task_creatorId_idx").on(table.creatorId),
    index("task_parentTaskId_idx").on(table.parentTaskId),
    index("task_position_idx").on(table.position),
    index("task_identifier_idx").on(table.identifier),
    // Constraint única composta: identifier só precisa ser único dentro do mesmo team
    unique("task_identifier_team_unique").on(table.teamId, table.identifier),
  ],
);

export const taskLabel = pgTable(
  "task_label",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    color: text("color").notNull(),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("taskLabel_workspaceId_idx").on(table.workspaceId)],
);

export const taskLabelAssignment = pgTable(
  "task_label_assignment",
  {
    id: text("id").primaryKey(),
    taskId: text("task_id")
      .notNull()
      .references(() => task.id, { onDelete: "cascade" }),
    labelId: text("label_id")
      .notNull()
      .references(() => taskLabel.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("taskLabelAssignment_taskId_idx").on(table.taskId),
    index("taskLabelAssignment_labelId_idx").on(table.labelId),
  ],
);

// Relations
export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  organizationMemberships: many(organizationUser),
  activeOrganization: one(organization, {
    fields: [user.activeOrganizationId],
    references: [organization.id],
  }),
  teamMemberships: many(teamMember),
  assignedTasks: many(task, { relationName: "assignee" }),
  createdTasks: many(task, { relationName: "creator" }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const organizationRelations = relations(organization, ({ many }) => ({
  members: many(organizationUser),
  workspaces: many(workspace),
}));

export const organizationUserRelations = relations(
  organizationUser,
  ({ one }) => ({
    user: one(user, {
      fields: [organizationUser.userId],
      references: [user.id],
    }),
    organization: one(organization, {
      fields: [organizationUser.organizationId],
      references: [organization.id],
    }),
  }),
);

export const workspaceRelations = relations(workspace, ({ one, many }) => ({
  organization: one(organization, {
    fields: [workspace.organizationId],
    references: [organization.id],
  }),
  teams: many(team),
  labels: many(taskLabel),
}));

export const teamRelations = relations(team, ({ one, many }) => ({
  workspace: one(workspace, {
    fields: [team.workspaceId],
    references: [workspace.id],
  }),
  members: many(teamMember),
  columns: many(column),
  tasks: many(task),
}));

export const teamMemberRelations = relations(teamMember, ({ one }) => ({
  user: one(user, {
    fields: [teamMember.userId],
    references: [user.id],
  }),
  team: one(team, {
    fields: [teamMember.teamId],
    references: [team.id],
  }),
}));

export const columnRelations = relations(column, ({ one, many }) => ({
  team: one(team, {
    fields: [column.teamId],
    references: [team.id],
  }),
  tasks: many(task),
}));

export const taskRelations = relations(task, ({ one, many }) => ({
  team: one(team, {
    fields: [task.teamId],
    references: [team.id],
  }),
  column: one(column, {
    fields: [task.columnId],
    references: [column.id],
  }),
  assignee: one(user, {
    fields: [task.assigneeId],
    references: [user.id],
    relationName: "assignee",
  }),
  creator: one(user, {
    fields: [task.creatorId],
    references: [user.id],
    relationName: "creator",
  }),
  parentTask: one(task, {
    fields: [task.parentTaskId],
    references: [task.id],
    relationName: "parentTask",
  }),
  subTasks: many(task, { relationName: "parentTask" }),
  labelAssignments: many(taskLabelAssignment),
}));

export const taskLabelRelations = relations(taskLabel, ({ one, many }) => ({
  workspace: one(workspace, {
    fields: [taskLabel.workspaceId],
    references: [workspace.id],
  }),
  taskAssignments: many(taskLabelAssignment),
}));

export const taskLabelAssignmentRelations = relations(
  taskLabelAssignment,
  ({ one }) => ({
    task: one(task, {
      fields: [taskLabelAssignment.taskId],
      references: [task.id],
    }),
    label: one(taskLabel, {
      fields: [taskLabelAssignment.labelId],
      references: [taskLabel.id],
    }),
  }),
);

export type User = InferSelectModel<typeof user>;
export type Organization = InferSelectModel<typeof organization>;
export type OrganizationUser = InferSelectModel<typeof organizationUser>;
export type Workspace = InferSelectModel<typeof workspace>;
export type Team = InferSelectModel<typeof team>;
export type TeamMember = InferSelectModel<typeof teamMember>;
export type Column = InferSelectModel<typeof column>;
export type Task = InferSelectModel<typeof task>;
export type TaskLabel = InferSelectModel<typeof taskLabel>;
export type TaskLabelAssignment = InferSelectModel<typeof taskLabelAssignment>;

// Zod Schemas para Insert
export const insertUserSchema = createInsertSchema(user);
export const insertOrganizationSchema = createInsertSchema(organization);
export const insertOrganizationUserSchema =
  createInsertSchema(organizationUser);
export const insertWorkspaceSchema = createInsertSchema(workspace);
export const insertTeamSchema = createInsertSchema(team);
export const insertTeamMemberSchema = createInsertSchema(teamMember);
export const insertColumnSchema = createInsertSchema(column);
export const insertTaskSchema = createInsertSchema(task);
export const insertTaskLabelSchema = createInsertSchema(taskLabel);
export const insertTaskLabelAssignmentSchema =
  createInsertSchema(taskLabelAssignment);

// Zod Schemas para Select (opcional, caso precise)
export const selectUserSchema = createInsertSchema(user);
export const selectOrganizationSchema = createInsertSchema(organization);
export const selectOrganizationUserSchema =
  createInsertSchema(organizationUser);
export const selectWorkspaceSchema = createInsertSchema(workspace);
export const selectTeamSchema = createInsertSchema(team);
export const selectTeamMemberSchema = createInsertSchema(teamMember);
export const selectColumnSchema = createInsertSchema(column);
export const selectTaskSchema = createInsertSchema(task);
export const selectTaskLabelSchema = createInsertSchema(taskLabel);
export const selectTaskLabelAssignmentSchema =
  createInsertSchema(taskLabelAssignment);
