import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import "./tmpl_toast.css";


export function Tmpl_Toast() {
  return (
    <div className="body">
      <div className="toast">
        <FontAwesomeIcon icon={faTriangleExclamation} size="lg" className="warning-icon"/>
        <div className="message">
          <span className="text text-1">Error</span>
          <span className="text text-2">Check Input!!</span>
        </div>
      </div>
    </div>
  );
}
