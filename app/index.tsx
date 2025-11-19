import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppInitializer } from '@/utils/appInitializer';

export default function Index() {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [isReady, setIsReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize app (check auth, load data, etc.)
    const initializeApp = async () => {
      try {
        // Use AppInitializer for centralized initialization logic
        const result = await AppInitializer.initialize();

        if (!result.success) {
          setInitError(result.error?.message || 'Initialization failed');
          // Still navigate even if there's an error
          setTimeout(() => {
            router.replace('/(tabs)');
          }, 2000);
          return;
        }

        // Animate entrance
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
        ]).start();

        setIsReady(true);

        // Handle onboarding if needed
        if (result.shouldShowOnboarding) {
          // Navigate to onboarding screen
          // router.replace('/onboarding');
          // For now, just go to tabs
          setTimeout(() => {
            router.replace('/(tabs)');
          }, 500);
        } else {
          // Navigate to main app
          setTimeout(() => {
            router.replace('/(tabs)');
          }, 500);
        }
      } catch (error) {
        console.error('App initialization error:', error);
        setInitError('An unexpected error occurred');
        // Still navigate even if there's an error
        setTimeout(() => {
          router.replace('/(tabs)');
        }, 2000);
      }
    };

    initializeApp();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>FacultyFlow</Text>
          <View style={styles.logoUnderline} />
        </View>
        
        <Text style={styles.tagline}>Streamline Your Academic Journey</Text>

        {!isReady && !initError && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}

        {initError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{initError}</Text>
            <Text style={styles.errorSubtext}>Redirecting to app...</Text>
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#007AFF',
    letterSpacing: 1,
  },
  logoUnderline: {
    width: 60,
    height: 4,
    backgroundColor: '#007AFF',
    borderRadius: 2,
    marginTop: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
    marginBottom: 48,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: '#999999',
  },
  errorContainer: {
    marginTop: 32,
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
  },
});


