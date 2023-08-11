import styles from "./styles.module.css";
import React, { useState } from "react";
import { useThemerConfig } from "@page-contexts/themer-config";
import { Flex } from "@page-components/basic/flex";
import { Button } from "@page-components/basic/button";
import { DEFAULT_THEMES, serializeThemerTheme, Theme } from "@page-features/themer/theme";
import { useThemerThemes } from "@page-contexts/themer-themes";
import { Text } from "@page-components/basic/text";
import { ImportModal } from "../import-modal";
import { Icon } from "@page-components/basic/icon";
import { toast } from "react-toastify";

export function ThemesMenu() {
  const [tab, setTab] = useState(0);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const { themes, removeTheme, setEditingThemeName } = useThemerThemes();
  const { setConfig } = useThemerConfig();

  const handleExport = async (theme: Theme) => {
    try {
      const text = serializeThemerTheme(theme);
      await navigator.clipboard.writeText(text);
      toast.success(`Theme "${theme.name}"(${text.length} bytes) exported to clipboard!`);
    } catch (exc) {
      console.error("Theme export failed:", exc);
      toast.error(`Theme export failed for "${theme.name}"! Message: ${(exc as Error)?.message}`);
    }
  };

  const renderThemeList = (_tab: number, themes: Theme[]) =>
    tab === _tab ? (
      <>
        <Text>Count: {themes.length}</Text>
        <Flex className={styles.list} direction="column" gap={8}>
          {themes.map((theme) => (
            <Flex gap={4} key={theme.name} className={styles.item}>
              <Button
                className={styles.button}
                onClick={() => {
                  setConfig(theme.config);
                  setEditingThemeName(tab > 0 ? theme.name : undefined);
                  toast.success(`Theme "${theme.name}" applyed!`);
                }}
                fullWidth
              >
                <Icon type="confirm" size={16} color="#33aa33" />
              </Button>
              {tab > 0 && (
                <>
                  <Button className={styles.button} onClick={() => handleExport(theme)} fullWidth>
                    <Icon type="export" size={16} />
                  </Button>
                  <Button className={styles.button} onClick={() => removeTheme(theme.name)} fullWidth>
                    <Icon type="delete" size={16} color="#aa3333" />
                  </Button>
                </>
              )}
              <Flex className={styles.name} align="center" flex={1}>
                {theme.name}
              </Flex>
            </Flex>
          ))}
        </Flex>
      </>
    ) : null;

  return (
    <Flex direction="column" gap={8} className={styles.container}>
      <ImportModal open={importModalOpen} onRequestClose={() => setImportModalOpen(false)} onImport={() => setTab(1)} />
      <Flex gap={8}>
        <Button fullWidth onClick={() => setTab(0)}>
          <Flex gap={8} align="center">
            <Icon type="paintRoller" size={16} />
            System
          </Flex>
        </Button>
        <Button fullWidth onClick={() => setTab(1)}>
          <Flex gap={8} align="center">
            <Icon type="save" size={16} />
            Saved
          </Flex>
        </Button>
        <Button fullWidth onClick={() => setImportModalOpen(true)}>
          <Flex gap={8} align="center">
            <Icon type="import" size={16} />
            Import
          </Flex>
        </Button>
      </Flex>
      {renderThemeList(0, DEFAULT_THEMES)}
      {renderThemeList(1, themes)}
    </Flex>
  );
}
