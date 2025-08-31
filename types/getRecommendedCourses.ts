type SkillLevel = "beginner" | "intermediate" | "expert";

interface Skill {
  skill: string;
  level: SkillLevel;
}

interface Course {
  course_link: string;
  expected_skills: string[];
}

interface JobRole {
  skills: Skill[];
  courses: Course[];
  jobRoleName: string;
}

type Industries = {
  [industryName: string]: JobRole[];
};

interface getRecommendedCoursesRootType {
  string: any[]; // can keep this as array if needed
  [industry: string]: JobRole[] | any[];
}
