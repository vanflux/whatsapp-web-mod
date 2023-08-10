import React from "react";
import { useConfigsOpen } from "../../contexts/configs-open";
import { ConfigIcon } from "../icons/config-icon";
import { ConfigsMenu } from "../configs-menu";
import { Window } from "../window";

export const Windows = () => {
  const { open } = useConfigsOpen();

  return (
    <>
      {open && (
        <Window name="configs" icon={<ConfigIcon size={16} />} title="Configs">
          <ConfigsMenu />
        </Window>
      )}
    </>
  );
};
