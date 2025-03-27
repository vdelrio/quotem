import { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  PTSansNarrow_400Regular,
  useFonts,
} from "@expo-google-fonts/pt-sans-narrow";
import { theme } from "@/theme";
import { useQuoteStore } from "@/store/quoteStore";
import { QuoteCard } from "@/components/QuoteCard";
import { QButton } from "@/components/QButton";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    PTSansNarrow_400Regular,
  });
  const router = useRouter();
  const quotes = useQuoteStore((state) => state.quotes);

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={quotes}
      renderItem={({ item }) => <QuoteCard quote={item} />}
      ListEmptyComponent={
        <QButton
          title="Add your first quote"
          onPress={() => {
            router.navigate("/new");
          }}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    padding: 12,
  },
});
