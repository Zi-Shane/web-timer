import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import "./tmpl_notification.css";


export function Notification() {
  return (
    <div className="body">
      <div className="toast">
        <FontAwesomeIcon icon={faTriangleExclamation} size="lg" className="warning-icon"/>
        <div className="message">
          <span className="text text-1">Error</span>
          <span className="text text-2">Check Input!!</span>
        </div>
      </div>

      <button className="trigger">Show Toast</button>
    </div>
  );
}
