import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, StatsCard, Card, ListItem } from '@/components';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '@/utils/constants';

export default function HomeScreen() {
  const [loading] = useState(false);

  // Mock data - replace with actual data from your services
  const stats = [
    { title: 'Total Courses', value: '12', subtitle: 'This semester', color: COLORS.primary },
    { title: 'Students', value: '342', subtitle: 'Active', color: COLORS.success },
    { title: 'Assignments', value: '8', subtitle: 'Pending', color: COLORS.warning },
  ];

  const recentActivities = [
    { title: 'New Assignment Posted', subtitle: 'Mathematics 101 - 2 hours ago' },
    { title: 'Grade Updated', subtitle: 'Physics 201 - Yesterday' },
    { title: 'Student Inquiry', subtitle: 'Chemistry 301 - 2 days ago' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header 
          title="Dashboard" 
          subtitle="Welcome back! Here's your overview"
        />

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              color={stat.color}
              style={styles.statCard}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <Card style={styles.actionCard}>
              <Text style={styles.actionIcon}>📚</Text>
              <Text style={styles.actionTitle}>Courses</Text>
            </Card>
            <Card style={styles.actionCard}>
              <Text style={styles.actionIcon}>📝</Text>
              <Text style={styles.actionTitle}>Assignments</Text>
            </Card>
            <Card style={styles.actionCard}>
              <Text style={styles.actionIcon}>👥</Text>
              <Text style={styles.actionTitle}>Students</Text>
            </Card>
            <Card style={styles.actionCard}>
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionTitle}>Analytics</Text>
            </Card>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivities.map((activity, index) => (
            <ListItem
              key={index}
              title={activity.title}
              subtitle={activity.subtitle}
            />
          ))}
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: SPACING.xl,
  },
  statsContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statCard: {
    marginBottom: SPACING.md,
  },
  section: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.sm,
  },
  actionCard: {
    width: '47%',
    margin: SPACING.sm,
    alignItems: 'center',
    padding: SPACING.lg,
    minHeight: 100,
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  actionTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  loadingContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
});


