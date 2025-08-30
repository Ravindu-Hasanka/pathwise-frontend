// Skill progress type (current vs target)
export type SkillData = {
  skillId: number;
  name: string;
  level: number;
  updatedAt: string;
  createdAt: string;
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
  skillId: number;
  skill: string;
  level: number | null;
  target: number | null;
  updatedAt: string | null;
};
