import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { UserProvider } from './src/context/UserContext';
import CadastroScreen from './src/screens/CadastroScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import DevsScreen from './src/screens/DevsScreen';
import { colors } from './src/theme';

const Tab = createBottomTabNavigator();

function TabIcon({ emoji, focused }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 22 }}>{emoji}</Text>
      {focused && (
        <View style={{
          width: 4, height: 4, borderRadius: 2,
          backgroundColor: colors.accent, marginTop: 2,
        }} />
      )}
    </View>
  );
}

export default function App() {
  return (
    // ─── UserProvider envolve toda a aplicação ────────────────────────────────
    // Isso garante que Cadastro, Perfil e Dev acessem os mesmos dados do Context
    <UserProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              borderTopWidth: 1,
              height: 72,
              paddingBottom: 12,
            },
            tabBarActiveTintColor: colors.accentLight,
            tabBarInactiveTintColor: colors.muted,
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: '600',
            },
          }}
        >
          <Tab.Screen
            name="Cadastro"
            component={CadastroScreen}
            options={{
              tabBarIcon: ({ focused }) => <TabIcon emoji="📝" focused={focused} />,
            }}
          />
          <Tab.Screen
            name="Perfil"
            component={PerfilScreen}
            options={{
              tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
            }}
          />
          <Tab.Screen
            name="Dev"
            component={DevsScreen}
            options={{
              tabBarIcon: ({ focused }) => <TabIcon emoji="💻" focused={focused} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
