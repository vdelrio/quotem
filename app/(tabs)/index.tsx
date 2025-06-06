import { StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { QuoteCard } from "@components/quote/QuoteCard";
import { Button } from "react-native-ui-lib";
import { useQuoteStore } from "@store/quoteStore";
import { useQuoteRepository } from "@repository/useQuoteRepository";

export default function App() {
  const router = useRouter();
  const quotes = useQuoteStore((state) => state.quotes);

  const { loading } = useQuoteRepository();
  if (loading) {
    return;
  }

  return (
    <Animated.FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={quotes}
      renderItem={({ item }) => <QuoteCard quote={item} />}
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
    // TODO: ver por qué no toma el del design system
    // backgroundColor: Colors.secondary,
    backgroundColor: "#9dbdba",
  },
  contentContainer: {
    padding: 12,
  },
});
