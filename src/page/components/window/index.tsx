import React, { ReactNode } from "react";
import Draggable from "react-draggable";
import { useStateStorage } from "../../hooks/use-state-storage";
import styles from "./styles.module.css";

interface Props {
  name: string;
  icon?: ReactNode;
  title: string;
  children?: ReactNode;
}

export const Window = ({ name, icon, title, children }: Props) => {
  const [position, setPosition] = useStateStorage(`window-${name}-position`, {
    x: 32,
    y: 32,
  });

  return (
    <Draggable position={position} onDrag={(_, data) => setPosition({ x: data.x, y: data.y })} handle="strong">
      <div className={styles.container}>
        <strong className={styles.header}>
          {icon}
          <div>{title}</div>
        </strong>
        {children}
        <div className={styles.footer}>
          <a target="_blank" href='https://github.com/vanflux/whatsapp-web-mod'>MOD BY VANFLUX ({VERSION})</a>
        </div>
      </div>
    </Draggable>
  );
};
