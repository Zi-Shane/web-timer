import {
  ReactNode,
  Ref,
  RefObject,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Toast } from 'components';
import styles from './styles.module.css';

type ToastContent = {
  id: string;
  message: string;
};

export type ToastPortalAPI = {
  addToast: (message: string) => void;
};

export const ToastPortal = ({
  toastPortalRef,
}: {
  toastPortalRef: RefObject<ToastPortalAPI>;
}) => {
  const [portalId] = useState('toast-portal-' + crypto.randomUUID());
  const [loaded, setLoaded] = useState(false);
  const [toasts, setToasts] = useState<ToastContent[]>([]);
  const [removing, setRemoving] = useState('');

  useImperativeHandle(toastPortalRef, () => ({
    addToast(message) {
      setToasts([...toasts, { id: crypto.randomUUID(), message }]);
    },
  }));

  useEffect(() => {
    setToasts(t => t.filter(_t => _t.id != removing));
  }, [removing]);

  // store last toast id to heap
  useEffect(() => {
    if (toasts.length) {
      setTimeout(() => {
        const id = toasts[toasts.length - 1].id;
        setRemoving(id);
      }, 3000);
    }
  }, [toasts]);

  useEffect(() => {
    const div = document.createElement('div');
    div.className = styles.toastsContainer;
    div.id = portalId;
    document.body.prepend(div);
    setLoaded(true);

    return () => {
      document.body.removeChild(div);
    };
  }, [portalId]);

  // function addToast(message: string) {
  //   setToasts([...toasts, { id: crypto.randomUUID(), message }]);
  // }

  function removeToast(id: string) {
    setToasts(toasts.filter(e => e.id != id));
  }

  return loaded ? (
    createPortal(
      <div>
        {toasts.map(t => (
          <Toast
            key={t.id}
            message={t.message}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </div>,
      document.getElementById(portalId)!,
    )
  ) : (
    <></>
  );
};
