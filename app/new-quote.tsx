import { View, Text, StyleSheet } from "react-native";
import { theme } from "@/theme";

export default function NewScreen() {
  return (
    <View style={styles.container}>
      <Text>New quote</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
