import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  crdNumber: text("crd_number").unique(),
  status: text("status").notNull().default("active"), // active, suspended, banned, pending
  crdStatus: text("crd_status").notNull().default("pending"), // pending, verified, rejected
  registrationDate: timestamp("registration_date").notNull().defaultNow(),
  complaintsCount: integer("complaints_count").notNull().default(0),
});

export const crdVerifications = pgTable("crd_verifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  crdNumber: text("crd_number").notNull(),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: integer("reviewed_by"),
  notes: text("notes"),
});

export const complaints = pgTable("complaints", {
  id: serial("id").primaryKey(),
  reportedUserId: integer("reported_user_id").notNull(),
  reporterUserId: integer("reporter_user_id").notNull(),
  reason: text("reason").notNull(),
  description: text("description"),
  status: text("status").notNull().default("pending"), // pending, investigating, resolved, dismissed
  priority: text("priority").notNull().default("medium"), // low, medium, high, urgent
  createdAt: timestamp("created_at").notNull().defaultNow(),
  resolvedAt: timestamp("resolved_at"),
  resolvedBy: integer("resolved_by"),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  status: text("status").notNull().default("active"), // active, deleted, flagged
  createdAt: timestamp("created_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
  deletedBy: integer("deleted_by"),
});

export const ads = pgTable("ads", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  subject: text("subject").notNull(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  fileName: text("file_name"),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").notNull().defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: integer("reviewed_by"),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(),
  recipientId: integer("recipient_id"), // null for bulk messages
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  isBulk: boolean("is_bulk").notNull().default(false),
  sentAt: timestamp("sent_at").notNull().defaultNow(),
  readAt: timestamp("read_at"),
});

export const paymentLogs = pgTable("payment_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  purpose: text("purpose").notNull(), // membership, ad_space, sponsored_post
  status: text("status").notNull().default("pending"), // pending, confirmed, failed
  paymentDate: timestamp("payment_date").notNull().defaultNow(),
  confirmationNumber: text("confirmation_number"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  crdNumber: true,
});

export const insertCRDVerificationSchema = createInsertSchema(crdVerifications).pick({
  userId: true,
  crdNumber: true,
  notes: true,
});

export const insertComplaintSchema = createInsertSchema(complaints).pick({
  reportedUserId: true,
  reporterUserId: true,
  reason: true,
  description: true,
  priority: true,
});

export const insertPostSchema = createInsertSchema(posts).pick({
  userId: true,
  title: true,
  content: true,
});

export const insertAdSchema = createInsertSchema(ads).pick({
  userId: true,
  subject: true,
  companyName: true,
  contactName: true,
  email: true,
  fileName: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  senderId: true,
  recipientId: true,
  subject: true,
  content: true,
  isBulk: true,
});

export const insertPaymentLogSchema = createInsertSchema(paymentLogs).pick({
  userId: true,
  amount: true,
  purpose: true,
  confirmationNumber: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type CRDVerification = typeof crdVerifications.$inferSelect;
export type InsertCRDVerification = z.infer<typeof insertCRDVerificationSchema>;
export type Complaint = typeof complaints.$inferSelect;
export type InsertComplaint = z.infer<typeof insertComplaintSchema>;
export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Ad = typeof ads.$inferSelect;
export type InsertAd = z.infer<typeof insertAdSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type PaymentLog = typeof paymentLogs.$inferSelect;
export type InsertPaymentLog = z.infer<typeof insertPaymentLogSchema>;
