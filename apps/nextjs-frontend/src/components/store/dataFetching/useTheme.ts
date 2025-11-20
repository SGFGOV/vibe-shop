"use client";

import { getActiveTheme } from "app/backend/controllers/theme.controller.medusa";
import { useState, useEffect } from "react";
import { useMainContextStore } from "../provider/MainContextStore";

interface UseThemeResult {
  setting: Record<string, any>;
  settingLoading: boolean;
}

/**
 * Hook to fetch the active theme from Medusa backend
 * Returns the theme settings or empty object if no theme is found
 * Follows the same pattern as useBrand and other data fetching hooks
 */
const useTheme = (): UseThemeResult => {
  const [setting, setSetting] = useState<Record<string, any>>({});
  const [settingLoading, setSettingLoading] = useState(true);
  const { demo } = useMainContextStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSettingLoading(true);
        const themeSettings = await getActiveTheme();
        
        // If theme found, use its settings; otherwise use empty object
        setSetting(themeSettings || {});
      } catch (error) {
        console.error("Failed to fetch theme:", error);
        // Fallback to empty object on error
        setSetting({});
      } finally {
        setSettingLoading(false);
      }
    };

    fetchData();
  }, [demo]);

  return { setting, settingLoading };
};

export default useTheme;

