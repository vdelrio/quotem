import { StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { QuoteCard } from "@components/quote/QuoteCard";
import { SearchBarHeader } from "@components/molecules/SearchBarHeader";
import { useSearchQuotes } from "@hooks/useSearchQuotes";
import LoaderScreen from "react-native-ui-lib/loaderScreen";

export default function Favorites() {
  const { loading, quotes, searchText, setSearchText } = useSearchQuotes();

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <Animated.FlatList
      style={styles.container}
      ListHeaderComponent={
        <SearchBarHeader
          placeholder="Buscar citas"
          value={searchText}
          onChangeValue={setSearchText}
        />
      }
      contentContainerStyle={styles.contentContainer}
      data={quotes.filter((quote) => quote.isFavorite)}
      renderItem={({ item }) => <QuoteCard quote={item} />}
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
