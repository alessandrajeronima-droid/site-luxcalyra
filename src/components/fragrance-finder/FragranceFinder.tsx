"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FINDER_QUESTIONS, computeMatches, type FinderAnswers } from "@/lib/fragranceFinder";
import { useAllProducts } from "@/components/providers/ProductsProvider";
import { Header } from "@/components/navigation/Header";
import { FinderHero } from "@/components/fragrance-finder/FinderHero";
import { QuizProgress } from "@/components/fragrance-finder/QuizProgress";
import { GenderQuestion } from "@/components/fragrance-finder/GenderQuestion";
import { VisualQuestion } from "@/components/fragrance-finder/VisualQuestion";
import { FinderResult } from "@/components/fragrance-finder/FinderResult";

type Stage = "hero" | "question" | "revealing" | "result";

export function FragranceFinder() {
  const products = useAllProducts();
  const [stage, setStage] = useState<Stage>("hero");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>({});

  const currentQuestion = FINDER_QUESTIONS[step];

  const matches = useMemo(() => {
    if (stage !== "result") return [];
    return computeMatches(products, answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, answers, products]);

  function start() {
    setStage("question");
  }

  function selectAnswer(label: string) {
    const updated = { ...answers, [currentQuestion.id]: label };
    setAnswers(updated);

    if (step + 1 < FINDER_QUESTIONS.length) {
      setStep((s) => s + 1);
    } else {
      setStage("revealing");
      window.setTimeout(() => setStage("result"), 1100);
    }
  }

  function goBack() {
    if (step === 0) {
      setStage("hero");
      return;
    }
    setStep((s) => s - 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setStage("hero");
  }

  if (stage === "hero") {
    return (
      <>
        <Header />
        <FinderHero onStart={start} />
      </>
    );
  }

  if (stage === "revealing") {
    return (
      <>
        <Header overLight />
        <div className="flex min-h-[70vh] items-center justify-center bg-lux-white px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-2xl font-light italic text-lux-brown"
          >
            Compondo sua assinatura olfativa…
          </motion.p>
        </div>
      </>
    );
  }

  if (stage === "result") {
    return (
      <>
        <Header overLight />
        <div className="bg-lux-white pb-16 pt-28 md:pb-24 md:pt-32">
          <FinderResult matches={matches} answers={answers} onRestart={restart} />
        </div>
      </>
    );
  }

  return (
    <div className="bg-lux-white px-6 pb-16 pt-28 md:px-12 md:pb-24 md:pt-32">
      <Header overLight />
      <div className="mx-auto mb-10 flex max-w-5xl items-center justify-between">
        <button
          onClick={goBack}
          className="text-xs tracking-wide text-lux-brown underline-offset-4 hover:underline"
        >
          ← Voltar
        </button>
        <QuizProgress current={step} total={FINDER_QUESTIONS.length} />
        <span className="text-xs tracking-widest text-lux-brown/60">{currentQuestion.step}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl"
        >
          <h2 className="text-center font-serif text-3xl font-light text-lux-deep md:text-4xl">
            {currentQuestion.title}
          </h2>

          <div className="mt-10">
            {currentQuestion.id === "genero" ? (
              <GenderQuestion options={currentQuestion.options} onSelect={selectAnswer} />
            ) : (
              <VisualQuestion options={currentQuestion.options} onSelect={selectAnswer} />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
