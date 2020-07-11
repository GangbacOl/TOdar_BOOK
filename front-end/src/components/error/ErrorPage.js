import React from "react";

const ErrorPage = ({ statusText, errorMessage, redirectUrl, redirectMessage }) => {
    return (
        <div className="ErrorPage">
            <h2>{statusText}</h2>
            <p>{errorMessage}</p>
            <a href={redirectUrl}>{redirectMessage}</a>
        </div>
    );
};

export default ErrorPage;
