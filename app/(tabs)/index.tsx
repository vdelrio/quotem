import { StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { theme } from "@/theme";
import { useQuoteStore } from "@/store/quoteStore";
import { QuoteCard } from "@/components/QuoteCard";
import { QButton } from "@/components/QButton";

export default function App() {
  const router = useRouter();
  const quotes = useQuoteStore((state) => state.quotes);

  return (
    <Animated.FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={quotes}
      renderItem={({ item }) => <QuoteCard quote={item} />}
      itemLayoutAnimation={LinearTransition}
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
    backgroundColor: theme.palette.two,
  },
  contentContainer: {
    padding: 12,
  },
});
