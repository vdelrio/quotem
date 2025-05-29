import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { PhotoRecognizer } from "react-native-vision-camera-text-recognition";
import ImagePicker from "react-native-image-crop-picker";
import { useRef } from "react";
import { useQuoteStore } from "@store/quoteStore";
import { router } from "expo-router";

const REMOVE_NEWLINES_REGEX = /\r?\n|\r/g;

export default function CamaraScreen() {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back");
  const setCurrentQuoteField = useQuoteStore(
    (state) => state.setCurrentQuoteField,
  );

  const openCropper = async (imagePath: string) => {
    const image = await ImagePicker.openCropper({
      mediaType: "photo",
      path: imagePath,
      freeStyleCropEnabled: true,
    });

    // Extract text from image
    const result = await PhotoRecognizer({
      uri: image.path,
      orientation: "portrait",
    });
    setCurrentQuoteField(
      "text",
      result?.resultText?.replace(REMOVE_NEWLINES_REGEX, " "),
    );

    await ImagePicker.cleanSingle(image.path);
    router.back();
  };

  const takePhoto = async () => {
    try {
      const photo = await camera.current?.takePhoto();
      if (photo) {
        await openCropper(`file://${photo.path}`);
      }
    } catch (error) {
      console.error("Failed to take photo:", error);
    }
  };

  if (device == null) {
    return (
      <View>
        <Text>No se encontró la cámara trasera!</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
        <View style={styles.innerCircle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
  },
});
