import styles from './ovarlay.module.css';
import { type ReactNode, useState, useEffect } from 'react'

type OverlayProps = {
  onClick: () => void;
  children?: ReactNode;
}

export default function Overlay({ onClick, children }: OverlayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });
  }, []);

  const handleClick = () => {
    setVisible(false);
    setTimeout(() => {
      onClick();
    }, 500);
  };

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.visible : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
