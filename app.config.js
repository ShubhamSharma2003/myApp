import 'dotenv/config';

export default {
  expo: {
    name: 'goNoise',
    slug: 'ecommerce-firebase',
    privacy: 'public',
    platforms: ['ios', 'android'],
    version: '0.0.1',
    orientation: 'portrait',
    icon: './assets/noise.png',
    splash: {
      image: './assets/noise.png',
      resizeMode: 'cover',
      backgroundColor: '#F57C00'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.gonoise.ecommerce',
      supportsTablet: true,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false  // ✅ Add this line
      }
    },
    android: {
      package: 'future.gonoise.com',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF'
      }
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      eas: {
        projectId: '1c078f63-91c5-48a6-88a8-a3a0b39fbf5a'
      }
    }
  }
}
