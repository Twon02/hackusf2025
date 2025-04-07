import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1a73e8',
    background: '#ffffff',
    card: '#ffffff',
    text: '#202124',
    border: '#dadce0',
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={customTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerShown: false,
          headerTintColor: '#1a73e8',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: '#ffffff',
            paddingTop: 0,
          },
        }}
      >
        <Stack.Screen 
          name="menu" 
          options={{
            headerShown: true,
            headerTitle: 'Menu',
            headerLeft: () => null,
            contentStyle: {
              paddingTop: 20,
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
