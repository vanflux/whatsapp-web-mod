import { Button } from "@page-components/basic/button";
import { Flex } from "@page-components/basic/flex";
import { Modal } from "@page-components/basic/modal";
import { Text } from "@page-components/basic/text";
import { TextInput } from "@page-components/basic/text-input";
import { useThemerConfig } from "@page-contexts/themer-config";
import { useThemerThemes } from "@page-contexts/themer-themes";
import { deserializeThemerTheme } from "@page-features/themer/theme";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onRequestClose?: () => void;
  onImport?: () => void;
}

export const ImportModal = ({ open, onRequestClose, onImport }: Props) => {
  const [value, setValue] = useState<string>();
  const { setConfig } = useThemerConfig();
  const { upsertTheme, setEditingThemeName } = useThemerThemes();

  useEffect(() => {
    if (!open) setValue(undefined);
  }, [open]);

  const handleImport = (apply: boolean) => {
    try {
      if (!value) return toast.error("Empty theme value");
      const theme = deserializeThemerTheme(value);
      if (!theme) return toast.error("Invalid theme data!");
      upsertTheme(theme);
      setEditingThemeName(theme.name);
      if (apply) {
        setConfig(theme.config);
        toast.success(`Theme "${theme.name}" imported and applyed!`);
      } else {
        setConfig(theme.config);
        toast.success(`Theme "${theme.name}" imported!`);
      }
      onImport?.();
      onRequestClose?.();
    } catch (exc) {
      console.error("Theme import failed:", exc);
      toast.error(`Theme import failed! Message: ${(exc as Error)?.message}`);
    }
  };

  return (
    <Modal open={open} onRequestClose={onRequestClose}>
      <Flex direction="column" gap={8}>
        <Text>Import External Theme</Text>
        <TextInput placeholder="Data here..." value={value} fullWidth onChange={setValue} />
        <Flex gap={8}>
          <Button onClick={() => handleImport(false)} fullWidth>
            Import
          </Button>
          <Button onClick={() => handleImport(true)} fullWidth>
            Import and Apply
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
