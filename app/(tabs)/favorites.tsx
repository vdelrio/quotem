import { StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { QuoteCard } from "@components/quote/QuoteCard";
import { useQuoteStore } from "@store/quoteStore";

export default function App() {
  const quotes = useQuoteStore((state) => state.quotes);
  return (
    <Animated.FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={quotes.filter((quote) => quote.isFavorite)}
      renderItem={({ item }) => (
        <QuoteCard quote={item} applyFavoriteStyle={false} />
      )}
      itemLayoutAnimation={LinearTransition}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9dbdba",
  },
  contentContainer: {
    padding: 12,
  },
});
