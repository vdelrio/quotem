import { StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { QuoteCard } from "@components/quote/QuoteCard";
import { Button, Colors, LoaderScreen } from "react-native-ui-lib";
import { useQuoteStore } from "@store/quoteStore";
import { useFetchQuotes } from "@repository/useFetchQuotes";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();
  const quotes = useQuoteStore((state) => state.quotes);
  const setQuotes = useQuoteStore((state) => state.setQuotes);

  const { quotes: fetchedQuotes, loading } = useFetchQuotes();

  useEffect(() => {
    if (!loading && fetchedQuotes) {
      setQuotes(fetchedQuotes);
    }
  }, [loading, fetchedQuotes, setQuotes]);

  if (loading) {
    return <LoaderScreen overlay />;
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
