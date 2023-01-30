import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { question } from "@/types";

export const quizRouter = createTRPCRouter({

  getQuiz: protectedProcedure.query(async () => {
    const response = await fetch(
      "https://the-trivia-api.com/api/questions?limit=10",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json() as question[];
    return data;
  }),
});
