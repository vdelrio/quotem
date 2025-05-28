import { useEffect } from "react";
import { Text, StyleSheet, TextInput, Image } from "react-native";
import {
  Button,
  Picker,
  Icon,
  Colors,
  Typography,
  Spacings,
} from "react-native-ui-lib";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Link, useRouter } from "expo-router";
import { useQuoteRepository } from "@repository/quoteRepository";
import { useQuoteStore } from "@store/quoteStore";
import { useAuthorRepository } from "@repository/authorRepository";
import { Author } from "@model/models";
import { TakePhotoBtn } from "@components/TakePhotoBtn";

const dropdownIcon = <Icon source={require("@/assets/chevronDown.png")} />;

export default function NewScreen() {
  const router = useRouter();
  const addQuote = useQuoteRepository((state) => state.addQuote);

  const currentQuote = useQuoteStore((state) => state.currentQuote);
  const updateCurrentQuoteField = useQuoteStore(
    (state) => state.updateCurrentQuoteField,
  );
  const clearCurrentQuote = useQuoteStore((state) => state.clearCurrentQuote);

  const findAuthorById = useAuthorRepository((state) => state.findAuthorById);
  const authors: Author[] = useAuthorRepository((state) => state.authors);

  useEffect(() => {
    clearCurrentQuote();
  }, [clearCurrentQuote]);

  const handleSubmit = () => {
    if (!currentQuote.text) {
      return;
    }
    addQuote(currentQuote);
    router.back();
  };

  const onChangeAuthor = (authorId: string) => {
    const selectedAuthor = findAuthorById(authorId);
    updateCurrentQuoteField("author", selectedAuthor);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Cita</Text>
      <TextInput
        value={currentQuote.text}
        onChangeText={(text) => updateCurrentQuoteField("text", text)}
        style={styles.textArea}
        placeholder="Ingrese la cita..."
        multiline
        numberOfLines={12}
      />
      <Picker
        label="Autor"
        labelStyle={styles.label}
        preset="underline"
        text70
        value={currentQuote.author?.id}
        onChange={(value) => onChangeAuthor(value as string)}
        useSafeArea
        topBarProps={{ title: "Autor" }}
        trailingAccessory={dropdownIcon}
        marginB-s2
      >
        {authors.length &&
          authors.map((author) => (
            <Picker.Item
              label={author?.name}
              value={author?.id || -1}
              key={author?.id}
            />
          ))}
      </Picker>
      {currentQuote.imageUri && (
        <Image
          source={{ uri: currentQuote.imageUri }}
          style={styles.previewImage}
        />
      )}
      <TakePhotoBtn label="Tomar foto" marginB-10 />
      <Link href="/image-generator" asChild>
        <Button label="Generar imagen" background-accent marginB-10 />
      </Link>
      <Button
        label="Crear cita"
        onPress={handleSubmit}
        disabled={!currentQuote.text}
        style={styles.primaryBtn}
      />
    </KeyboardAwareScrollView>
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
  label: {
    ...Typography.text65R,
    marginBottom: Spacings.s1,
  },
  textArea: {
    borderBottomWidth: 1,
    borderColor: Colors.$outlineDefault,
    paddingVertical: Spacings.s2,
    ...Typography.text70R,
    textAlignVertical: "top",
    marginBottom: Spacings.s6,
  },
  previewImage: {
    width: "100%",
    height: 300,
    borderRadius: 5,
    marginBottom: 10,
  },
  primaryBtn: {
    height: 55,
  },
});
