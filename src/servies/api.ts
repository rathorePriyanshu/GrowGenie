import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type { CareerData, QuizAnswer, QuizQuestion, QuizResult } from "./types";
import { useAuthStore } from "../store/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const refreshApi = axios.create({
  baseURL: api.defaults.baseURL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: AxiosError) => void;
}[] = [];

const processQueue = (err: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (err) {
      prom.reject(err);
    } else {
      prom.resolve(token!);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          };
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await refreshApi.post("/auth/refresh");
        const newToken = res.data.accessToken;

        localStorage.setItem("accessToken", newToken);
        processQueue(null, newToken);
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);

        localStorage.removeItem("accessToken");
        useAuthStore.getState().clearAuth();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export const bootstrapAuth = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    useAuthStore.getState().setInitialized();
    return;
  }

  try {
    const res = await api.get("/auth/me");
    useAuthStore.getState().setAuth(res.data.user);
  } catch {
    localStorage.removeItem("accessToken");
    useAuthStore.getState().clearAuth();
  } finally {
    useAuthStore.getState().setInitialized();
  }
};

//fetch quizes
export const fetchQuizes = async (
  classLevel: "10" | "12",
): Promise<QuizQuestion[]> => {
  const res = await api.get("/quiz", {
    params: { classLevel },
  });

  return res.data;
};

//submit quiz answer
export const submitAnswers = async (
  answers: QuizAnswer[],
): Promise<QuizResult> => {
  const res = await api.post<QuizResult>("/quiz/submit", { answers });
  return res.data;
};

//fetch Careers
export const getCareers = async (
  stream?: "Science" | "Commerce" | "Arts" | null,
): Promise<CareerData[]> => {
  const res = await api.get("/careers", {
    params: stream ? { stream } : {},
  });
  return res.data;
};

//sending google token to backend for verification and getting JWT tokens
export const googleAuth = async (token: string) => {
  const res = await api.post("/auth/google", { token });

  return res.data;
};

export const checkAuth = async (email: string) => {
  const res = await api.post("/auth", { email });

  return res.data;
};

export const OTP = async (email: string) => {
  const res = await api.post("/otp", { email });

  return res.data;
};

export const OTPVerify = async (verificationId: string, code: string) => {
  const res = await api.post("/otp/verify", { verificationId, code });

  return res.data;
};

export const Signup = async (
  username: string,
  email: string,
  password: string,
) => {
  const res = await api.post("/auth/signup", { username, email, password });

  return res.data;
};

export const Login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });

  return res.data;
};

export const Logout = async () => {
  const res = await api.post("/auth/logout");

  return res.data;
};

export const forgetPassword = async (email: string) => {
  const res = await api.post("/auth/forgot-password", { email });

  return res.data;
};

export const ResetPassword = async (token: string, password: string) => {
  const res = await api.post("/auth/reset-password", { token, password });

  return res.data;
};

export const getRoadmap = async (
  career_id: string,
  career_name: string,
  career_source: string,
) => {
  const res = await api.post("/roadmap", {
    career_id,
    career_name,
    career_source,
  });

  return res.data;
};

export const saveRoadmap = async (roadmap_id: string) => {
  const res = await api.post("/roadmaps/save", { roadmap_id });

  return res.data;
};

export const getSavedRoadmaps = async () => {
  const res = await api.get("/roadmaps");

  return res.data;
};

export const getProfileRoadmap = async (roadmap_id: string) => {
  const res = await api.get(`/roadmap/${roadmap_id}`);

  return res.data;
};

export const deleteRoadmap = async (roadmap_id: string) => {
  const res = await api.delete(`/roadmap/save/${roadmap_id}`);

  return res.data;
};
