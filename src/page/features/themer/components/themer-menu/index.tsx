import styles from "./styles.module.css";
import React, { useState } from "react";
import { useThemerConfig } from "@page-contexts/themer-config";
import { BackgroundPickerFormControl } from "@page-components/form-controls/background-picker-form-control";
import { CheckboxFormControl } from "@page-components/form-controls/checkbox-form-control";
import { SliderFormControl } from "@page-components/form-controls/slider-form-control";
import { Flex } from "@page-components/basic/flex";
import { Button } from "@page-components/basic/button";
import { useThemerThemes } from "@page-contexts/themer-themes";
import { TextInput } from "@page-components/basic/text-input";
import { Icon } from "@page-components/basic/icon";

export function ThemerMenu() {
  const { config, setConfig } = useThemerConfig();
  const { editingThemeName, upsertTheme, setEditingThemeName } = useThemerThemes();

  const handleSave = () => {
    let name = editingThemeName;
    if (!name) {
      name = `My Theme ${Math.floor(Math.random() * 999999999999999)}`;
      setEditingThemeName(name);
    }
    upsertTheme({ name, config });
  };

  return (
    <div className={styles.container}>
      <BackgroundPickerFormControl label="Background" value={config.background} onChange={(background) => setConfig({ ...config, background })} />
      <CheckboxFormControl label="Blur Contacts" value={config.blurContacts} onChange={(blurContacts) => setConfig({ ...config, blurContacts })} />
      <CheckboxFormControl
        label="Rounded Borders"
        value={config.roundedBorders}
        onChange={(roundedBorders) => setConfig({ ...config, roundedBorders })}
      />
      <SliderFormControl
        label="Transparency"
        value={config.transparency * 100}
        onChange={(v) => setConfig({ ...config, transparency: Math.floor(v) / 100 })}
        max={100}
        min={0}
        step={1}
        valueFormatter={(value) => `${Math.floor(value)}%`}
        valueMinWidth={40}
      />
      <SliderFormControl
        label="Doodles Opacity"
        value={config.doodlesOpacity * 100}
        onChange={(v) => setConfig({ ...config, doodlesOpacity: Math.floor(v) / 100 })}
        max={100}
        min={0}
        step={1}
        valueFormatter={(value) => `${Math.floor(value)}%`}
        valueMinWidth={40}
      />
      <BackgroundPickerFormControl
        onlySolid
        label="UI Color"
        value={`rgb(${config.uiColor})`}
        onChange={(value) => setConfig({ ...config, uiColor: value.match(/\d+,\s*\d+,\s*\d+/)![0] })}
      />
      <BackgroundPickerFormControl
        onlySolid
        label="Outgoing Message Color"
        value={config.outgoingMessageBackground}
        onChange={(outgoingMessageBackground) => setConfig({ ...config, outgoingMessageBackground })}
      />
      <BackgroundPickerFormControl
        onlySolid
        label="Incoming Message Color"
        value={config.incomingMessageBackground}
        onChange={(incomingMessageBackground) => setConfig({ ...config, incomingMessageBackground })}
      />
      <BackgroundPickerFormControl
        onlySolid
        label="System Message Color"
        value={config.systemMessageBackground}
        onChange={(systemMessageBackground) => setConfig({ ...config, systemMessageBackground })}
      />
      <BackgroundPickerFormControl
        onlySolid
        label="Message Color"
        value={config.messageColor}
        onChange={(messageColor) => setConfig({ ...config, messageColor })}
      />
      <BackgroundPickerFormControl
        onlySolid
        label="Quoted Message Color"
        value={config.quotedMessageColor}
        onChange={(quotedMessageColor) => setConfig({ ...config, quotedMessageColor })}
      />
      <Flex gap={8}>
        <TextInput value={editingThemeName} onChange={setEditingThemeName} placeholder="Theme Name" />
        <Button fullWidth onClick={handleSave}>
          <Flex gap={8} align="center">
            <Icon type="save" size={16} />
            Save
          </Flex>
        </Button>
      </Flex>
    </div>
  );
}
