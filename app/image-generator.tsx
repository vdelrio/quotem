import { useRef, useState } from "react";
import { Button } from "react-native-ui-lib";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";
import { FancyFontText } from "@/components/FancyFontText";
import { useQuoteStore } from "@/store/quoteStore";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function ImageWithTextOverlay() {
  const viewShotRef = useRef<ViewShot>(null);
  const quote = useQuoteStore((state) => state.currentQuote);
  const updateCurrentQuote = useQuoteStore((state) => state.updateCurrentQuote);
  // const [imagePath, setImagePath] = useState<string | undefined>(undefined);

  const saveImage = async (currentUri: string) => {
    const appDirectory = FileSystem.documentDirectory + "photos/";
    await FileSystem.makeDirectoryAsync(appDirectory, {
      intermediates: true,
    });
    const newUri = `${appDirectory}${Date.now()}.jpg`;

    await FileSystem.moveAsync({
      from: currentUri,
      to: newUri,
    });
    return newUri;
  };

  const captureAndSave = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: "png",
      });
      const permanentUri = await saveImage(uri);
      updateCurrentQuote("imageUri", permanentUri);
      router.back();
      // setImagePath(uri);
    } catch (error) {
      console.error("Error al capturar o guardar la imagen:", error);
      alert("Error al guardar la imagen.");
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShotRef}>
        <ImageBackground
          source={require("@/assets/backgrounds/fondo-1.jpeg")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View style={styles.textContainer}>
            <FancyFontText style={styles.text}>{quote.text}</FancyFontText>
          </View>
        </ImageBackground>
      </ViewShot>

      {/*<Image source={{ uri: imagePath }} style={styles.previewImage} />*/}

      <Button label="Confirmar" onPress={captureAndSave} marginT-10 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    width: width * 0.9, // 90% del ancho de la pantalla
    height: 300, // Altura fija o puedes hacerla relativa también
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
  },
  textContainer: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semi-transparente para mejorar legibilidad
    width: "90%", // El texto ocupará el 90% del ancho de la imagen
    alignSelf: "center", // Asegura que el contenedor del texto esté centrado
  },
  text: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    // numberOfLines y ellipsizeMode se pueden añadir al componente Text para controlar desbordamiento
  },
  previewImage: {
    width: width * 0.9, // 90% del ancho de la pantalla
    height: 300, // Altura fija o puedes hacerla relativa también
    marginTop: 20,
  },
});
