export interface Drill {
  id: string;
  title: string;
  duration: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  order: number;
  objective: string;
  context: string;
  task: string;
  testInput: string;
  starterTemplate: string;
  successCriteria: string[];
  hints: string[];
  solution: {
    prompt: string;
    explanation: string;
  };
  pmApplication: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  drills: Drill[];
}

export interface DrillsData {
  modules: Module[];
}
