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
            title: "Nueva cita",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="[quoteId]"
          options={{
            title: "",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="camara"
          options={{
            title: "Camara",
            presentation: "modal",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
