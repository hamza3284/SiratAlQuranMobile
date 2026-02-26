import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { getThemeAyats } from '@/services/themes';
import { Colors } from '@/constants/colors';
import { useColorScheme } from 'react-native';
import AyatCard from '@/components/AyatCard';

export default function ThemeAyatsScreen() {
  const { slug } = useLocalSearchParams();
  const [ayats, setAyats] = useState([]);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    if (slug) {
      loadAyats();
    }
  }, [slug]);

  const loadAyats = async () => {
    try {
      const { data } = await getThemeAyats(slug);
      setAyats(data.ayats || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  const formatTitle = (str) => {
    if (!str) return 'Theme Ayats';
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen 
        options={{ 
          title: formatTitle(slug),
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerBackTitle: 'Themes',
        }} 
      />
      <FlatList
        data={ayats}
        renderItem={({ item }) => <AyatCard ayat={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
    gap: 16,
  },
});
