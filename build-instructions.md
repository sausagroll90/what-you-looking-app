# Build Instructions

1. `cd` into root directory of project
2. `mkdir android/app/src/main/assets` if it doesn't already exist
3. `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`
4. `cd android`
5. `./gradlew assembleDebug`

The .apk file should be available in `android/app/build/outputs/apk/debug/app-debug.apk`
