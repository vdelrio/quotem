import { theme } from "@/theme";
import { StyleSheet, Text, Pressable } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export function QButton({ title, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={(state) => {
        if (state.pressed) {
          return [styles.button, styles.buttonPressed];
        }
        return styles.button;
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: theme.palette.one,
  },
  buttonPressed: {
    backgroundColor: theme.palette.two,
  },
});
