import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
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
