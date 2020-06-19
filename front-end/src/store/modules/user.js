// 1. 액션 타입 정의
const SET_USERNAME = "auth/SET_USERNAME";
const LOGOUT = "auth/LOGOUT";

// 2. 액션 생성함수 정의
export const setUsername = (username) => ({
  type: SET_USERNAME,
  username,
});
export const initializeState = () => ({
  type: LOGOUT,
  username: "",
});

// 3. 초기상태 정의
const initialState = {
  username: "",
};

// 4. 리듀서 작성
export default function setUserCfg(state = initialState, actions) {
  switch (actions.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: actions.username,
      };
    case LOGOUT:
      return {
        username: initialState,
      };
    default:
      return state;
  }
}
