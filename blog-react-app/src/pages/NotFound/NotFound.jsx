import { useNavigate, useRouteError } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="not-found">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="not-found__error">{error?.statusText || error?.message}</p>
      <div className="not-found__actions">
        <button onClick={() => navigate(-1)} className="not-found__button">
          Go Back
        </button>
        <button onClick={() => navigate("/")} className="not-found__button">
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
