import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  color?: string;
  onPress: () => void;
  disabled?: boolean;
};

export function QButton({
  title,
  color = "#93aec1",
  disabled = false,
  onPress,
}: Props) {
  const getButtonStyle = () => ({
    ...styles.button,
    backgroundColor: disabled ? "#ccc" : color,
  });
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={getButtonStyle()}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
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
  },
});
