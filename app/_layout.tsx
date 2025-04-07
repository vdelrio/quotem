import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import DesignSystem from "@/theme/DesignSystem";

export default function Layout() {
  DesignSystem.initializeDesignSystem();
  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="new-quote"
          options={{
            presentation: "modal",
            title: "Nueva cita",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
