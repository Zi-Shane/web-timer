import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

export function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className={styles.toast}>
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        size="sm"
        className={styles.warningIcon}
      />
      <span className={styles.text}>{message}</span>
      <FontAwesomeIcon
        icon={faXmark}
        size="sm"
        onClick={onClose}
        className={styles.closeIcon}
      />
    </div>
  );
}
