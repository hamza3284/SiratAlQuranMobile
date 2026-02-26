import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "../../constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import api from "@/services/api";

export default function Profile() {
  const { user, logout } = useAuth();
  const [profileUser, setProfileUser] = useState(user);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const refreshProfile = async () => {
    try {
      const { data } = await api.get('/user');
      setProfileUser(data);
    } catch (e) {
      console.error('Failed to refresh profile:', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        refreshProfile();
      }
    }, [user])
  );

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await logout();
              router.replace("/(tabs)/home");
            } catch (error) {
              console.error("Logout failed:", error);
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  const showComingSoon = (feature) => {
    Alert.alert('Coming Soon', `${feature} will be available in a future update.`);
  };

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={styles.centerContent}>
          <View style={[styles.iconContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="person-outline" size={60} color={colors.icon} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Guest User</Text>
          <Text style={[styles.subtitle, { color: colors.icon }]}>
            Sign in to access your journal and save your reflections.
          </Text>
          
          <TouchableOpacity 
            style={[styles.loginButton, { backgroundColor: colors.tint }]}
            onPress={handleLogin}
          >
            <Text style={[styles.loginButtonText, { color: colors.background }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Use profileUser for display to show updated counts, fallback to user from context
  const displayUser = profileUser || user;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={[styles.avatarContainer, { borderColor: colors.tint }]}>
            <Text style={[styles.avatarText, { color: colors.tint }]}>
              {displayUser.name ? displayUser.name.charAt(0).toUpperCase() : "U"}
            </Text>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>{displayUser.name}</Text>
          <Text style={[styles.userEmail, { color: colors.icon }]}>{displayUser.email}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statNumber, { color: colors.tint }]}>{displayUser.journal_entries_count || 0}</Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>Journal Entries</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statNumber, { color: colors.tint }]}>{displayUser.saved_ayats_count || 0}</Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>Saved Ayats</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={[styles.menuItem, { borderBottomColor: colors.border }]}
            onPress={() => showComingSoon('Settings')}
          >
            <Ionicons name="settings-outline" size={24} color={colors.text} />
            <Text style={[styles.menuText, { color: colors.text }]}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.menuItem, { borderBottomColor: colors.border }]}
            onPress={() => showComingSoon('Notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            <Text style={[styles.menuText, { color: colors.text }]}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.menuItem, { borderBottomColor: colors.border }]}
            onPress={() => showComingSoon('Help & Support')}
          >
            <Ionicons name="help-circle-outline" size={24} color={colors.text} />
            <Text style={[styles.menuText, { color: colors.text }]}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.logoutButton, { borderColor: colors.border }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={[styles.versionText, { color: colors.icon }]}>Version 1.0.0</Text>
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  loginButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 12,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  logoutText: {
    color: '#EF4444',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
  },
});
