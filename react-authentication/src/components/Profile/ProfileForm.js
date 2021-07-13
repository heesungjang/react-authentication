import { useRef, useContext } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
    const newPasswordInputRef = useRef();
    const authCtx = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredNewPassword = newPasswordInputRef.current.value;

        //add validation optional
        const url =
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCw7aBklS2_mrfiipoLcOxOqvA0BUlz5ls";

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                idToken: authCtx.token,
                password: enteredNewPassword,
                returnSecureToken: false,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {});
    };
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input
                    type="password"
                    id="new-password"
                    ref={newPasswordInputRef}
                    minLength="7"
                />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;
