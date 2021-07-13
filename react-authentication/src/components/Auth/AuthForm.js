import { useState, useRef, useContext } from "react";

import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authCtx = useContext(AuthContext);

    console.log(authCtx);

    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        // optional: Add validation
        setIsLoading(true);
        let url;

        if (isLogin) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCw7aBklS2_mrfiipoLcOxOqvA0BUlz5ls";
        } else {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCw7aBklS2_mrfiipoLcOxOqvA0BUlz5ls";
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = "Authentication failed!";
                        // if (data && data.error && data.error.message) {
                        //     errorMessage = data.error.message;
                        // }

                        throw new Error(errorMessage);
                    });
                }
            })
            .then((data) => {
                authCtx.login(data.idToken);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        ref={emailInputRef}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>{isLogin ? "Login" : "Create Account"}</button>
                    )}
                    {isLoading && <p>Sending request...</p>}
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? "Create new account"
                            : "Login with existing account"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
