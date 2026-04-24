import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Client Profile — Step 1: Personal & Financial Background
export const clientProfiles = mysqlTable("client_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  // Personal
  fullName: varchar("fullName", { length: 256 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 32 }),
  location: varchar("location", { length: 128 }),
  // Income history
  avgAnnualIncome: decimal("avgAnnualIncome", { precision: 12, scale: 2 }),
  yearsAtIncome: int("yearsAtIncome"),
  redundancyDate: varchar("redundancyDate", { length: 32 }),
  redundancyPayout: decimal("redundancyPayout", { precision: 12, scale: 2 }),
  // Assets & liabilities
  cashSavings: decimal("cashSavings", { precision: 12, scale: 2 }),
  superBalance: decimal("superBalance", { precision: 12, scale: 2 }),
  propertyEquity: decimal("propertyEquity", { precision: 12, scale: 2 }),
  otherAssets: decimal("otherAssets", { precision: 12, scale: 2 }),
  totalLiabilities: decimal("totalLiabilities", { precision: 12, scale: 2 }),
  // Lifestyle
  monthlyLivingExpenses: decimal("monthlyLivingExpenses", { precision: 10, scale: 2 }),
  dependants: int("dependants"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ClientProfile = typeof clientProfiles.$inferSelect;
export type InsertClientProfile = typeof clientProfiles.$inferInsert;

// Business Fit — Step 2: Skills, preferences, risk tolerance
export const businessFitProfiles = mysqlTable("business_fit_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  // Background
  industryBackground: text("industryBackground"),
  coreSkills: text("coreSkills"),
  leadershipYears: int("leadershipYears"),
  teamSizeManaged: varchar("teamSizeManaged", { length: 64 }),
  // Preferences
  preferredIndustries: text("preferredIndustries"), // JSON array
  avoidIndustries: text("avoidIndustries"),
  preferredLocation: varchar("preferredLocation", { length: 256 }),
  willingToRelocate: boolean("willingToRelocate").default(false),
  // Deal preferences
  targetRevenue: varchar("targetRevenue", { length: 64 }),
  targetEbitda: varchar("targetEbitda", { length: 64 }),
  preferredDealSize: varchar("preferredDealSize", { length: 64 }),
  ownerInvolvement: varchar("ownerInvolvement", { length: 64 }),
  // Risk & lifestyle
  riskTolerance: mysqlEnum("riskTolerance", ["conservative", "moderate", "growth"]).default("moderate"),
  workHoursPerWeek: int("workHoursPerWeek"),
  timelineToClose: varchar("timelineToClose", { length: 64 }),
  whyAcquiring: text("whyAcquiring"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BusinessFitProfile = typeof businessFitProfiles.$inferSelect;
export type InsertBusinessFitProfile = typeof businessFitProfiles.$inferInsert;

// Deal Metrics — Step 4: Full deal calculator
export const dealMetrics = mysqlTable("deal_metrics", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  dealName: varchar("dealName", { length: 256 }),
  businessType: varchar("businessType", { length: 128 }),
  industry: varchar("industry", { length: 128 }),
  // Revenue & earnings
  annualRevenue: decimal("annualRevenue", { precision: 14, scale: 2 }),
  grossProfit: decimal("grossProfit", { precision: 14, scale: 2 }),
  ebitda: decimal("ebitda", { precision: 14, scale: 2 }),
  sde: decimal("sde", { precision: 14, scale: 2 }),
  ownerSalaryAddback: decimal("ownerSalaryAddback", { precision: 12, scale: 2 }),
  // Valuation
  multipleUsed: decimal("multipleUsed", { precision: 5, scale: 2 }),
  askingPrice: decimal("askingPrice", { precision: 14, scale: 2 }),
  negotiatedPrice: decimal("negotiatedPrice", { precision: 14, scale: 2 }),
  // Deal structure
  depositPercent: decimal("depositPercent", { precision: 5, scale: 2 }),
  depositAmount: decimal("depositAmount", { precision: 12, scale: 2 }),
  bankLoanAmount: decimal("bankLoanAmount", { precision: 14, scale: 2 }),
  sellerFinanceAmount: decimal("sellerFinanceAmount", { precision: 12, scale: 2 }),
  sellerFinanceTerm: int("sellerFinanceTerm"),
  sellerFinanceRate: decimal("sellerFinanceRate", { precision: 5, scale: 2 }),
  // Serviceability
  loanTerm: int("loanTerm"),
  interestRate: decimal("interestRate", { precision: 5, scale: 2 }),
  annualDebtService: decimal("annualDebtService", { precision: 12, scale: 2 }),
  dscr: decimal("dscr", { precision: 5, scale: 2 }),
  // Working capital
  workingCapitalRequired: decimal("workingCapitalRequired", { precision: 12, scale: 2 }),
  // Notes
  notes: text("notes"),
  status: mysqlEnum("status", ["draft", "active", "closed", "passed"]).default("draft"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DealMetric = typeof dealMetrics.$inferSelect;
export type InsertDealMetric = typeof dealMetrics.$inferInsert;

// Resources — Step 5: Curated links and tools
export const resources = mysqlTable("resources", {
  id: int("id").autoincrement().primaryKey(),
  category: varchar("category", { length: 64 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  url: text("url").notNull(),
  isExternal: boolean("isExternal").default(true),
  isPinned: boolean("isPinned").default(false),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Resource = typeof resources.$inferSelect;
export type InsertResource = typeof resources.$inferInsert;
