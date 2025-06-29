import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp, // Para tipar estilos dinámicos
  ViewStyle, // Para tipar estilos de View
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Asegúrate de tener @expo/vector-icons instalado

// Define la interfaz para las props del componente FloatingButton
interface FloatingButtonProps {
  onPress: () => void; // Función sin argumentos y sin retorno
  iconName?: keyof typeof AntDesign.glyphMap | string; // Nombre del icono de AntDesign.
  // `keyof typeof AntDesign.glyphMap` para seguridad de tipo,
  // `| string` como fallback si necesitas flexibilidad.
  buttonSize?: number; // Tamaño del botón (ancho/alto)
  iconSize?: number; // Tamaño del icono
  backgroundColor?: string; // Color de fondo del botón
  iconColor?: string; // Color del icono
  style?: StyleProp<ViewStyle>; // Propiedad de estilo opcional para personalizar desde fuera
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  iconName = "plus", // Valor por defecto
  buttonSize = 60, // Valor por defecto
  iconSize = 24, // Valor por defecto
  backgroundColor = "#007AFF", // Valor por defecto (azul Expo)
  iconColor = "#FFFFFF", // Valor por defecto (blanco)
  style, // Recibe la propiedad de estilo
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.fabContainer, // Estilos base
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 4, // Hace el botón circular
          backgroundColor: backgroundColor,
        },
        style, // Aplica los estilos pasados por props (permite sobrescribir)
      ]}
      onPress={onPress}
      activeOpacity={0.7} // Efecto de opacidad al presionar
    >
      <AntDesign
        name={iconName as keyof typeof AntDesign.glyphMap}
        size={iconSize}
        color={iconColor}
      />
      {/* Nota: Usamos `as keyof typeof AntDesign.glyphMap` para asegurar que TypeScript
         entienda que `iconName` es un nombre de icono válido, especialmente si usas `| string` */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute", // Permite posicionamiento flotante
    bottom: 30, // Distancia desde abajo
    right: 30, // Distancia desde la derecha
    justifyContent: "center",
    alignItems: "center",
    elevation: 8, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 1000, // Asegura que el botón esté por encima de otros contenidos
  },
});

export default FloatingButton;
