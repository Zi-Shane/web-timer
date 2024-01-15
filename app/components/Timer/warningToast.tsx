import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useCallback } from 'react';
import styles from './toast-styles.module.css';

export type ToastContent = {
  id: string;
  message: string;
};

export function WarningToast({
  toastList,
  setToastList,
}: {
  toastList: ToastContent[];
  setToastList: React.Dispatch<React.SetStateAction<ToastContent[]>>;
}) {
  const deleteToast = useCallback(
    (id: string) => {
      let newList = toastList.filter(e => e.id != id);
      setToastList(newList);
    },
    [setToastList, toastList],
  );

  useEffect(() => {
    const interval = setTimeout(() => {
      if (toastList.length > 0) {
        deleteToast(toastList[0].id);
      }
    }, 3000);

    return () => {
      console.log('clear');
      clearInterval(interval);
    };
  }, [deleteToast, toastList]);

  return (
    <ul className={styles['toasts-list']}>
      {toastList.map(content => {
        return (
          <li key={content.id} className={styles['toast']}>
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              size="sm"
              className={styles['warning-icon']}
            />
            <span className={`${styles['text']} ${styles['text-1']}`}>
              {content.message}
            </span>
            <FontAwesomeIcon
              icon={faXmark}
              size="sm"
              onClick={() => deleteToast(content.id)}
              className={styles['close-icon']}
            />
          </li>
        );
      })}
    </ul>
  );
}
