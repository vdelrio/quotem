import { SafeAreaView, StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { QuoteCard } from "@components/quote/QuoteCard";
import Button from "react-native-ui-lib/button";
import LoaderScreen from "react-native-ui-lib/loaderScreen";
import { useQuoteStore } from "@store/quoteStore";
import { useFetchQuotes } from "@repository/useFetchQuotes";
import { useLayoutEffect } from "react";
import FloatingButton from "@components/atoms/FloatingButton";
import { Colors } from "react-native-ui-lib/style";

export default function App() {
  const router = useRouter();

  const quotes = useQuoteStore((state) => state.quotes);
  const setQuotes = useQuoteStore((state) => state.setQuotes);

  const { quotes: fetchedQuotes, loading } = useFetchQuotes();

  useLayoutEffect(() => {
    if (!loading && fetchedQuotes) {
      setQuotes(fetchedQuotes);
    }
  }, [loading, fetchedQuotes, setQuotes]);

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
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
      <FloatingButton
        onPress={() => router.navigate("/quotes/create")}
        // buttonSize={65}
        // iconSize={26}
        backgroundColor={Colors.primary}
      />
    </SafeAreaView>
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
