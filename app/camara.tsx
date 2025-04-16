import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { PhotoRecognizer } from "react-native-vision-camera-text-recognition";
import { useRef } from "react";
import * as FileSystem from "expo-file-system";
import { useQuoteStore } from "@/store/quoteStore";
import { router } from "expo-router";

export default function CamaraPage() {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back");
  const updateCurrentQuote = useQuoteStore((state) => state.updateCurrentQuote);

  const takePhoto = async () => {
    try {
      const photo = await camera.current?.takePhoto();
      if (photo) {
        console.log("Photo taken!", photo?.path);

        const appDirectory = FileSystem.documentDirectory + "photos/";
        await FileSystem.makeDirectoryAsync(appDirectory, {
          intermediates: true,
        });
        const newUri = `${appDirectory}${Date.now()}.jpg`;
        console.log({ newUri });

        await FileSystem.moveAsync({
          from: `file://${photo.path}`,
          to: newUri,
        });
        console.log("Photo moved to app directory:", newUri);

        updateCurrentQuote("imageUri", newUri);
        const result = await PhotoRecognizer({
          uri: newUri,
          orientation: "portrait",
        });
        console.log("Scanned:", result?.resultText);
        updateCurrentQuote("text", result?.resultText);

        router.back();
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
