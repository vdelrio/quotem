import { FlatList, StyleSheet } from "react-native";
import { theme } from "@/theme";
import { useQuoteStore } from "@/store/quoteStore";
import { useRouter } from "expo-router";
import { QuoteCard } from "@/components/QuoteCard";
import { QButton } from "@/components/QButton";

export default function App() {
  const router = useRouter();
  const quotes = useQuoteStore((state) => state.quotes);

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
