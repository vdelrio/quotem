import { SafeAreaView, StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { QuoteCard } from "@components/quote/QuoteCard";
import LoaderScreen from "react-native-ui-lib/loaderScreen";
import { useQuoteStore } from "@store/quoteStore";
import { useFetchQuotes } from "@repository/useFetchQuotes";
import { useLayoutEffect, useMemo, useState } from "react";
import FloatingButton from "@components/atoms/FloatingButton";
import { Colors } from "react-native-ui-lib/style";
import { SearchBarHeader } from "@components/molecules/SearchBarHeader";

export default function App() {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");

  const quotes = useQuoteStore((state) => state.quotes);
  const setQuotes = useQuoteStore((state) => state.setQuotes);

  const { quotes: fetchedQuotes, loading } = useFetchQuotes();

  const filteredData = useMemo(() => {
    if (!searchText) {
      return quotes;
    }
    const lowercasedSearchText = searchText.toLowerCase();
    return quotes.filter(
      (quote) =>
        quote.text.toLowerCase().includes(lowercasedSearchText) ||
        quote.author?.name?.toLowerCase().includes(lowercasedSearchText),
    );
  }, [quotes, searchText]);

  useLayoutEffect(() => {
    if (!loading && fetchedQuotes) {
      setQuotes(fetchedQuotes);
    }
  }, [loading, fetchedQuotes, setQuotes]);

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors.secondary }]}
    >
      <Animated.FlatList
        ListHeaderComponent={
          <SearchBarHeader
            placeholder="Buscar citas"
            value={searchText}
            onChangeValue={setSearchText}
          />
        }
        contentContainerStyle={styles.contentContainer}
        data={filteredData}
        renderItem={({ item }) => <QuoteCard quote={item} />}
        itemLayoutAnimation={LinearTransition}
      />
      <FloatingButton
        onPress={() => router.navigate("/quotes/create")}
        backgroundColor={Colors.primary}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 12,
  },
});
