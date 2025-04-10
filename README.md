# QuoteM
Mobile app for quotes management.

## RNUI

### Spacings
```js
export const SpacingLiterals = {
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
  s6: 24,
  s7: 28,
  s8: 32,
  s9: 36,
  s10: 40
};
```

### BorderRadiuses
```js
export const BorderRadiusesLiterals = {
  br0: Constants.isIOS ? 0 : 0,
  br10: Constants.isIOS ? 3 : 2,
  br20: 6,
  br30: Constants.isIOS ? 9 : 8,
  br40: 12,
  br50: Constants.isIOS ? 15 : 16,
  br60: 20,
  br100: 999
};
```

### ColorsPalette
```js
const colorsPalette = {
  // GREYS
  grey1: '#13191E',
  grey5: '#1E2830',
  grey10: '#20303C',
  grey20: '#4D5963',
  grey30: '#6E7881',
  grey40: '#A6ACB1',
  grey50: '#D2D6D8',
  grey60: '#E8ECF0',
  grey70: '#F0F2F5',
  grey80: '#F8f9FA',
  // BLUES
  blue1: '#092E76',
  blue5: '#0C3E9D',
  blue10: '#0F4DC4',
  blue20: '#0F59E6',
  blue30: '#116DFF',
  blue40: '#3582FF',
  blue50: '#81B4FF',
  blue60: '#97C7FF',
  blue70: '#C4DFFF',
  blue80: '#E9F3FF',
  // CYANS
  cyan10: '#00AAAF',
  cyan20: '#32BABC',
  cyan30: '#3CC7C5',
  cyan40: '#64D4D2',
  cyan50: '#8BDFDD',
  cyan60: '#B1E9E9',
  cyan70: '#D8F4F4',
  cyan80: '#EBF9F9',
  // GREENS
  green1: '#004030',
  green5: '#006047',
  green10: '#008563',
  green20: '#009872',
  green30: '#00A87E',
  green40: '#45C3A4',
  green50: '#85DEC8',
  green60: '#B3EBDD',
  green70: '#CFF2E9',
  green80: '#E3F7F2',
  // YELLOWS
  yellow1: '#6A4300',
  yellow5: '#9C6600',
  yellow10: '#E89900',
  yellow20: '#F7AE00',
  yellow30: '#FFC50D',
  yellow40: '#FFD54E',
  yellow50: '#FFE48D',
  yellow60: '#FFEEB9',
  yellow70: '#FFF4D3',
  yellow80: '#FFF9E4',
  // ORANGE,
  orange1: '#762D00',
  orange5: '#9E3900',
  orange10: '#CD4700',
  orange20: '#E95504',
  orange30: '#FB6413',
  orange40: '#FC8E53',
  orange50: '#FDB893',
  orange60: '#FED4BD',
  orange70: '#FFE5D7',
  orange80: '#FFF1EA',
  // REDS
  red1: '#5F140F',
  red5: '#9E1E11',
  red10: '#D52712',
  red20: '#E93222',
  red30: '#FC3D2F',
  red40: '#FD7267',
  red50: '#FEA6A0',
  red60: '#FFC9C5',
  red70: '#FFDEDC',
  red80: '#FFEDEC',
  // PURPLE,
  purple1: '#301439',
  purple5: '#50215F',
  purple10: '#791c96',
  purple20: '#8d21b0',
  purple30: '#9f42bd',
  purple40: '#b268ca',
  purple50: '#daa0e8',
  purple60: '#e9ccf2',
  purple70: '#f1daf7',
  purple80: '#faebfd',
  // VIOLETS
  violet1: '#170E5C',
  violet5: '#231690',
  violet10: '#3220CD',
  violet20: '#4633E9',
  violet30: '#5A48F5',
  violet40: '#8579FF',
  violet50: '#B2ABFF',
  violet60: '#D1CCFF',
  violet70: '#E3E0FF',
  violet80: '#F0EEFF',
  // WHITE,
  white: '#FFFFFF',
  black: '#000000',
  dark: '#0E1216',
  transparent: 'transparent'
};
```

### DesignTokens
```js
const designTokens = {
  // BACKGROUND
  $backgroundDefault: colorsPalette.white,
  $backgroundElevated: colorsPalette.white,
  $backgroundElevatedLight: colorsPalette.white,
  $backgroundNeutralHeavy: colorsPalette.grey20,
  $backgroundNeutralIdle: colorsPalette.grey40,
  $backgroundNeutralMedium: colorsPalette.grey60,
  $backgroundNeutral: colorsPalette.grey70,
  $backgroundNeutralLight: colorsPalette.grey80,
  $backgroundPrimaryHeavy: colorsPalette.violet30,
  $backgroundPrimaryMedium: colorsPalette.violet70,
  $backgroundPrimaryLight: colorsPalette.violet80,
  $backgroundGeneralHeavy: colorsPalette.blue30,
  $backgroundGeneralMedium: colorsPalette.blue70,
  $backgroundGeneralLight: colorsPalette.blue80,
  $backgroundSuccessHeavy: colorsPalette.green30,
  $backgroundSuccessLight: colorsPalette.green80,
  $backgroundWarningHeavy: colorsPalette.yellow30,
  $backgroundWarningLight: colorsPalette.yellow70,
  $backgroundMajorLight: colorsPalette.orange80,
  $backgroundMajorHeavy: colorsPalette.orange30,
  $backgroundDangerHeavy: colorsPalette.red30,
  $backgroundDangerLight: colorsPalette.red80,
  $backgroundDisabled: colorsPalette.grey50,
  $backgroundDark: colorsPalette.grey10,
  $backgroundDarkElevated: colorsPalette.grey10,
  $backgroundDarkActive: colorsPalette.grey20,
  $backgroundInverted: colorsPalette.grey10,
  // TEXT
  $textDisabled: colorsPalette.grey50,
  $textDefault: colorsPalette.grey10,
  $textNeutralHeavy: colorsPalette.grey20,
  $textNeutral: colorsPalette.grey30,
  $textNeutralLight: colorsPalette.grey40,
  $textDefaultLight: colorsPalette.white,
  $textPrimary: colorsPalette.violet30,
  $textGeneral: colorsPalette.blue30,
  $textSuccess: colorsPalette.green10,
  $textSuccessLight: colorsPalette.green30,
  $textMajor: colorsPalette.orange10,
  $textDanger: colorsPalette.red10,
  $textDangerLight: colorsPalette.red30,
  // ICON
  $iconDefault: colorsPalette.grey10,
  $iconNeutral: colorsPalette.grey20,
  $iconDefaultLight: colorsPalette.white,
  $iconPrimary: colorsPalette.violet30,
  $iconPrimaryLight: colorsPalette.violet50,
  $iconGeneral: colorsPalette.blue30,
  $iconGeneralLight: colorsPalette.blue50,
  $iconSuccess: colorsPalette.green10,
  $iconSuccessLight: colorsPalette.green30,
  $iconMajor: colorsPalette.orange10,
  $iconDanger: colorsPalette.red10,
  $iconDangerLight: colorsPalette.red30,
  $iconDisabled: colorsPalette.grey50,
  // OUTLINE
  $outlineDefault: colorsPalette.grey60,
  $outlineDisabled: colorsPalette.grey60,
  $outlineDisabledHeavy: colorsPalette.grey30,
  $outlineNeutral: colorsPalette.grey50,
  $outlineNeutralHeavy: colorsPalette.grey10,
  $outlinePrimary: colorsPalette.violet30,
  $outlinePrimaryMedium: colorsPalette.blue70,
  $outlineGeneral: colorsPalette.blue30,
  $outlineWarning: colorsPalette.yellow30,
  $outlineDanger: colorsPalette.red30,
  $outlineInverted: colorsPalette.white,
  // BLACK AND WHITE
  $black: colorsPalette.black,
  $white: colorsPalette.white
};
```