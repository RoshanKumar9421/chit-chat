
// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";
// import axios from "axios";

// const BASE_URL =
//   import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

// export const useAuthStore = create((set, get) => ({
//   authUser: null,
//   isSigningUp: false,
//   isLoggingIn: false,
//   isUpdatingProfile: false,
//   isCheckingAuth: true,
//   onlineUsers: [],
//   socket: null,

//   checkAuth: async () => {
//     try {
//       const res = await axiosInstance.get("/auth/check");
//       set({ authUser: res.data });
//       get().connectSocket();
//     } catch (error) {
//       set({ authUser: null });
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//   signup: async (data) => {
//     set({ isSigningUp: true });
//     try {
//       const res = await axiosInstance.post("/auth/signup", data);
//       set({ authUser: res.data });
//       toast.success("Account created successfully");
//       get().connectSocket();
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Signup failed");
//     } finally {
//       set({ isSigningUp: false });
//     }
//   },

//   login: async (data) => {
//     set({ isLoggingIn: true });
//     try {
//       const res = await axiosInstance.post("/auth/login", data);
//       set({ authUser: res.data });
//       toast.success("Logged in successfully");
//       get().connectSocket();
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Login failed");
//     } finally {
//       set({ isLoggingIn: false });
//     }
//   },

//   logout: async () => {
//     try {
//       await axiosInstance.post("/auth/logout");
//       set({ authUser: null });
//       toast.success("Logged out successfully");
//       get().disconnectSocket();
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Logout failed");
//     }
//   },

  

//   updateProfile: async (formData) => {
//   set({ isUpdatingProfile: true });

//   try {
//     const res = await axios.put(
//       "http://localhost:5001/api/user/update-profile",
//       formData,
//       {
//         withCredentials: true,
//       }
//     );

//     set({ authUser: res.data });
//   } catch (err) {
//     console.error("Update profile error:", err.response?.data || err.message);
//   } finally {
//     set({ isUpdatingProfile: false });
//   }
// },




//   connectSocket: () => {
//     const { authUser, socket } = get();
//     if (!authUser || socket?.connected) return;

//     const newSocket = io(BASE_URL, {
//       query: { userId: authUser._id },
//     });

//     set({ socket: newSocket });

//     newSocket.on("getOnlineUsers", (userIds) => {
//       set({ onlineUsers: userIds });
//     });
//   },

//   disconnectSocket: () => {
//     const socket = get().socket;
//     if (socket?.connected) socket.disconnect();
//   },
// }));


import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // ================= CHECK AUTH =================
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ================= SIGNUP =================
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // ================= LOGIN =================
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // ================= LOGOUT =================
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

  // ================= UPDATE PROFILE PIC =================
  updateProfile: async (formData) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put(
        "/auth/update-profile",
        formData
      );

      set({ authUser: res.data });
      toast.success("Profile updated");
    } catch (error) {
      console.error(
        "Update profile error:",
        error.response?.data || error.message
      );
      toast.error("Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // ================= SOCKET =================
  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      query: { userId: authUser._id },
    });

    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) socket.disconnect();
  },
}));
