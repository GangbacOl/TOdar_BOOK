// 1. 액션 타입 정의
const SET_USERNAME = "auth/SET_USERNAME";
const SET_ISLOGIN = "auth/SET_ISLOGIN";
const LOGOUT = "auth/LOGOUT";

// 2. 액션 생성함수 정의
export const setUsername = (username) => ({
    type: SET_USERNAME,
    username,
});
export const setIsLogin = (isLogin) => ({
    type: SET_ISLOGIN,
    isLogin: isLogin,
});
export const initializeState = () => ({
    type: LOGOUT,
    username: "",
    isLogin: false,
});

// 3. 초기상태 정의
const initialState = {
    username: "",
    isLogin: false,
};

// 4. 리듀서 작성
export default function setUserCfg(state = initialState, actions) {
    switch (actions.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: actions.username,
            };
        case SET_ISLOGIN:
            return {
                ...state,
                isLogin: actions.isLogin,
            };
        case LOGOUT:
            return {
                username: initialState,
            };
        default:
            return state;
    }
}
