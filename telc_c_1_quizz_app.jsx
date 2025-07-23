import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quizzes = [
  {
    title: "Satzzeichen, mächtige Werkzeuge",
    correctAnswers: {
      1: "G",
      2: "F",
      3: "D",
      4: "B",
      5: "A",
      6: "E"
    },
    statements: {
      A: "Bereits 1762 bemängelte der Gelehrte Johann Christoph Gottsched, dass es im Deutschen keine Zeichen für Staunen oder Mitleid gebe.",
      B: "Dabei konnte damals von verbindlichen Normen noch gar keine Rede sein.",
      C: "Das beklagen selbst die leidenschaftlichsten Verfechter von Kurznachrichten.",
      D: "Erst im Mittelalter kamen irische Mönche auf die Idee, diese Textschlangen mit Zeichen zu versehen, um anderen Lesern das Leben einfacher zu machen.",
      E: "Erst viel später – mit den neuen Medien – ging dieser langgehegte Wunsch in Erfüllung.",
      F: "In ihr reiht sich Buchstabe an Buchstabe, Wort an Wort.",
      G: "Rund 2500 Jahre nach den ersten Schriftzeichen trennen darin erstmals Striche und Punkte die Worte.",
      H: "Um dies zu verstehen, muss man die Arbeitsweise in den mittelalterlichen Schreibstuben beachten."
    }
  }
  // Weitere Quizobjekte hier hinzufügen...
];

export default function QuizApp() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const quiz = quizzes[currentQuizIndex];

  const handleChange = (num, value) => {
    setAnswers({ ...answers, [num]: value.toUpperCase() });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleSkip = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentQuizIndex((prev) => (prev + 1) % quizzes.length);
  };

  const isCorrect = (num) => {
    return answers[num] === quiz.correctAnswers[num];
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <Card className="mb-4">
        <CardContent className="space-y-2 pt-4">
          {Object.entries(quiz.statements).map(([key, text]) => (
            <div key={key}><strong>{key}:</strong> {text}</div>
          ))}
        </CardContent>
      </Card>

      {[1, 2, 3, 4, 5, 6].map((num) => (
        <div key={num} className="flex items-center gap-2 mb-2">
          <label> {num} + </label>
          <Input
            value={answers[num] || ""}
            maxLength={1}
            className={`w-16 ${submitted && !isCorrect(num) ? "border-red-500" : ""}`}
            onChange={(e) => handleChange(num, e.target.value)}
          />
          {submitted && !isCorrect(num) && (
            <span className="text-red-600">❌</span>
          )}
          {submitted && isCorrect(num) && (
            <span className="text-green-600">✅</span>
          )}
        </div>
      ))}

      <div className="mt-4 space-x-2">
        <Button onClick={handleSubmit}>Antworten überprüfen</Button>
        <Button variant="secondary" onClick={handleSkip}>Überspringen</Button>
      </div>
    </div>
  );
}
