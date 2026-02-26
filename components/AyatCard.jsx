import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AyatCard({ ayat }) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.background, borderColor: colors.icon + '20' }]}
      onPress={() => router.push(`/ayat/${ayat.id}`)}
    >
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: colors.tint + '15' }]}>
          <Text style={[styles.badgeText, { color: colors.tint }]}>
            {ayat.surah}:{ayat.ayat}
          </Text>
        </View>
      </View>

      <Text style={[styles.arabic, { color: colors.text }]}>{ayat.text_ar}</Text>
      <Text style={[styles.translation, { color: colors.textMuted || colors.icon }]} numberOfLines={3}>
        {ayat.text_en}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  arabic: {
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 12,
    lineHeight: 40,
  },
  translation: {
    fontSize: 16,
    lineHeight: 24,
  },
});
