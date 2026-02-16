export interface Drill {
  id: string;
  title: string;
  duration: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  objective: string;
  context: string;
  task: string;
  starterCode: string;
  successCriteria: string[];
  hints: string[];
  solution: {
    prompt: string;
    explanation: string;
  };
}

export interface Module {
  id: string;
  title: string;
  description: string;
  drills: Drill[];
}

export interface DrillsData {
  modules: Module[];
}
