import styles from "./styles.module.css";
import React, { useState } from "react";
import { useThemer } from "../../contexts/themer";
import { BackgroundPickerFormControl } from "../form-controls/background-picker-form-control";
import { SliderFormControl } from "../form-controls/slider-form-control";
import { CheckboxFormControl } from "../form-controls/checkbox-form-control";
import { ColorPickerFormControl } from "../form-controls/color-picker-form-control";
import { Button } from "../basic/button";
import { Flex } from "../basic/flex";
import { ImportModal } from "../import-modal";
import { ResetModal } from "../reset-modal";

export function ConfigsMenu() {
  const { config, setConfig } = useThemer();
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleExport = async () => {
    navigator.clipboard.writeText(btoa(JSON.stringify(config)));
  };

  const handleImport = async () => {
    setImportModalOpen(!importModalOpen);
  };

  const handleReset = async () => {
    setResetModalOpen(!resetModalOpen);
  };

  return (
    <div className={styles.container}>
      <BackgroundPickerFormControl
        label='Background'
        value={config.background}
        onChange={background => setConfig({ ...config, background })}
      />
      <CheckboxFormControl
        label='Blur Contacts'
        value={config.blurContacts}
        onChange={blurContacts => setConfig({ ...config, blurContacts })}
      />
      <CheckboxFormControl
        label='Rounded Borders'
        value={config.roundedBorders}
        onChange={roundedBorders => setConfig({ ...config, roundedBorders })}
      />
      <SliderFormControl
        label="Transparency"
        value={config.transparency * 100}
        onChange={v => setConfig({ ...config, transparency: Math.floor(v) / 100 })}
        max={100}
        min={0}
        step={1}
        valueFormatter={value => `${Math.floor(value)}%`}
        valueMinWidth={40}
      />
      <ColorPickerFormControl
        label='UI Color'
        value={`rgb(${config.uiColor})`}
        onChange={({ rgb: { r, g, b } }) => setConfig({ ...config, uiColor: `${r}, ${g}, ${b}` })}
      />
      <ColorPickerFormControl
        label='Outgoing Message Color'
        value={config.outgoingMessageBackground}
        onChange={({ hex }) => setConfig({ ...config, outgoingMessageBackground: hex })}
      />
      <ColorPickerFormControl
        label='Incoming Message Color'
        value={config.incomingMessageBackground}
        onChange={({ hex }) => setConfig({ ...config, incomingMessageBackground: hex })}
      />
      <ColorPickerFormControl
        label='System Message Color'
        value={config.systemMessageBackground}
        onChange={({ hex }) => setConfig({ ...config, systemMessageBackground: hex })}
      />
      <ColorPickerFormControl
        label='Message Color'
        value={config.messageColor}
        onChange={({ hex }) => setConfig({ ...config, messageColor: hex })}
      />
      <ColorPickerFormControl
        label='Quoted Message Color'
        value={config.quotedMessageColor}
        onChange={({ hex }) => setConfig({ ...config, quotedMessageColor: hex })}
      />
      <Flex gap={8}>
        <Button fullWidth onClick={handleExport}>Export</Button>
        <Button fullWidth onClick={handleImport}>Import</Button>
        <Button fullWidth onClick={handleReset}>Reset</Button>
        <ImportModal open={importModalOpen} onRequestClose={() => setImportModalOpen(false)} />
        <ResetModal open={resetModalOpen} onRequestClose={() => setResetModalOpen(false)} />
      </Flex>
    </div>
  );
}
