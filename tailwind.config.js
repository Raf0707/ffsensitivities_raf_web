/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#276A49', // primaryLight
          container: '#ADF2C7', // primaryContainerLight
          on: '#FFFFFF', // onPrimaryLight
          onContainer: '#002111', // onPrimaryContainerLight
        },
        secondary: {
          DEFAULT: '#4E6355', // secondaryLight
          container: '#D0E8D6', // secondaryContainerLight
          on: '#FFFFFF', // onSecondaryLight
          onContainer: '#0B1F14', // onSecondaryContainerLight
        },
        tertiary: {
          DEFAULT: '#3C6471', // tertiaryLight
          container: '#BFE9F9', // tertiaryContainerLight
          on: '#FFFFFF', // onTertiaryLight
          onContainer: '#001F27', // onTertiaryContainerLight
        },
        error: {
          DEFAULT: '#BA1A1A', // errorLight
          container: '#FFDAD6', // errorContainerLight
          on: '#FFFFFF', // onErrorLight
          onContainer: '#410002', // onErrorContainerLight
        },
        background: {
          DEFAULT: '#F6FBF4', // backgroundLight
          on: '#171D19', // onBackgroundLight
        },
        surface: {
          DEFAULT: '#F6FBF4', // surfaceLight
          on: '#171D19', // onSurfaceLight
          variant: '#DCE5DC', // surfaceVariantLight
          onVariant: '#404942', // onSurfaceVariantLight
          dim: '#D6DBD5', // surfaceDimLight
          bright: '#F6FBF4', // surfaceBrightLight
          containerLowest: '#FFFFFF', // surfaceContainerLowestLight
          containerLow: '#F0F5EE', // surfaceContainerLowLight
          container: '#EAEFE9', // surfaceContainerLight
          containerHigh: '#E4EAE3', // surfaceContainerHighLight
          containerHighest: '#DFE4DD', // surfaceContainerHighestLight
        },
        outline: {
          DEFAULT: '#717972', // outlineLight
          variant: '#C0C9C0', // outlineVariantLight
        },
        scrim: '#000000', // scrimLight
        inverse: {
          surface: '#2C322D', // inverseSurfaceLight
          onSurface: '#EDF2EB', // inverseOnSurfaceLight
          primary: '#91D5AC', // inversePrimaryLight
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  },
  plugins: []
};
