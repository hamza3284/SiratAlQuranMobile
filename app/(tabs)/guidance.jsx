import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Keyboard, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { getGuidance } from '@/services/classifier';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeChip from '@/components/ThemeChip';
import AyatCard from '@/components/AyatCard';
import { Ionicons } from '@expo/vector-icons';

export default function GuidanceScreen() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const presets = ['Anxiety', 'Gratitude', 'Patience', 'Loss', 'Anger', 'Hope'];

  const handleSearch = async (query) => {
    const searchText = query || text;
    if (!searchText.trim()) return;

    Keyboard.dismiss();
    setLoading(true);
    setResult(null);
    if (query) setText(query);

    try {
      const data = await getGuidance(searchText);
      setResult(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to get guidance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Seek Guidance</Text>
          <Text style={[styles.subtitle, { color: colors.icon }]}>
            Describe how you feel or what you are facing
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.card, 
              color: colors.text,
              borderColor: colors.border
            }]}
            placeholder="e.g., I feel overwhelmed by work..."
            placeholderTextColor={colors.icon}
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity 
            style={[styles.searchButton, { backgroundColor: colors.tint }]}
            onPress={() => handleSearch()}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.background} />
            ) : (
              <Ionicons name="search" size={24} color={colors.background} />
            )}
          </TouchableOpacity>
        </View>

        {!result && (
          <View style={styles.presets}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Common Topics</Text>
            <View style={styles.chipContainer}>
              {presets.map((preset) => (
                <ThemeChip 
                  key={preset} 
                  label={preset} 
                  onPress={() => handleSearch(preset)}
                />
              ))}
            </View>
          </View>
        )}

        {result && (
          <View style={styles.results}>
            {result.primary_ayat && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Primary Guidance</Text>
                <AyatCard ayat={result.primary_ayat} />
              </View>
            )}

            {result.supporting_ayats && result.supporting_ayats.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Supporting Verses</Text>
                {result.supporting_ayats.map((ayat) => (
                  <AyatCard key={ayat.id} ayat={ayat} />
                ))}
              </View>
            )}

            {result.themes && result.themes.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Related Themes</Text>
                <View style={styles.chipContainer}>
                  {result.themes.map((theme) => (
                    <ThemeChip 
                      key={theme.id}
                      label={theme.name}
                      onPress={() => router.push(`/ayat/theme/${theme.slug}`)}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    height: 60, 
    textAlignVertical: 'center',
  },
  searchButton: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  presets: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  results: {
    gap: 24,
  },
  section: {
    gap: 12,
  },
});
