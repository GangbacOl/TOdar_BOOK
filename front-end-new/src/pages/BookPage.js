import React from "react";
import { useRecoilValue } from "recoil";

import { usernameState, isLoginState } from "../atoms";
import BookList from "../components/book/BookList";

const BookPage = () => {
    const username = useRecoilValue(usernameState);
    const isLogin = useRecoilValue(isLoginState);

    return (
        <div className="BookPage">
            <BookList username={username} isLogin={isLogin} />
        </div>
    );
};

export default BookPage;
