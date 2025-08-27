// Skill progress type (current vs target)
export type SkillData = {
  skill: string;
  current: number;
  target: number;
};

// Recommended resource type
export type RecommendedResource = {
  title: string;
  type: "Course" | "Book" | "Free Course" | "Certification" | string; // extend as needed
  provider: string;
  duration: string; // could refine to number + unit if you want
  link: string;
  skill: string;
};

// Progress data type (simplified)
export type ProgressData = {
  skill: string;
  progress: number;
  target: number;
};
