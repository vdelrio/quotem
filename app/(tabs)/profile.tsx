import { StyleSheet } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

export default function ProfileScreen() {
  const device = useCameraDevice("back");
  const { hasPermission } = useCameraPermission();

  // if (!hasPermission) {
  //   return <PermissionsPage />;
  // }
  if (device == null) {
    return null;
  }
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
}
