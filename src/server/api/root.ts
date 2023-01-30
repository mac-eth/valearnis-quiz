import { createTRPCRouter } from "./trpc";
import { quizRouter } from "./routers/quiz";

export const appRouter = createTRPCRouter({
  quiz: quizRouter,
});

export type AppRouter = typeof appRouter;
