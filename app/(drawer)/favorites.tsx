import { StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { QuoteCard } from "@components/quote/QuoteCard";
import { SearchBarHeader } from "@components/molecules/SearchBarHeader";
import { useSearchQuotes } from "@hooks/useSearchQuotes";
import LoaderScreen from "react-native-ui-lib/loaderScreen";
import { Colors } from "react-native-ui-lib/style";
import { LinearGradient } from "expo-linear-gradient";

export default function FavoritesScreen() {
  const { loading, quotes, searchText, setSearchText } = useSearchQuotes();

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <LinearGradient
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[Colors.gradientStart, Colors.gradientEnd]}
    >
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
        renderItem={({ item }) => (
          <QuoteCard quote={item} searchText={searchText} />
        )}
        itemLayoutAnimation={LinearTransition}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 12,
  },
});
