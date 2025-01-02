import React, { useState } from 'react';
import { useThemerConfig } from '@page-features/themer/hooks/use-themer-config';
import { Button } from '@page-components/basic/button';
import { DEFAULT_THEMES, serializeThemerTheme, Theme } from '@page-features/themer/theme';
import { useThemerThemes } from '@page-features/themer/hooks/use-themer-themes';
import { Text } from '@page-components/basic/text';
import { ImportModal } from '../import-modal';
import { Icon } from '@page-components/basic/icon';
import { toast } from 'react-toastify';

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
      console.error('Theme export failed:', exc);
      toast.error(`Theme export failed for "${theme.name}"! Message: ${(exc as Error)?.message}`);
    }
  };

  const renderThemeList = (_tab: number, themes: Theme[]) =>
    tab === _tab ? (
      <>
        <Text>Count: {themes.length}</Text>
        <div className="flex flex-col gap-1 overflow-auto">
          {themes.map((theme) => (
            <div key={theme.name} className="flex gap-1 bg-black/30 p-1 rounded overflow-hidden">
              <Button
                className="max-w-8"
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
                  <Button className="max-w-8" onClick={() => handleExport(theme)} fullWidth>
                    <Icon type="export" size={16} />
                  </Button>
                  <Button className="max-w-8" onClick={() => removeTheme(theme.name)} fullWidth>
                    <Icon type="delete" size={16} color="#aa3333" />
                  </Button>
                </>
              )}
              <div className="flex items-center flex-1 overflow-hidden text-ellipsis">{theme.name}</div>
            </div>
          ))}
        </div>
      </>
    ) : null;

  return (
    <div className="flex flex-col gap-2 p-2 min-w-[260px] min-h-[260px] h-[300px] bg-black/40 overflow-auto">
      <ImportModal open={importModalOpen} onRequestClose={() => setImportModalOpen(false)} onImport={() => setTab(1)} />
      <div className="flex gap-2">
        <Button fullWidth onClick={() => setTab(0)}>
          <div className="flex gap-2 items-center">
            <Icon type="paintRoller" size={16} />
            Predefined
          </div>
        </Button>
        <Button fullWidth onClick={() => setTab(1)}>
          <div className="flex gap-2 items-center">
            <Icon type="save" size={16} />
            Saved
          </div>
        </Button>
        <Button fullWidth onClick={() => setImportModalOpen(true)}>
          <div className="flex gap-2 items-center">
            <Icon type="import" size={16} />
            Import
          </div>
        </Button>
      </div>
      {renderThemeList(0, DEFAULT_THEMES)}
      {renderThemeList(1, themes)}
    </div>
  );
}
