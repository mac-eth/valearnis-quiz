import { usePageStore, useQuestionStore, useScoreStore } from "@/store";
import { api } from "@/utils/api";
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";
import Link from "next/link";

import type { question } from "@/types";

const Quiz: React.FC = () => {
  // const session = useSession();
  // const router = useRouter();

  // Page State Management
  const page = usePageStore((state) => state.page);
  const increasePage = usePageStore((state) => state.increasePage);
  const decreasePage = usePageStore((state) => state.decreasePage);
  const setPage = usePageStore((state) => state.setPage);

  // Score State Management
  const score = useScoreStore((state) => state.score);
  const increaseScore = useScoreStore((state) => state.increaseScore);
  const decreaseScore = useScoreStore((state) => state.decreaseScore);
  const setScore = useScoreStore((state) => state.setScore);

  // Current Question State Management
  const { selectedAnswer, setSelectedAnswer } = useQuestionStore((state) => ({
    selectedAnswer: state.selectedAnswer,
    setSelectedAnswer: state.setSelectedAnswer,
  }));

  const { answerCorrect, setAnswerCorrect } = useQuestionStore((state) => ({
    answerCorrect: state.currentAnswerCorrect,
    setAnswerCorrect: state.setCurrentAnswerCorrect,
  }));

  // Fetch Questions from API
  const questionList = api.quiz.getQuiz.useQuery().data;

  // Start Quiz Function
  function handleQuizStart() {
    if (questionList) {
      setQuestions(questionList);
      console.log(questions);
    } else {
      return console.log("No questions found!");
    }
  }

  // Handle Answer Selection
  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[page]?.correctAnswer) {
      setAnswerCorrect(true);
      increaseScore();
    } else if (
      answer !== questions[page]?.correctAnswer &&
      answerCorrect === true
    ) {
      setAnswerCorrect(false);
      decreaseScore();
    } else {
      setAnswerCorrect(false);
    }
  };
  const [questions, setQuestions] = useState<question[]>([]);

  // Shuffle Options
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    const correctOption = questions[page]?.correctAnswer;
    const incorrectOptions = questions[page]?.incorrectAnswers;

    if (incorrectOptions && correctOption) {
      const options = [...incorrectOptions, correctOption];
      const shuffledOptions = options.sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffledOptions);
    }
  }, [page, questions]);

  // Get Options
  function GetOptions() {
    return shuffledOptions;
  }

  if (!questions?.[page] && page === 0) {
    return (
      <div className="h-screen bg-neutral-200">
        <Link href="/">
          <button className="duration:300 mx-12 my-12 h-20 w-48 rounded-xl bg-teal-600 hover:bg-teal-700 font-semibold">
            Back to Home
          </button>
        </Link>
        <div className="relative flex items-center justify-center">
          <button
            className=" h-36 w-96 rounded-xl bg-blue-500 text-2xl font-bold duration-300 hover:bg-blue-700 "
            onClick={handleQuizStart}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (page === 10) {
    return (
      <div className="mx-10 flex h-screen flex-col items-center justify-center gap-2">
        <div className="text-2xl font-bold">Quiz Completed</div>
        <div className="text-xl font-semibold">Score: {score} out of 10</div>
        <div className="flex flex-row gap-4 ">
          <button
            className="w-30 h-18 rounded-lg bg-blue-500 px-5 py-2 "
            onClick={decreasePage}
          >
            Previous Questions
          </button>
          <button
            className="w-30 h-18 rounded-lg bg-teal-500 px-5 py-2 "
            onClick={() => {
              setSelectedAnswer(null);
              setScore(0);
              setQuestions([]);
              setPage(0);
            }}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative h-screen">
        <div className="mx-10 my-10 flex justify-center gap-6 text-2xl font-bold ">
          <div className="justify-self-start text-amber-700">
            Question {page + 1}{" "}
          </div>
          {questions?.[page] && (
            <div className="text-teal-700">{questions?.[page]?.question}</div>
          )}
        </div>
        <div className="mx-10 my-10 flex flex-col gap-6 text-2xl font-bold ">
          {GetOptions().map((option) => (
            <button
              key={option}
              className={`rounded-lg border border-gray-300 shadow duration-300 p-4 ${
                selectedAnswer === option
                  ? "bg-blue-500 hover:bg-blue-700 text-white"
                  : "bg-white hover:bg-neutral-200"
              }`}
              onClick={() => handleAnswerSelection(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {page < 10 ? (
          <div className="flex justify-center gap-6 text-xl font-semibold ">
            {page > 0 && (
              <button
                className="w-40 h-24 rounded-lg bg-blue-500 hover:bg-blue-700 px-5 py-2 duration-300 hover:scale-105 "
                onClick={decreasePage}
              >
                Previous
              </button>
            )}
            {page < 10 && selectedAnswer ? (
              <button
                className="w-40 h-24 rounded-lg bg-blue-500 hover:bg-blue-700 px-5 py-2 duration-300 hover:scale-105 "
                onClick={() => {
                  setSelectedAnswer(null);
                  increasePage();
                }}
              >
                Next
              </button>
            ) : (
              <button
                className="w-40 h-24 rounded-lg bg-red-500 px-5 py-2 "
                disabled={true}
              >
                Next
              </button>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
};

export default Quiz;
