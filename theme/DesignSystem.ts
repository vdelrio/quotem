import {
  Colors,
  ThemeManager,
  BorderRadiuses,
} from "react-native-ui-lib/style";

const primary = "#ec6a52";
const secondary = "#9dbdba";
const accent = "#42a28f";

// Initial color palette
const colorPalette = {
  primary,
  secondary,
  accent,
  sepia: "#fbf0d9",
  highlight: "#ffde64",
  darkGray: "#333333",
  gradientStart: secondary,
  gradientEnd: "#e8f3f1",
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
