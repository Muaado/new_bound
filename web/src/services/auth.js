import Cookies from "js-cookie";
export const isBrowser = () => typeof window !== "undefined";
export const getUser = () =>
  isBrowser() && Cookies.get("gatsbyUser")
    ? JSON.parse(Cookies.get("gatsbyUser"))
    : {};

const setUser = (user) =>
  Cookies.set("gatsbyUser", JSON.stringify(user), {
    expires: 5,
  });

export const handleLogin = ({ email, password }) => {
  if (email === "test@test.com" && password === "test123") {
    return setUser({
      username: "test-user",
      name: "Test User",
      email: "test@test.com",
    });
  }
  return false;
};

export const isLoggedIn = () => {
  const user = getUser();
  return !!user.username;
};

export const logout = (callback) => {
  setUser({});
  callback();
};
