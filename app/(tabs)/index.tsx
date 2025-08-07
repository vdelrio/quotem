import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { QuoteCard } from "@components/quote/QuoteCard";
import LoaderScreen from "react-native-ui-lib/loaderScreen";
import { useQuoteStore } from "@store/quoteStore";
import { useFetchQuotes } from "@repository/useFetchQuotes";
import { useLayoutEffect, useMemo, useState } from "react";
import FloatingButton from "@components/atoms/FloatingButton";
import { Colors } from "react-native-ui-lib/style";

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
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar citas"
            value={searchText}
            onChangeText={setSearchText}
            clearButtonMode="while-editing"
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
  searchInput: {
    height: 48,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
