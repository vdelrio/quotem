import {
  Colors,
  ThemeManager,
  BorderRadiuses,
} from "react-native-ui-lib/style";

// Initial color palette
const colorPalette = {
  primary: "#ec6a52",
  secondary: "#9dbdba",
  accent: "#42a28f",
  sepia: "#fbf0d9",
  darkGray: "#333333",
};

// Function to update theme components based on current colors
const updateComponentThemes = () => {
  // Set theme defaults for various components
  // ThemeManager.setComponentTheme("Button", {
  //   borderRadius: BorderRadiuses.br50,
  // });
};

export default {
  initializeDesignSystem: () => {
    // Load initial colors
    Colors.loadColors(colorPalette);
    // Load design tokens based on primary color
    Colors.loadDesignTokens({ primaryColor: colorPalette.primary });
    // Initialize component themes
    updateComponentThemes();
  },
};
