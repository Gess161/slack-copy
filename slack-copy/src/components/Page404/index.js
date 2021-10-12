import { withRouter } from "react-router";
import notFound from "../../stylesheets/logo/404.png"

function NotFound(props) {
    const handleClick = () => {
        props.history.push('/')
    }
    return (
        <div className="not-found">
            <img alt="404"src={notFound}/>
            <h2>Page not found</h2>
            <button onClick={handleClick} className="buttons-return">Return to Home</button>
        </div>
    );
};

export default withRouter(NotFound)