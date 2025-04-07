import { StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useQuoteStore } from "@/store/quoteStore";
import { QuoteCard } from "@/components/QuoteCard";
import { QButton } from "@/components/QButton";
import { Colors } from "react-native-ui-lib";

export default function App() {
  const router = useRouter();
  const quotes = useQuoteStore((state) => state.quotes);

  return (
    <Animated.FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={quotes}
      renderItem={({ item }) => <QuoteCard quote={item} />}
      itemLayoutAnimation={LinearTransition}
      ListEmptyComponent={
        <QButton
          title="Add your first quote"
          onPress={() => {
            router.navigate("/new");
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
    // backgroundColor: Colors.two,
    backgroundColor: "#9dbdba",
  },
  contentContainer: {
    padding: 12,
  },
});
