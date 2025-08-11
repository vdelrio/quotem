import { SafeAreaView, StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { QuoteCard } from "@components/quote/QuoteCard";
import LoaderScreen from "react-native-ui-lib/loaderScreen";
import FloatingButton from "@components/atoms/FloatingButton";
import { Colors } from "react-native-ui-lib/style";
import { SearchBarHeader } from "@components/molecules/SearchBarHeader";
import { useSearchQuotes } from "@repository/useSearchQuotes";

export default function App() {
  const router = useRouter();
  const { loading, quotes, searchText, setSearchText } = useSearchQuotes();

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
        data={quotes}
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
