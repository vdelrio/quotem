import { BorderRadiuses, Colors, ThemeManager } from "react-native-ui-lib";

// Initial color palette
const colorPalette = {
  one: "#93aec1",
  two: "#9dbdba",
  three: "#f8b042",
  four: "#ec6a52",
  five: "#f3b7ad",
};

// Function to update theme components based on current colors
const updateComponentThemes = () => {
  // Set theme defaults for various components
  ThemeManager.setComponentTheme("Button", {
    borderRadius: BorderRadiuses.br50,
  });
};

export default {
  initializeDesignSystem: () => {
    // Load initial colors
    Colors.loadColors(colorPalette);
    // Load design tokens based on primary color
    Colors.loadDesignTokens({ primaryColor: colorPalette.four });
    // Initialize component themes
    updateComponentThemes();
  },
};
