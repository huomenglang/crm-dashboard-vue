import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { message } from "ant-design-vue/es/components";


const adminUser:UserAuth={
  name: "Admin User",
  username: "admin",
  id: "1",
  authorities: ["ROLE_ADMIN", "ROLE_USER"],
  warehouse: {
    id: "1",
    name: "Main Warehouse",
  },
};

export interface UserAuth {
  name: string | null;
  username: string;
  id: string;
  authorities: string[];
  warehouse?: {
    id: string;
    name: string;
  } | null;
}

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const user = ref<UserAuth | null>(null);
  const token = ref<string | null>(null);
  const loading = ref<boolean>(false);

  // Set auth token to axios headers
  const setTokenHeader = (token: string | null) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  //login
  const login = async (username: string, password: string) => {
    loading.value = true;
    console.log(`Logging in user: ${username} and password: ${password}`);
    try {
      // const response = await axios.post("/api/auth/login", {
      //   username,
      //   password,
      // });
      // user.value = response.data.user;
      // token.value = response.data.token;
      // setTokenHeader(token.value);

      message.success("Login successful");
      router.push("/dashboard");
      // return user.value;
      return adminUser
    } catch (error: any) {
      console.error("Login failed:", error);
      message.error(error.response?.data?.message || "Login failed");
    } finally {
      loading.value = false;
    }
  };

  //logout
  // Logout
  const logout = () => {
    user.value = null;
    token.value = null;
    setTokenHeader(null);
    router.push("/login");
  };

  // Check if logged in
  const isLogin = computed(() => !!token.value && !!user.value);

  // Role/authority check
  const isAuthorized = (roles?: string | string[]) => {
    if(roles === undefined || roles === null) return true;
    return true;
  };

  //verify user from rest api
  const verifyUser = async () => {
    // if(!token.value){
    //     return false;
    // }
    try {
      //   setTokenHeader(token.value)
      //   const res = await axios.get('/api/auth/me')
      //   user.value = res.data
      if (router.currentRoute.value.path === "/login") router.push("/");
    } catch {
      logout();
      if (router.currentRoute.value.path !== "/login") router.push("/login");
    }
  };

  return {
    user,
    token,
    loading,
    login,
    logout,
    isLogin,
    isAuthorized,
    verifyUser,
  };
});
