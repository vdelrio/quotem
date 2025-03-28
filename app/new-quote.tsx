import { Text, StyleSheet, TextInput, Alert } from "react-native";
import { theme } from "@/theme";
import { QButton } from "@/components/QButton";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useQuoteStore } from "@/store/quoteStore";
import { useRouter } from "expo-router";

export default function NewScreen() {
  const router = useRouter();
  const addQuote = useQuoteStore((state) => state.addQuote);
  const [text, setText] = useState<string>();

  const handleSubmit = () => {
    if (!text) {
      return Alert.alert(
        "Validation Error",
        "Debes ingresar el texto de la cita.",
      );
    }
    addQuote(text);
    router.back();
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Cita</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="Ingrese la cita..."
        multiline
        numberOfLines={12}
      />
      <QButton title="Agregar" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.palette.four,
    borderRadius: 6,
    padding: 12,
    marginBottom: 24,
    fontSize: 18,
    textAlignVertical: "top",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
});
