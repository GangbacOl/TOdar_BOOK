import React from "react";
import { useRecoilValue } from "recoil";

import { usernameState, isLoginState } from "../atoms";
import Info from "../components/info/Info";

const InfoPage = () => {
    const username = useRecoilValue(usernameState);
    const isLogin = useRecoilValue(isLoginState);

    return (
        <div className="InfoPage">
            <Info username={username} isLogin={isLogin} />
        </div>
    );
};

export default InfoPage;
