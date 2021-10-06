const LoginForm = ({handleChange, handleSubmit, email, password}) => {
    return (
        <form className="form">
            <div className="form-part">
                <label className="form-label" htmlFor="exampleInputEmail1">Enter your email</label>
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
                <label className="form-label" htmlFor="exampleInputPassword1">Enter your password</label>
                <input className="form-input" type="password"
                    id="password"
                    placeholder="mypassword"
                    value={password}
                    onChange={handleChange}
                />
                <small id="passwordHelp" className="form-small">Password must contain at least 6 characters</small>
            </div>
            <button
                type="button"
                className="form-button"
                onClick={handleSubmit}
            >
                Click Me!
            </button>
        </form>
    )
}
export default LoginForm