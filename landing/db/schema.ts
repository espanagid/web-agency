import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
  int,
  longtext,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here. See docs/Database.md for schema examples and patterns.
//
// Example:
// export const posts = mysqlTable("posts", {
//   id: serial("id").primaryKey(),
//   title: varchar("title", { length: 255 }).notNull(),
//   content: text("content"),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
// });
//
// Note: FK columns referencing a serial() PK must use:
//   bigint("columnName", { mode: "number", unsigned: true }).notNull()

/** Заявка на бесплатное демо, собранная ИИ-интейком */
export const leads = mysqlTable("leads", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  lang: varchar("lang", { length: 5 }).notNull().default("es"),
  name: varchar("name", { length: 255 }),
  contact: varchar("contact", { length: 255 }),
  businessName: varchar("businessName", { length: 255 }),
  sector: varchar("sector", { length: 255 }),
  colors: varchar("colors", { length: 255 }),
  hasLogo: varchar("hasLogo", { length: 20 }),
  notes: text("notes"),
  transcript: text("transcript"),
  summary: text("summary"),
  status: mysqlEnum("status", ["new", "contacted", "done"])
    .default("new")
    .notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/** Файлы, приложенные к заявке (фото, лого, PDF — любой формат) */
export const leadFiles = mysqlTable("lead_files", {
  id: serial("id").primaryKey(),
  leadId: bigint("leadId", { mode: "number", unsigned: true }).notNull(),
  filename: varchar("filename", { length: 255 }).notNull(),
  mime: varchar("mime", { length: 120 }).notNull(),
  size: int("size").notNull().default(0),
  data: longtext("data").notNull(), // base64
});

export type LeadFile = typeof leadFiles.$inferSelect;
export type InsertLeadFile = typeof leadFiles.$inferInsert;
