import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function JournalEntryCard({ entry, onPress }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.background, borderColor: colors.icon + '20' }]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={[styles.date, { color: colors.icon }]}>
          {new Date(entry.created_at).toLocaleDateString()}
        </Text>
        {entry.ayat && (
          <View style={[styles.badge, { backgroundColor: colors.tint + '15' }]}>
            <Text style={[styles.badgeText, { color: colors.tint }]}>
              {entry.ayat.surah}:{entry.ayat.ayat}
            </Text>
          </View>
        )}
      </View>

      <Text style={[styles.content, { color: colors.text }]} numberOfLines={3}>
        {entry.reflection_text}
      </Text>
      
      {entry.ayat && (
        <Text style={[styles.context, { color: colors.icon }]} numberOfLines={1}>
          Re: {entry.ayat.text_en}
        </Text>
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  date: {
    fontSize: 12,
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
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  context: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
