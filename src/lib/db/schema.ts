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
  active_workspace_id: text("active_workspace_id"),
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

export const workspace = pgTable("workspace", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  url_key: text("url_key").notNull(),
  previous_url_keys: jsonb("previous_url_keys")
    .$type<string[]>()
    .default([])
    .notNull(),
  icon: text("icon"),
  color: text("color"),
  logo: text("logo"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const workspace_user = pgTable(
  "workspace_user",
  {
    id: text("id").primaryKey(),
    role: text("role").notNull().default("member"),
    user_id: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    workspace_id: text("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("workspaceUser_userId_idx").on(table.user_id),
    index("workspaceUser_workspaceId_idx").on(table.workspace_id),
  ],
);

export const team = pgTable(
  "team",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    key: text("key").notNull(),
    description: text("description"),
    icon: text("icon"),
    color: text("color"),
    workspace_id: text("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("team_workspaceId_idx").on(table.workspace_id),
    index("team_key_idx").on(table.key),
  ],
);

export const team_member = pgTable(
  "team_member",
  {
    id: text("id").primaryKey(),
    user_id: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    team_id: text("team_id")
      .notNull()
      .references(() => team.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("teamMember_userId_idx").on(table.user_id),
    index("teamMember_teamId_idx").on(table.team_id),
  ],
);

export const column = pgTable(
  "column",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    position: integer("position").notNull(),
    color: text("color"),
    type: text("type").notNull().default("default"),
    team_id: text("team_id")
      .notNull()
      .references(() => team.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("column_teamId_idx").on(table.team_id),
    index("column_position_idx").on(table.position),
  ],
);

export const task = pgTable(
  "task",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    priority: integer("priority").notNull().default(0),
    position: integer("position").notNull(),
    estimate_points: integer("estimate_points"),
    due_date: timestamp("due_date"),
    started_at: timestamp("started_at"),
    completed_at: timestamp("completed_at"),
    canceled_at: timestamp("canceled_at"),
    team_id: text("team_id")
      .notNull()
      .references(() => team.id, { onDelete: "cascade" }),
    column_id: text("column_id")
      .notNull()
      .references(() => column.id, { onDelete: "restrict" }),
    assignee_id: text("assignee_id").references(() => user.id, {
      onDelete: "set null",
    }),
    creator_id: text("creator_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    parent_task_id: text("parent_task_id"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("task_teamId_idx").on(table.team_id),
    index("task_columnId_idx").on(table.column_id),
    index("task_assigneeId_idx").on(table.assignee_id),
    index("task_creatorId_idx").on(table.creator_id),
    index("task_parentTaskId_idx").on(table.parent_task_id),
    index("task_position_idx").on(table.position),
    index("task_identifier_idx").on(table.identifier),
    unique("task_identifier_team_unique").on(table.team_id, table.identifier),
  ],
);

export const task_label = pgTable(
  "task_label",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    color: text("color").notNull(),
    workspace_id: text("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("taskLabel_workspaceId_idx").on(table.workspace_id)],
);

export const task_label_assignment = pgTable(
  "task_label_assignment",
  {
    id: text("id").primaryKey(),
    task_id: text("task_id")
      .notNull()
      .references(() => task.id, { onDelete: "cascade" }),
    label_id: text("label_id")
      .notNull()
      .references(() => task_label.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("taskLabelAssignment_taskId_idx").on(table.task_id),
    index("taskLabelAssignment_labelId_idx").on(table.label_id),
  ],
);

// Relations (atualize também)
export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  workspace_memberships: many(workspace_user),
  active_workspace: one(workspace, {
    fields: [user.active_workspace_id],
    references: [workspace.id],
  }),
  team_memberships: many(team_member),
  assigned_tasks: many(task, { relationName: "assignee" }),
  created_tasks: many(task, { relationName: "creator" }),
}));

// Continue com as outras relations...

// Types
export type User = InferSelectModel<typeof user>;
export type Workspace = InferSelectModel<typeof workspace>;
export type WorkspaceUser = InferSelectModel<typeof workspace_user>;
export type Team = InferSelectModel<typeof team>;
export type TeamMember = InferSelectModel<typeof team_member>;
export type Column = InferSelectModel<typeof column>;
export type Task = InferSelectModel<typeof task>;
export type TaskLabel = InferSelectModel<typeof task_label>;
export type TaskLabelAssignment = InferSelectModel<
  typeof task_label_assignment
>;

// Zod Schemas para Insert
export const insertUserSchema = createInsertSchema(user);
export const insertWorkspaceSchema = createInsertSchema(workspace);
export const insertWorkspaceUserSchema = createInsertSchema(workspace_user);
export const insertTeamSchema = createInsertSchema(team);
export const insertTeamMemberSchema = createInsertSchema(team_member);
export const insertColumnSchema = createInsertSchema(column);
export const insertTaskSchema = createInsertSchema(task);
export const insertTaskLabelSchema = createInsertSchema(task_label);
export const insertTaskLabelAssignmentSchema = createInsertSchema(
  task_label_assignment,
);

// Zod Schemas para Select
export const selectUserSchema = createInsertSchema(user);
export const selectWorkspaceSchema = createInsertSchema(workspace);
export const selectWorkspaceUserSchema = createInsertSchema(workspace_user);
export const selectTeamSchema = createInsertSchema(team);
export const selectTeamMemberSchema = createInsertSchema(team_member);
export const selectColumnSchema = createInsertSchema(column);
export const selectTaskSchema = createInsertSchema(task);
export const selectTaskLabelSchema = createInsertSchema(task_label);
export const selectTaskLabelAssignmentSchema = createInsertSchema(
  task_label_assignment,
);
