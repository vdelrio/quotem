import { StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { QuoteCard } from "@components/quote/QuoteCard";
import Button from "react-native-ui-lib/button";
import { useQuoteStore } from "@store/quoteStore";

export default function App() {
  const router = useRouter();
  const getFavoriteQuotes = useQuoteStore((state) => state.getFavoriteQuotes);

  return (
    <Animated.FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={getFavoriteQuotes()}
      renderItem={({ item }) => (
        <QuoteCard quote={item} applyFavoriteStyle={false} />
      )}
      itemLayoutAnimation={LinearTransition}
      ListEmptyComponent={
        <Button
          label="Agrega tu primera cita"
          onPress={() => {
            router.navigate("/quotes/create");
          }}
        />
      }
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
