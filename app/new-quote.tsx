import { Text, StyleSheet, TextInput } from "react-native";
import { theme } from "@/theme";
import { QButton } from "@/components/QButton";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useQuoteStore } from "@/store/quoteStore";
import { Author, useAuthorStore } from "@/store/authorStore";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function NewScreen() {
  const router = useRouter();
  const [text, setText] = useState<string>();
  const [author, setAuthor] = useState<Author>();
  const addQuote = useQuoteStore((state) => state.addQuote);
  const findAuthorById = useAuthorStore((state) => state.findAuthorById);
  const authors: Author[] = useAuthorStore((state) => state.authors);

  const handleSubmit = () => {
    if (!text) {
      return;
    }
    addQuote(text, author);
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
      <Text style={styles.label}>Autor</Text>
      <Picker
        selectedValue={author?.id}
        onValueChange={(itemValue) => setAuthor(findAuthorById(itemValue))}
        style={styles.picker}
      >
        <Picker.Item
          label="Sin autor"
          value={-1}
          key="-1"
          style={{ color: "gray" }}
        />
        {authors.length &&
          authors.map((author) => (
            <Picker.Item
              label={author?.name}
              value={author?.id}
              key={author?.id}
            />
          ))}
      </Picker>
      <QButton
        title="Agregar"
        color={theme.palette.four}
        onPress={handleSubmit}
        disabled={!text}
      />
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
  picker: {
    marginBottom: 24,
  },
});
