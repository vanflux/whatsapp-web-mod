import { Button } from "@page-components/basic/button";
import styles from "./styles.module.css";
import React, { KeyboardEvent, useMemo, useRef, useState } from "react";
import { Flex } from "@page-components/basic/flex";
import { Icon } from "@page-components/basic/icon";
import { TextInput } from "@page-components/basic/text-input";
import { CryptographyMod } from "@page-features/cryptography/cryptography.mod";
import { WapiMod } from "@page-features/wapi/wapi.mod";
import { useCryptographyConfig } from "@page-features/cryptography/hooks/use-cryptography-config";
import { CheckboxFormControl } from "@page-components/form-controls/checkbox-form-control";
import { useActiveChatID } from "@page-features/wapi/hooks/use-active-chat-id";

export function CryptographyMenu() {
  const ref = useRef<HTMLInputElement>(null);
  const { config, setConfig } = useCryptographyConfig();
  const [message, setMessage] = useState<string>();
  const activeChatId = useActiveChatID();
  const modules = useMemo(() => {
    const modules = CryptographyMod.getModules();
    if (!config.selectedModuleName) {
      setConfig({ ...config, selectedModuleName: modules[0]?.name });
    }
    return modules;
  }, []);
  const selectedModule = useMemo(() => modules.find((module) => module.name === config.selectedModuleName), [config.selectedModuleName]);

  const canSend = useMemo(() => {
    return !!activeChatId && selectedModule?.canSend(activeChatId);
  }, [activeChatId, config]);

  const handleSend = async () => {
    if (!message) return;
    if (!selectedModule) return;
    const activeChatId = WapiMod.getActiveChatId();
    if (!activeChatId) return;
    const encryptedMessage = await selectedModule.encrypt(activeChatId, message);
    if (!encryptedMessage) return;
    const toSend = `[-${selectedModule.name}-]${encryptedMessage}[`;
    WapiMod.sendTextMessage(activeChatId, toSend);
    setMessage("");
    ref.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className={styles.container}>
      <Flex gap={4}>
        {modules.map((module) => (
          <Button key={module.name} selected={selectedModule === module} onClick={() => setConfig({ ...config, selectedModuleName: module.name })}>
            {module.name}
          </Button>
        ))}
      </Flex>
      {selectedModule && <selectedModule.component config={config} setConfig={setConfig} />}
      <CheckboxFormControl label="Auto Decrypt" value={config.autoDecrypt} onChange={(autoDecrypt) => setConfig({ ...config, autoDecrypt })} />
      {config.autoDecrypt && (
        <CheckboxFormControl
          label="Hide Encrypted Body"
          value={config.hideEncryptedBody}
          onChange={(hideEncryptedBody) => setConfig({ ...config, hideEncryptedBody })}
        />
      )}
      <Flex gap={8}>
        <TextInput
          ref={ref}
          disabled={!canSend}
          fullWidth
          value={message}
          onChange={setMessage}
          placeholder="Message plain text"
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSend} disabled={!canSend || !message}>
          <Flex gap={8} align="center">
            <Icon type="send" size={16} />
            Send
          </Flex>
        </Button>
      </Flex>
    </div>
  );
}
