import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api";

export const createJobSeeker = (data: any) => {
  return axios.post(`${API_BASE}/onboarding/jobseeker`, data);
};

export const createCoach = (data: any) => {
  return axios.post(`${API_BASE}/onboarding/coach`, data);
};

export const retrieveUser = (id: number) => {
  return axios.get(`${API_BASE}/onboarding/${id}`);
};

export const updateJobSeeker = (id: number, data: any) => {
  return axios.put(`${API_BASE}/onboarding/jobseeker/${id}`, data);
};

export const updateCoach = (id: number, data: any) => {
  return axios.put(`${API_BASE}/onboarding/coach/${id}`, data);
};

export const getRecommendedCourses = (jobSeekerId: number) => {
  const response = axios.get(`${API_BASE}/skills/recommended-resources/${jobSeekerId}`);
  console.log("API Response:", response);
  return response;  
}

export const getRecommendedJobs = (jobSeekerId: number) => {
  return axios.get(`${API_BASE}/jobs/recommended-jobs/${jobSeekerId}`);
}