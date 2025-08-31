import { setAuthCookies } from "@/app/lib/authCookies";
import axios from "axios";
import api from "./baseApi";
import { use } from "react";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api";

export const createJobSeeker = async (data: any) => {
  const res = await axios.post(`${API_BASE}/auth/register`, data);
  const { accessToken, refreshToken } = res.data;
  setAuthCookies(accessToken, refreshToken);
  return res;
};

export const createCoach = async (data: any) => {
  const res = await axios.post(`${API_BASE}/auth/register`, data);
  const { accessToken, refreshToken } = res.data;
  setAuthCookies(accessToken, refreshToken);
  return res;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API_BASE}/auth/login`, data);
  const { accessToken, refreshToken } = res.data;
  setAuthCookies(accessToken, refreshToken);
  return res;
};

export const retrieveUser = (id: number) => {
  return api.get(`/onboarding/${id}`);
};

export const updateJobSeeker = (id: number, data: any) => {
  return api.put(`/onboarding/jobseeker/${id}`, data);
};

export const updateCoach = (id: number, data: any) => {
  return api.put(`/onboarding/coach/${id}`, data);
};

export const getRecommendedCourses = (jobSeekerId: number) => {
  const response = api.get(`/skills/recommended-resources/${jobSeekerId}`);
  console.log("API Response:", response);
  return response;
};

export const getRecommendedJobs = (jobSeekerId: number) => {
  return api.get(`/jobs/recommended-jobs/${jobSeekerId}`);
};

export const updateSkillLevel = (skillId:number, level: number) => {
  const skillUpdateDto = { skillId,level };
  return api.post(`/skills/update-score`, skillUpdateDto);
};

export const getSkillsByUser = (userId: number) => {
  return api.get(`/skills/user-skills/${userId}`);
}

export const getCareerPaths = (userId: number) => {
  return api.get(`/career-path/get-carrer-path/${userId}`);
}
