import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function MenuScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Stack.Screen
        options={{
          title: 'Menu',
          headerLeft: () => null,
        }}
      />
      <Text>Menu Screen</Text>
    </View>
  );
} 