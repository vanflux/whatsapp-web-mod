import { Icon } from "@page-components/basic/icon";
import { Window } from "@page-components/window";
import { useConfigsOpen } from "@page-contexts/configs-open";
import { ThemerMenu } from "@page-features/themer/components/themer-menu";
import { ThemesMenu } from "@page-features/themer/components/themes-menu";
import React from "react";

export const Windows = () => {
  const { open } = useConfigsOpen();

  return (
    <>
      {open && (
        <>
          <Window name="configs" icon={<Icon type="config" size={16} />} title="Configs">
            <ThemerMenu />
          </Window>
          <Window name="themes" icon={<Icon type="paint" size={16} />} title="Themes">
            <ThemesMenu />
          </Window>
        </>
      )}
    </>
  );
};
