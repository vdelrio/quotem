import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, Linking } from "react-native";
import type { CameraPermissionStatus } from "react-native-vision-camera";
import { Camera } from "react-native-vision-camera";
import { useRouter } from "expo-router";

const CONTENT_SPACING = 15;

export default function PermissionsPage() {
  const router = useRouter();
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>("not-determined");

  const requestCameraPermission = useCallback(async () => {
    console.log("Requesting camera permission...");
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === "denied") await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);

  useEffect(() => {
    if (cameraPermissionStatus === "granted") {
      router.replace("/");
    }
  }, [cameraPermissionStatus, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Camara permission</Text>
      <View style={styles.permissionsContainer}>
        {cameraPermissionStatus !== "granted" && (
          <Text style={styles.permissionText}>
            QuoteM needs <Text style={styles.bold}>Camera permission</Text>.{" "}
            <Text style={styles.hyperlink} onPress={requestCameraPermission}>
              Grant
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 26,
    fontWeight: "bold",
    maxWidth: "80%",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    // ...SAFE_AREA_PADDING,
    padding: 44,
  },
  permissionsContainer: {
    marginTop: CONTENT_SPACING * 2,
  },
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: "#007aff",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
});
