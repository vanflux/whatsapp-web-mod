import { Icon } from '@page-components/basic/icon';
import { useConfigsToggle } from '@page-features/configs-toggle/use-configs-toggle';
import React from 'react';

export const ConfigsToggleButton = () => {
  const { toggle } = useConfigsToggle();

  return (
    <div className="flex flex-col justify-center items-center w-10 h-10 mt-4 cursor-pointer" onClick={toggle}>
      <Icon type="logo" size={32} />
    </div>
  );
};
