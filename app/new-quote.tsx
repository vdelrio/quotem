import { StyleSheet } from "react-native";
import { Button, TextField, Picker } from "react-native-ui-lib";
import { theme } from "@/theme";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useQuoteStore } from "@/store/quoteStore";
import { useAuthorStore } from "@/store/authorStore";
import { useRouter } from "expo-router";
import { Author } from "@/models/models";

export default function NewScreen() {
  const router = useRouter();
  const [text, setText] = useState<string>();
  const addQuote = useQuoteStore((state) => state.addQuote);
  const findAuthorById = useAuthorStore((state) => state.findAuthorById);
  const authors: Author[] = useAuthorStore((state) => state.authors);
  const [author, setAuthor] = useState<Author>(authors[0]);

  const handleSubmit = () => {
    if (!text) {
      return;
    }
    addQuote(text, author);
    router.back();
  };

  const onChangeAuthor = (authorId: string) => {
    const selectedAuthor = findAuthorById(authorId);
    setAuthor(selectedAuthor);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TextField
        marginB-s6
        text70L
        label="Cita"
        value={text}
        onChangeText={setText}
        placeholder="Ingrese la cita..."
        multiline
        numberOfLines={12}
      />
      <Picker
        marginB-s6
        text70L
        label="Autor"
        value={author?.id}
        placeholder="Seleccione un autor"
        onChange={(value) => onChangeAuthor(value as string)}
        useSafeArea
        topBarProps={{ title: "Autor" }}
      >
        {authors.length &&
          authors.map((author) => (
            <Picker.Item
              label={author?.name}
              value={author?.id}
              key={author?.id}
            />
          ))}
      </Picker>
      <Button label="Agregar" onPress={handleSubmit} disabled={!text} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    padding: 24,
  },
});
