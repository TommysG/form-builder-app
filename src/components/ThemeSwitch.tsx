import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useTheme } from "next-themes";

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) return null; // avoid rehydration errors

  return (
    <Tabs defaultValue={theme}>
      <TabsList>
        <TabsTrigger value="light" onClick={() => setTheme("light")}>
          Light
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
          Dark
        </TabsTrigger>
        <TabsTrigger value="system" onClick={() => setTheme("system")}>
          System
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default ThemeSwitch;
