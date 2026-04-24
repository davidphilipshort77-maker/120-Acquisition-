import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getClientProfile, upsertClientProfile,
  getBusinessFitProfile, upsertBusinessFitProfile,
  getDealMetrics, upsertDealMetric, deleteDealMetric,
  getResources, seedResources,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  profile: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return getClientProfile(ctx.user.id);
    }),
    save: protectedProcedure
      .input(z.object({
        fullName: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        location: z.string().optional(),
        avgAnnualIncome: z.string().optional(),
        yearsAtIncome: z.number().optional(),
        redundancyDate: z.string().optional(),
        redundancyPayout: z.string().optional(),
        cashSavings: z.string().optional(),
        superBalance: z.string().optional(),
        propertyEquity: z.string().optional(),
        otherAssets: z.string().optional(),
        totalLiabilities: z.string().optional(),
        monthlyLivingExpenses: z.string().optional(),
        dependants: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return upsertClientProfile(ctx.user.id, input);
      }),
  }),

  businessFit: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return getBusinessFitProfile(ctx.user.id);
    }),
    save: protectedProcedure
      .input(z.object({
        industryBackground: z.string().optional(),
        coreSkills: z.string().optional(),
        leadershipYears: z.number().optional(),
        teamSizeManaged: z.string().optional(),
        preferredIndustries: z.string().optional(),
        avoidIndustries: z.string().optional(),
        preferredLocation: z.string().optional(),
        willingToRelocate: z.boolean().optional(),
        targetRevenue: z.string().optional(),
        targetEbitda: z.string().optional(),
        preferredDealSize: z.string().optional(),
        ownerInvolvement: z.string().optional(),
        riskTolerance: z.enum(["conservative", "moderate", "growth"]).optional(),
        workHoursPerWeek: z.number().optional(),
        timelineToClose: z.string().optional(),
        whyAcquiring: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return upsertBusinessFitProfile(ctx.user.id, input);
      }),
  }),

  deals: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getDealMetrics(ctx.user.id);
    }),
    save: protectedProcedure
      .input(z.object({
        id: z.number().optional(),
        dealName: z.string().optional(),
        businessType: z.string().optional(),
        industry: z.string().optional(),
        annualRevenue: z.string().optional(),
        grossProfit: z.string().optional(),
        ebitda: z.string().optional(),
        sde: z.string().optional(),
        ownerSalaryAddback: z.string().optional(),
        multipleUsed: z.string().optional(),
        askingPrice: z.string().optional(),
        negotiatedPrice: z.string().optional(),
        depositPercent: z.string().optional(),
        depositAmount: z.string().optional(),
        bankLoanAmount: z.string().optional(),
        sellerFinanceAmount: z.string().optional(),
        sellerFinanceTerm: z.number().optional(),
        sellerFinanceRate: z.string().optional(),
        loanTerm: z.number().optional(),
        interestRate: z.string().optional(),
        annualDebtService: z.string().optional(),
        dscr: z.string().optional(),
        workingCapitalRequired: z.string().optional(),
        notes: z.string().optional(),
        status: z.enum(["draft", "active", "closed", "passed"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return upsertDealMetric(ctx.user.id, input);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return deleteDealMetric(ctx.user.id, input.id);
      }),
  }),

  resources: router({
    list: publicProcedure.query(async () => {
      const items = await getResources();
      if (items.length === 0) {
        await seedResources();
        return getResources();
      }
      return items;
    }),
  }),
});

export type AppRouter = typeof appRouter;
