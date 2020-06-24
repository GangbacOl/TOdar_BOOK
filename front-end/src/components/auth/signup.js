import React, { useState } from "react";
import "./style.scss";
import Axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (username, id, password) => {
    Axios.post("http://localhost:5000/auth/signup", {
      username,
      id,
      password,
    })
      .then((response) => {
        window.location.href = response.data.redirectUrl;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signup-wrapper">
      <div className="signup">
        <h1>TODAR BOOK</h1>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요."
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="계정을 입력해주세요."
          name="account"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="button"
          className="submit"
          value="submit"
          onClick={() => {
            signUp(username, email, password);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) signUp(username, email, password);
          }}
        />
        <a href="/signin">로그인하러 가기</a>
        <a href="/">메인메뉴로 돌아가기</a>
      </div>
    </div>
  );
}

export default SignUp;
