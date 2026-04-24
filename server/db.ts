import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  clientProfiles, InsertClientProfile,
  businessFitProfiles, InsertBusinessFitProfile,
  dealMetrics, InsertDealMetric,
  resources, InsertResource,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ── Client Profile ────────────────────────────────────────────────────────
export async function getClientProfile(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(clientProfiles).where(eq(clientProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function upsertClientProfile(userId: number, data: Partial<InsertClientProfile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getClientProfile(userId);
  if (existing) {
    await db.update(clientProfiles).set({ ...data, updatedAt: new Date() }).where(eq(clientProfiles.userId, userId));
  } else {
    await db.insert(clientProfiles).values({ ...data, userId });
  }
  return getClientProfile(userId);
}

// ── Business Fit ──────────────────────────────────────────────────────────
export async function getBusinessFitProfile(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(businessFitProfiles).where(eq(businessFitProfiles.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function upsertBusinessFitProfile(userId: number, data: Partial<InsertBusinessFitProfile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getBusinessFitProfile(userId);
  if (existing) {
    await db.update(businessFitProfiles).set({ ...data, updatedAt: new Date() }).where(eq(businessFitProfiles.userId, userId));
  } else {
    await db.insert(businessFitProfiles).values({ ...data, userId });
  }
  return getBusinessFitProfile(userId);
}

// ── Deal Metrics ──────────────────────────────────────────────────────────
export async function getDealMetrics(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(dealMetrics).where(eq(dealMetrics.userId, userId));
}

export async function upsertDealMetric(userId: number, data: Partial<InsertDealMetric> & { id?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.id) {
    const { id, ...rest } = data;
    await db.update(dealMetrics).set({ ...rest, updatedAt: new Date() })
      .where(and(eq(dealMetrics.id, id), eq(dealMetrics.userId, userId)));
    const result = await db.select().from(dealMetrics).where(eq(dealMetrics.id, id)).limit(1);
    return result[0] ?? null;
  } else {
    const { id: _id, ...rest } = data;
    const result = await db.insert(dealMetrics).values({ ...rest, userId });
    const insertId = (result as unknown as { insertId: number }).insertId;
    const rows = await db.select().from(dealMetrics).where(eq(dealMetrics.id, insertId)).limit(1);
    return rows[0] ?? null;
  }
}

export async function deleteDealMetric(userId: number, id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(dealMetrics).where(and(eq(dealMetrics.id, id), eq(dealMetrics.userId, userId)));
  return { success: true };
}

// ── Resources ─────────────────────────────────────────────────────────────
export async function getResources() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(resources);
}

export async function seedResources() {
  const db = await getDb();
  if (!db) return;
  const seeds: InsertResource[] = [
    { category: "Due Diligence", title: "ASIC Company Search", description: "Search company registration, directors, charges and insolvency history.", url: "https://connectonline.asic.gov.au/", sortOrder: 1 },
    { category: "Due Diligence", title: "PPSR Register Search", description: "Check for registered security interests over personal property.", url: "https://www.ppsr.gov.au/", sortOrder: 2 },
    { category: "Due Diligence", title: "ABN Lookup", description: "Verify ABN, GST registration, and entity details.", url: "https://www.abn.business.gov.au/", sortOrder: 3 },
    { category: "Due Diligence", title: "ATO Business Portal", description: "Verify tax obligations, BAS lodgement history, and ATO compliance.", url: "https://www.ato.gov.au/businesses-and-organisations/", sortOrder: 4 },
    { category: "Due Diligence", title: "Fair Work Pay Calculator", description: "Check award wage compliance and minimum entitlements for all employee categories.", url: "https://calculate.fairwork.gov.au/", sortOrder: 5 },
    { category: "Due Diligence", title: "Equifax Business Credit Report", description: "Business credit history, payment defaults, and financial risk assessment.", url: "https://www.equifax.com.au/business/", sortOrder: 6 },
    { category: "Valuation", title: "Comparable.com.au", description: "Australian SME comparable business sales data and valuation multiples by industry.", url: "https://www.comparable.com.au/", sortOrder: 1 },
    { category: "Valuation", title: "BizBuySell Australia", description: "Australian business listings — use for market comparables and deal flow sourcing.", url: "https://www.bizbuysell.com.au/", sortOrder: 2 },
    { category: "Valuation", title: "SEEK Business", description: "Business-for-sale listings across all Australian states and industries.", url: "https://www.seekbusiness.com.au/", sortOrder: 3 },
    { category: "Valuation", title: "IBISWorld Australia", description: "Industry reports, benchmarks, and market sizing for 500+ Australian industries.", url: "https://www.ibisworld.com/au/", sortOrder: 4 },
    { category: "Finance", title: "Judo Bank — Business Acquisition Lending", description: "Specialist SME acquisition lender. Key 120% program partner. DSCR-based lending.", url: "https://www.judo.bank/business-loans/", sortOrder: 1 },
    { category: "Finance", title: "NAB Business Acquisition Finance", description: "NAB SME acquisition finance — term loans, equipment finance, and working capital.", url: "https://www.nab.com.au/business/loans-and-finance/business-acquisition-finance", sortOrder: 2 },
    { category: "Finance", title: "Commonwealth Bank Business Lending", description: "CBA business acquisition loans and commercial finance options.", url: "https://www.commbank.com.au/business/loans-and-finance.html", sortOrder: 3 },
    { category: "Finance", title: "SMSF Borrowing Rules (ATO)", description: "ATO guidance on limited recourse borrowing arrangements (LRBA) for SMSF business acquisition.", url: "https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/self-managed-super-funds-smsf/investing/borrowing-and-limited-recourse-borrowing-arrangements", sortOrder: 4 },
    { category: "Legal", title: "Fair Work — Transfer of Business", description: "Employee entitlements, transfer of business rules, and redundancy obligations.", url: "https://www.fairwork.gov.au/ending-employment/transfer-of-business", sortOrder: 1 },
    { category: "Legal", title: "Australian Consumer Law", description: "Vendor warranties, misrepresentation, and consumer protection in business sales.", url: "https://www.accc.gov.au/consumers/consumer-rights-guarantees/", sortOrder: 2 },
    { category: "Legal", title: "ATO — GST Going Concern", description: "GST-free treatment for sale of a going concern — eligibility and conditions.", url: "https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/in-detail/rules-for-specific-transactions/going-concerns/", sortOrder: 3 },
    { category: "Scripts & Templates", title: "Contrarian Thinking — Main Street Accelerator", description: "The full MSA course — 10 units, 30 tools, scripts, templates and deal frameworks.", url: "https://learn.contrarianthinking.co/main-street-accelerator/", sortOrder: 1 },
    { category: "Scripts & Templates", title: "LINK Business Brokers Australia", description: "Australia's largest business brokerage network — deal flow and broker contacts.", url: "https://www.linkbusiness.com.au/", sortOrder: 2 },
    { category: "Scripts & Templates", title: "Finn Business Sales", description: "National business broker network — listings and off-market deal sourcing.", url: "https://www.finnbusiness.com.au/", sortOrder: 3 },
    { category: "Scripts & Templates", title: "Benchmark Business Sales", description: "SME business broker — specialises in manufacturing, trade, and services.", url: "https://www.benchmarkbusiness.com.au/", sortOrder: 4 },
    { category: "Market Research", title: "ABS Business Statistics", description: "Australian Bureau of Statistics — industry counts, revenue benchmarks, employment data.", url: "https://www.abs.gov.au/statistics/economy/business-indicators", sortOrder: 1 },
    { category: "Market Research", title: "BuiltWith Technology Lookup", description: "Identify the technology stack of any target business website.", url: "https://builtwith.com/", sortOrder: 2 },
    { category: "Market Research", title: "ProductReview.com.au", description: "Australian consumer reviews — assess target business reputation and NPS.", url: "https://www.productreview.com.au/", sortOrder: 3 },
  ];
  await db.insert(resources).values(seeds);
}
