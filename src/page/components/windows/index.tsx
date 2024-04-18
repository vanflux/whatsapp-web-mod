import { Icon } from "@page-components/basic/icon";
import { Window } from "@page-components/window";
import { useConfigsToggle } from "@page-features/configs-toggle/use-configs-toggle";
import { CryptographyMenu } from "@page-features/cryptography/components/cryptography-menu";
import { ThemerMenu } from "@page-features/themer/components/themer-menu";
import { ThemesMenu } from "@page-features/themer/components/themes-menu";
import { useStateStorage } from "@page-hooks/use-state-storage";
import React from "react";

export const Windows = () => {
  const [nextZIndex, setNextZIndex] = useStateStorage("windows-next-zindex", 0);
  const { open } = useConfigsToggle();

  const getNextZIndex = () => {
    setNextZIndex(nextZIndex + 1);
    return nextZIndex;
  };

  return (
    <>
      {open && (
        <>
          <Window
            name="cryptography"
            icon={<Icon type="lock" size={16} />}
            defaultPosition={{ x: 112, y: 112 }}
            title="Cryptography"
            getNextZIndex={getNextZIndex}
          >
            <CryptographyMenu />
          </Window>
          <Window
            name="themes"
            icon={<Icon type="paint" size={16} />}
            defaultPosition={{ x: 80, y: 80 }}
            title="Themes"
            getNextZIndex={getNextZIndex}
          >
            <ThemesMenu />
          </Window>
          <Window
            name="configs"
            icon={<Icon type="config" size={16} />}
            defaultPosition={{ x: 48, y: 48 }}
            title="Configs"
            getNextZIndex={getNextZIndex}
          >
            <ThemerMenu />
          </Window>
        </>
      )}
    </>
  );
};
