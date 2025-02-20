# Font Setup Instructions

1. Place the font files in the `assets/fonts` directory:
   - AdihausDIN-Regular.ttf
   - AdihausDIN-Bold.ttf

2. The fonts are configured in App.js using expo-font's useFonts hook with these exact names:
   - 'AdihausDIN-Regular'
   - 'AdihausDIN-Bold'

3. All style references in the application use these standardized font names.

4. The app includes a loading state to ensure fonts are loaded before rendering content.

## Troubleshooting

If fonts are not rendering:
1. Verify font files exist in assets/fonts/
2. Check that font filenames match exactly (case-sensitive)
3. Rebuild the app to ensure font files are included in the bundle
4. Check console for any font loading errors