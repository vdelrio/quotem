import { SafeAreaView, StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { QuoteCard } from "@components/quote/QuoteCard";
import LoaderScreen from "react-native-ui-lib/loaderScreen";
import FloatingButton from "@components/atoms/FloatingButton";
import { Colors } from "react-native-ui-lib/style";
import { SearchBarHeader } from "@components/molecules/SearchBarHeader";
import { useSearchQuotes } from "@hooks/useSearchQuotes";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const router = useRouter();
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
      <SafeAreaView style={styles.container}>
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
          renderItem={({ item }) => (
            <QuoteCard quote={item} searchText={searchText} />
          )}
          itemLayoutAnimation={LinearTransition}
        />
        <FloatingButton
          onPress={() => router.navigate("/quotes/create")}
          backgroundColor={Colors.primary}
        />
      </SafeAreaView>
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
