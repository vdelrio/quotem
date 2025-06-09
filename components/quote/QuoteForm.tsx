import { Image, StyleSheet, Text, TextInput } from "react-native";
import {
  Button,
  Colors,
  Icon,
  LoaderScreen,
  Picker,
  Spacings,
  Typography,
} from "react-native-ui-lib";
import { Link } from "expo-router";
import { NO_AUTHOR, Quote } from "@model/models";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TakePhotoBtn } from "@components/TakePhotoBtn";
import { useFetchAuthors } from "@repository/useFetchAuthors";
import { ShareFileBtn } from "@components/molecules/ShareFileBtn";

const dropdownIcon = <Icon source={require("@assets/chevronDown.png")} />;

type Props = {
  quote: Quote;
  setQuoteField: (fieldName: keyof Quote, value: any) => void;
  onSave: () => Promise<void>;
  saveBtnLabel: string;
};

export function QuoteForm({
  quote,
  setQuoteField,
  onSave,
  saveBtnLabel,
}: Props) {
  const { authors, loading } = useFetchAuthors();

  const onChangeAuthor = (authorId: number) => {
    const selectedAuthor = authors.find((author) => author.id === authorId);
    setQuoteField("author", selectedAuthor);
  };

  if (loading) {
    return <LoaderScreen />;
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Cita</Text>
      <TextInput
        value={quote.text}
        onChangeText={(text) => setQuoteField("text", text)}
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
        value={quote.author?.id || NO_AUTHOR.id}
        onChange={(value) => onChangeAuthor(value as number)}
        useSafeArea
        topBarProps={{ title: "Autor" }}
        trailingAccessory={dropdownIcon}
        marginB-s2
      >
        <Picker.Item
          label={NO_AUTHOR.name}
          value={NO_AUTHOR.id}
          key={NO_AUTHOR.id}
        />
        {authors.length &&
          authors.map((author) => (
            <Picker.Item
              label={author?.name}
              value={author?.id || "-1"}
              key={author?.id}
            />
          ))}
      </Picker>
      {quote.imageUri && (
        <>
          <Image source={{ uri: quote.imageUri }} style={styles.previewImage} />
          <ShareFileBtn
            label="Compartir imagen"
            fileUri={quote.imageUri as string}
            mimeType="image/png"
            background-accent
            marginB-10
          />
        </>
      )}
      <TakePhotoBtn label="Tomar foto" marginB-10 />
      <Link href="/quotes/image-generator" asChild>
        <Button label="Generar imagen" background-accent marginB-10 />
      </Link>
      <Button
        label={saveBtnLabel}
        onPress={onSave}
        disabled={!quote.text}
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
