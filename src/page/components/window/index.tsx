import { Icon } from "@page-components/basic/icon";
import { useStateStorage } from "@page-hooks/use-state-storage";
import React, { ReactNode } from "react";
import Draggable from "react-draggable";
import styles from "./styles.module.css";

interface Props {
  name: string;
  icon?: ReactNode;
  title: string;
  children?: ReactNode;
  defaultPosition?: { x: number; y: number };
  getNextZIndex: () => number;
}

interface WindowConfig {
  position: { x: number; y: number };
  hidden: boolean;
  zIndex: number;
}

export const Window = ({ name, icon, title, children, defaultPosition = { x: 32, y: 32 }, getNextZIndex }: Props) => {
  const [config, setConfig] = useStateStorage<WindowConfig>(`window-${name}-config`, {
    position: defaultPosition,
    hidden: false,
    zIndex: 0,
  });

  return (
    <div style={{ position: "absolute", zIndex: config.zIndex }}>
      <Draggable position={config.position} onDrag={(_, data) => setConfig({ ...config, position: { x: data.x, y: data.y } })} handle="strong">
        <div className={styles.container}>
          <strong className={styles.header} onMouseDown={() => setConfig({ ...config, zIndex: getNextZIndex() })}>
            <div className={styles.iconTitle}>
              {icon}
              <div>{title}</div>
            </div>
            <Icon onClick={() => setConfig({ ...config, hidden: !config.hidden })} type={config.hidden ? "eye" : "eyeSlash"} size={16} />
          </strong>
          {!config.hidden && (
            <>
              {children}
              <div className={styles.footer}>
                <a target="_blank" href="https://github.com/vanflux/whatsapp-web-mod">
                  MOD BY VANFLUX ({VERSION})
                </a>
              </div>
            </>
          )}
        </div>
      </Draggable>
    </div>
  );
};
