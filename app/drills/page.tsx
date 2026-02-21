import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import drillsData from "@/content/drills.json";

export default function DrillsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Learning Modules
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Master AI tools through hands-on drills. Each module contains
          practical exercises designed to build real-world skills.
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {drillsData.modules.map((module) => {
          const totalDuration = module.drills.reduce(
            (sum, drill) => sum + drill.duration,
            0
          );
          const drillCount = module.drills.length;
          const firstDrillId = module.drills[0]?.id;

          return (
            <Card
              key={module.id}
              className="flex flex-col transition-shadow hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>
                      {drillCount} {drillCount === 1 ? "drill" : "drills"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{totalDuration} minutes total</span>
                  </div>
                  <div className="flex items-center gap-2">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="capitalize">
                      {module.drills[0]?.difficulty || "beginner"}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/drills/${module.id}/${firstDrillId}`}>
                    Start Module
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {drillsData.modules.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">
            No modules available yet. Check back soon!
          </p>
        </div>
      )}

      {/* Back to Home */}
      <div className="mt-12 text-center">
        <Button asChild variant="outline">
          <Link href="/">← Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
