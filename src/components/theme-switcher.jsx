/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Dropdown, Button, Label } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Display, Moon, Sun } from "@gravity-ui/icons";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const activeTheme = theme === "system" ? resolvedTheme : theme;

  const renderActiveIcon = () => {
    if (activeTheme === "light") return <Sun className="w-4 h-4" />;
    if (activeTheme === "dark") return <Moon className="w-4 h-4" />;
    return <Display className="w-4 h-4" />;
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button 
          as="div" 
          variant="secondary" 
          className="cursor-pointer select-none flex items-center gap-2"
        >
          {renderActiveIcon()}
          <span>Theme</span>
        </Button>
      </Dropdown.Trigger>
      
      <Dropdown.Popover>
        <Dropdown.Menu 
          aria-label="Theme selection"
          selectionMode="single"
          selectedKeys={theme ? [theme] : []}
          onAction={(key) => setTheme(key)}
        >
          {/* In HeroUI v3, icons are just passed as immediate children before the <Label> */}
          <Dropdown.Item id="light" textValue="Light Theme" className="flex items-center gap-2">
            <Sun className="w-4 h-4" />
            <Label>Light</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
          
          <Dropdown.Item id="dark" textValue="Dark Theme" className="flex items-center gap-2">
            <Moon className="w-4 h-4" />
            <Label>Dark</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
          
          <Dropdown.Item id="system" textValue="System Theme" className="flex items-center gap-2">
            <Display className="w-4 h-4" />
            <Label>System</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}