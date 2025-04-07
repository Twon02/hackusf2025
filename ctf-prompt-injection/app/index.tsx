import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Sidebar from '../src/components/Sidebar';
import ChallengeScreen from '../src/screens/ChallengeScreen';
import LandingPage from '../src/components/LandingPage';
import { challenges } from '../src/constants/challenges';

type Level = number;

export default function Home() {
  const router = useRouter();
  const [showLanding, setShowLanding] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<Level>(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const handleLandingComplete = () => {
    setShowLanding(false);
  };

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLevelComplete = (points: number) => {
    setTotalPoints(prevPoints => prevPoints + points);
  };

  const canUnlockNextLevel = (level: number) => {
    const challenge = challenges.find(c => c.id === level);
    return challenge ? totalPoints >= challenge.requiredPoints : false;
  };

  const handleNextLevel = () => {
    const nextLevel = currentLevel + 1;
    if (nextLevel <= challenges.length && canUnlockNextLevel(nextLevel)) {
      setCurrentLevel(nextLevel);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'P.R.I.N',
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#1a73e8',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      
      {showLanding ? (
        <LandingPage onStart={handleLandingComplete} />
      ) : (
        <>
          <View style={styles.header}>
            <View style={styles.levelContainer}>
              <Text style={styles.levelLabel}>Level</Text>
              <Text style={styles.levelNumber}>{currentLevel}</Text>
            </View>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsLabel}>Points</Text>
              <Text style={styles.pointsNumber}>{totalPoints}</Text>
            </View>
          </View>
          
          <ChallengeScreen
            currentLevel={currentLevel}
            onLevelComplete={handleLevelComplete}
            totalPoints={totalPoints}
          />
          
          <Sidebar
            isVisible={showSidebar}
            onClose={handleToggleSidebar}
            currentLevel={currentLevel}
          />
          
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, currentLevel === 0 && styles.disabledButton]}
              onPress={() => setCurrentLevel(prev => Math.max(0, prev - 1))}
              disabled={currentLevel === 0}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                (!canUnlockNextLevel(currentLevel + 1) || currentLevel === challenges.length - 1) && styles.disabledButton
              ]}
              onPress={handleNextLevel}
              disabled={!canUnlockNextLevel(currentLevel + 1) || currentLevel === challenges.length - 1}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  levelContainer: {
    alignItems: 'center',
  },
  pointsContainer: {
    alignItems: 'center',
  },
  levelLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },
  pointsLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },
  levelNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  pointsNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  button: {
    backgroundColor: '#1a73e8',
    padding: 12,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#e9ecef',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
