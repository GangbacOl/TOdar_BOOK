import { atom } from "recoil";

export const usernameState = atom({
    key: "username",
    default: "",
});

export const isLoginState = atom({
    key: "isLogin",
    default: false,
});
