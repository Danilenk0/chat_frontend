import { create } from "zustand";
import axios, { AxiosError } from "axios";
import UseMessageStore from "./MessageStore";

interface User {
  email: string;
  fullName: string;
  password: string;
  profilePic: string;
}
interface AuthState {
  isLoading: boolean;
  user: User | null;
  isLoggedIn: boolean;
  signin: (data: SignInState) => Promise<void>;
  signup: (data: SignUpState) => Promise<void>;
  checkAuth: () => Promise<void>;
}
interface SignInState {
  email: string;
  password: string;
}
interface SignUpState {
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const UseAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  user: null,
  isLoggedIn: false,
  signin: async (data: SignInState) => {
    set({
      isLoading: true,
    });
    try {
      await axios.post("http://localhost:5001/api/auth/signin", data, {
        withCredentials: true,
      });
      set({
        isLoading: false,
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      if (err.response?.data?.message) {
        UseMessageStore.getState().setMessage(
          "error",
          err.response.data.message || "Unknown error"
        );
      } else {
        UseMessageStore.getState().setMessage(
          "error",
          err.message || "Unknown error"
        );
      }

      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
  signup: async (data: SignUpState) => {
    set({ isLoading: true });
    try {
      await axios.post("http://localhost:5001/api/auth/signup", data, {
        withCredentials: true,
      });
      set({
        isLoading: false,
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err?.response?.data?.message) {
        UseMessageStore.getState().setMessage(
          "error",
          err.response.data.message || "Unknown error"
        );
      } else {
        UseMessageStore.getState().setMessage(
          "error",
          err.message || "Unknown error"
        );
      }
    } finally {
      set({
        isLoading: false,
      });
    }
  },
  checkAuth: async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/auth/check",{
        withCredentials:true
      });

      set({ isLoggedIn: true, user: response.data });
      console.log(response.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err?.response?.data?.message) {
        UseMessageStore.getState().setMessage(
          "error",
          err.response.data.message || "Unknown error"
        );
      } else {
        UseMessageStore.getState().setMessage(
          "error",
          err.message || "Unknown error"
        );
      }
    }
  },
}));

export default UseAuthStore;
