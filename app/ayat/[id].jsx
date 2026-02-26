import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { getAyat } from '@/services/ayats';
import { saveJournalEntry } from '@/services/journal';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/context/AuthContext';

export default function AyatDetailScreen() {
  const { id } = useLocalSearchParams();
  const [ayat, setAyat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reflection, setReflection] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      loadAyat();
    }
  }, [id]);

  const loadAyat = async () => {
    try {
      const { data } = await getAyat(id);
      setAyat(data);
      if (data.user_reflection) {
        setReflection(data.user_reflection);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load ayat details');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReflection = async () => {
    if (!user) {
      Alert.alert(
        'Login Required',
        'Please login to save your reflection',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Login',
            onPress: () => router.push('/(auth)/login'),
          },
        ]
      );
      return;
    }

    if (!reflection.trim()) {
      Alert.alert('Error', 'Please enter your reflection');
      return;
    }

    setSaving(true);
    try {
      await saveJournalEntry(ayat.id, reflection);
      Alert.alert('Success', 'Reflection saved to journal');
      setReflection('');
      router.push('/(tabs)/journal');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save reflection');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  if (!ayat) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Ayat not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ title: `Surah ${ayat.surah}:${ayat.ayat}` }} />
      
      <View style={[styles.card, { backgroundColor: colors.background, borderColor: colors.icon + '20' }]}>
        <View style={styles.header}>
          <Text style={[styles.ref, { color: colors.tint, backgroundColor: colors.tint + '10' }]}>
            {ayat.surah}:{ayat.ayat}
          </Text>
        </View>

        <Text style={[styles.arabic, { color: colors.text }]}>{ayat.text_ar}</Text>
        <Text style={[styles.translation, { color: colors.text }]}>{ayat.text_en}</Text>

        {ayat.explanation && (
          <View style={[styles.explanation, { borderTopColor: colors.icon + '20' }]}>
            <Text style={[styles.explanationTitle, { color: colors.icon }]}>Explanation</Text>
            <Text style={[styles.explanationText, { color: colors.icon }]}>{ayat.explanation}</Text>
          </View>
        )}
      </View>

      <View style={styles.reflectionSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>My Reflection</Text>
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.background, borderColor: colors.icon + '40' }]}
          multiline
          placeholder="Write your reflection here..."
          placeholderTextColor={colors.icon}
          value={reflection}
          onChangeText={setReflection}
          numberOfLines={6}
          textAlignVertical="top"
        />
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.tint }, saving && styles.disabled]} 
          onPress={handleSaveReflection}
          disabled={saving}
        >
          <Text style={styles.buttonText}>{saving ? 'Saving...' : 'Save to Journal'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  ref: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  arabic: {
    fontSize: 28,
    textAlign: 'right',
    marginBottom: 20,
    lineHeight: 50,
    fontFamily: 'System', 
  },
  translation: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 20,
  },
  explanation: {
    borderTopWidth: 1,
    paddingTop: 15,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  reflectionSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 150,
    marginBottom: 15,
    borderWidth: 1,
  },
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
