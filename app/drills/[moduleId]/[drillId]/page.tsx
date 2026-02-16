"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import drillsData from "@/content/drills.json";

export default function DrillPage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const drillId = params.drillId as string;

  const [userPrompt, setUserPrompt] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validationSuccess, setValidationSuccess] = useState(false);

  // Find the current module and drill
  const currentModule = drillsData.modules.find((m) => m.id === moduleId);
  const drill = currentModule?.drills.find((d) => d.id === drillId);

  if (!currentModule || !drill) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold">Drill not found</h1>
        <Button asChild>
          <Link href="/drills">← Back to Drills</Link>
        </Button>
      </div>
    );
  }

  // Calculate progress
  const currentIndex = currentModule.drills.findIndex((d) => d.id === drillId);
  const totalDrills = currentModule.drills.length;
  const nextDrill = currentModule.drills[currentIndex + 1];
  const prevDrill = currentModule.drills[currentIndex - 1];

  const handleSubmit = () => {
    // Reset previous validation state
    setValidationError(null);
    setValidationSuccess(false);

    // Basic validation: check if prompt is not empty
    if (!userPrompt.trim()) {
      setValidationError("Please enter a prompt before submitting.");
      return;
    }

    // Validate prompt length (at least 20 characters for meaningful prompts)
    if (userPrompt.trim().length < 20) {
      setValidationError(
        "Your prompt seems too short. Try to be more specific and detailed."
      );
      return;
    }

    // Check for JSON-related drills (based on success criteria)
    const needsJSON = drill.successCriteria.some((criteria) =>
      criteria.toLowerCase().includes("json")
    );

    if (needsJSON) {
      // Check if the prompt mentions JSON
      const mentionsJSON = /\bjson\b/i.test(userPrompt);
      if (!mentionsJSON) {
        setValidationError(
          "This drill requires JSON output. Make sure your prompt specifies JSON format."
        );
        return;
      }

      // Check if prompt mentions the required fields
      const hasFormatInstructions =
        /format|structure|output|return/i.test(userPrompt);
      if (!hasFormatInstructions) {
        setValidationError(
          "Your prompt should specify the output format more clearly."
        );
        return;
      }
    }

    // If all validations pass
    setValidationSuccess(true);
    setSubmitted(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "advanced":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Header with Progress */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <Button asChild variant="outline" size="sm">
            <Link href="/drills">← Back to Modules</Link>
          </Button>
          <span className="text-sm text-muted-foreground">
            Drill {currentIndex + 1} of {totalDrills}
          </span>
        </div>

        <div className="mb-2 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold">{drill.title}</h1>
          <Badge className={getDifficultyColor(drill.difficulty)}>
            {drill.difficulty}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          {currentModule.title} • {drill.duration} minutes
        </p>

        {/* Progress Bar */}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{
              width: `${((currentIndex + 1) / totalDrills) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Objective */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Objective</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{drill.objective}</p>
          </CardContent>
        </Card>

        {/* Context */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Why This Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{drill.context}</p>
          </CardContent>
        </Card>

        {/* Task */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Task</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">{drill.task}</p>

            {/* Success Criteria */}
            <div className="rounded-lg border bg-muted/50 p-4">
              <h4 className="mb-2 font-semibold">Success Criteria:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {drill.successCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {criteria}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Input Area */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Prompt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Write your prompt here..."
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
            <Button
              onClick={handleSubmit}
              disabled={!userPrompt.trim()}
              className="w-full sm:w-auto"
            >
              Submit Prompt
            </Button>

            {/* Validation Error */}
            {validationError && (
              <Alert variant="destructive">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <AlertTitle>Validation Error</AlertTitle>
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            {/* Success Message */}
            {validationSuccess && submitted && (
              <Alert variant="success">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Your prompt looks good! Compare your approach with the hints
                  and solution below.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Hints - Collapsible */}
        <Card>
          <CardContent className="p-0">
            <Accordion type="single" collapsible>
              <AccordionItem value="hints" className="border-0">
                <AccordionTrigger className="px-6 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <span className="font-semibold">Need a Hint?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6">
                  <ul className="space-y-2">
                    {drill.hints.map((hint, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="font-semibold text-foreground">
                          {index + 1}.
                        </span>
                        {hint}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Solution */}
        {submitted && validationSuccess && (
          <Card>
            <CardContent className="space-y-4 p-6">
              {!showSolution ? (
                <Button
                  onClick={() => setShowSolution(true)}
                  variant="outline"
                  className="w-full"
                >
                  Show Solution
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="font-semibold">Solution</h3>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <pre className="whitespace-pre-wrap font-mono text-sm">
                      {drill.solution.prompt}
                    </pre>
                  </div>
                  <div className="rounded-lg border bg-blue-500/10 p-4">
                    <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                      Why This Works:
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {drill.solution.explanation}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:justify-between">
          <div>
            {prevDrill && (
              <Button asChild variant="outline">
                <Link href={`/drills/${moduleId}/${prevDrill.id}`}>
                  ← Previous Drill
                </Link>
              </Button>
            )}
          </div>
          <div>
            {nextDrill ? (
              <Button asChild>
                <Link href={`/drills/${moduleId}/${nextDrill.id}`}>
                  Next Drill →
                </Link>
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href="/drills">Complete Module ✓</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
