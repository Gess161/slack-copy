const SignUpForm = ({ handleSubmit, handleChange, password, confirmPassword, email }) => {
    return (
        <form className="form">
            <div className="form-part">
                <label className="form-label" htmlFor="exampleInputEmail1">Email address</label>
                <input className="form-input" type="email"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="myname@work-email.com"
                    value={email}
                    onChange={handleChange}
                />
                <small id="emailHelp" className="form-small">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-part">
                <label className="form-label" htmlFor="exampleInputPassword1">Password</label>
                <input type="password"
                    className="form-input"
                    autoComplete="on"
                    id="password"
                    placeholder="mysecretpassword123"
                    value={password}
                    onChange={handleChange}
                />
                <small id="passwordHelp" className="form-small">Password must contain at least 6 characters</small>
            </div>
            <div className="form-part">
                <label className="form-label" htmlFor="exampleInputPassword1">Confirm Password</label>
                <input type="password"
                    className="form-input"
                    autoComplete="on"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={handleChange}
                />
            </div>
            <button
                type="button"
                className="form-button"
                onClick={handleSubmit}
            >
                Click Me!
            </button>
        </form>
    );
};

export default SignUpForm;