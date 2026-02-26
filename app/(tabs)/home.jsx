import { Colors } from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { user } = useAuth();

  const handleNavigation = (route) => {
    if (route === '/(tabs)/journal' && !user) {
      router.push('/(auth)/login');
    } else {
      router.push(route);
    }
  };

  const features = [
    {
      id: 'guidance',
      title: 'Get Guidance',
      description: 'Wisdom for your situation',
      icon: 'compass-outline',
      route: '/(tabs)/guidance',
    },
    {
      id: 'themes',
      title: 'Explore Themes',
      description: 'Browse verses by topic',
      icon: 'grid-outline',
      route: '/(tabs)/ayats',
    },
    {
      id: 'journal',
      title: 'My Journal',
      description: 'Track your spiritual journey',
      icon: 'journal-outline',
      route: '/(tabs)/journal',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require("@/assets/images/icon.png")} 
              style={styles.logo} 
              resizeMode="contain"
            />
            <View>
              <Text style={[styles.greeting, { color: colors.text }]}>Welcome to</Text>
              <Text style={[styles.appName, { color: colors.tint }]}>Sirat Al Quran</Text>
            </View>
          </View>
        </View>

        <View style={[styles.hero, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="book" size={48} color={colors.tint} style={styles.heroIcon} />
          <Text style={[styles.heroTitle, { color: colors.text }]}>Daily Reflection</Text>
          <Text style={[styles.heroText, { color: colors.textMuted }]}>
            "Indeed, in the remembrance of Allah do hearts find rest."
          </Text>
          <Text style={[styles.heroRef, { color: colors.tint }]}>Surah Ar-Ra'd 13:28</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        
        <View style={styles.grid}>
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => handleNavigation(feature.route)}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.tint + '15' }]}>
                <Ionicons name={feature.icon} size={32} color={colors.tint} />
              </View>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{feature.title}</Text>
              <Text style={[styles.cardDesc, { color: colors.textMuted }]}>{feature.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
    marginTop: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '300',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    // marginTop: 5,
  },
  hero: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 30,
  },
  heroIcon: {
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  heroText: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 24,
  },
  heroRef: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: '47%', // Slightly less than 50% to account for gap
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});
