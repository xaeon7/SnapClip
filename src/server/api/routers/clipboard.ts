import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const clipboardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.clipboard.findMany();
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.clipboard.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.string(),
        language: z.string(),
        autoEraseOnce: z.boolean(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.clipboard.upsert({
        where: {
          id: input.id,
        },
        update: { ...input },
        create: { ...input },
      });
    }),
});
