import { Button } from "@page-components/basic/button";
import styles from "./styles.module.css";
import React, { KeyboardEvent, useMemo, useRef, useState } from "react";
import { Flex } from "@page-components/basic/flex";
import { Icon } from "@page-components/basic/icon";
import { TextInput } from "@page-components/basic/text-input";
import { useCryptographyConfig } from "@page-contexts/cryptography-config";
import { CryptographyMod } from "@page-features/cryptography/cryptography.mod";
import { WapiMod } from "@page-features/wapi/wapi.mod";

export function CryptographyMenu() {
  const ref = useRef<HTMLInputElement>(null);
  const { config, setConfig } = useCryptographyConfig();
  const [message, setMessage] = useState<string>();
  const modules = useMemo(() => {
    const modules = CryptographyMod.getModules();
    if (!config.selectedModuleName) {
      setConfig({ ...config, selectedModuleName: modules[0]?.name });
    }
    return modules;
  }, []);
  const selectedModule = useMemo(() => modules.find((module) => module.name === config.selectedModuleName), [config.selectedModuleName]);

  const handleSend = async () => {
    if (!message) return;
    if (!selectedModule) return;
    const activeChatId = WapiMod.getActiveChatId();
    if (!activeChatId) return;
    const encryptedMessage = await selectedModule.encrypt(config, message);
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
      <Flex gap={8}>
        <TextInput ref={ref} fullWidth value={message} onChange={setMessage} placeholder="Message plain text" onKeyDown={handleKeyDown} />
        <Button onClick={handleSend}>
          <Flex gap={8} align="center">
            <Icon type="save" size={16} />
            Send
          </Flex>
        </Button>
      </Flex>
    </div>
  );
}
