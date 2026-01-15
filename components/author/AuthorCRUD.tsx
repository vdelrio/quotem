import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacings } from "react-native-ui-lib/style";
import LoaderScreen from "react-native-ui-lib/loaderScreen";
import { useFetchAuthors } from "@repository/useFetchAuthors";
import Animated, { LinearTransition } from "react-native-reanimated";
import { AuthorCRUDItem } from "@components/author/AuthorCRUDItem";

export function AuthorCRUD() {
  const { authors, loading } = useFetchAuthors();

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <Animated.FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={authors}
      renderItem={({ item }) => <AuthorCRUDItem author={item} />}
      itemLayoutAnimation={LinearTransition}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    padding: Spacings.s6,
  },
});
