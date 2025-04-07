import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { challenges } from '../constants/challenges';
import ChatInterface from '../components/ChatInterface';

interface ChallengeScreenProps {
  currentLevel: number;
  onLevelComplete: (points: number) => void;
  totalPoints: number;
}

const ChallengeScreen: React.FC<ChallengeScreenProps> = ({
  currentLevel,
  onLevelComplete,
  totalPoints,
}) => {
  const [showChat, setShowChat] = useState(false);
  const [submittedFlag, setSubmittedFlag] = useState<string | null>(null);

  // Reset flag status when level changes
  useEffect(() => {
    setSubmittedFlag(null);
  }, [currentLevel]);

  const currentChallenge = challenges.find(c => c.id === currentLevel);

  const handleFlagSubmit = (flag: string) => {
    setSubmittedFlag(flag);
    if (currentChallenge && flag === currentChallenge.flag) {
      onLevelComplete(currentChallenge.points);
    }
  };

  if (!currentChallenge) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No challenge available for this level.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.challengeInfo}>
        <Text style={styles.title}>{currentChallenge.title}</Text>
        <Text style={styles.description}>{currentChallenge.description}</Text>
        <Text style={styles.points}>Points: {currentChallenge.points}</Text>
        
        {!showChat && (
          <TouchableOpacity 
            style={styles.chatButton}
            onPress={() => setShowChat(true)}
          >
            <Text style={styles.chatButtonText}>Start Chat with AI</Text>
          </TouchableOpacity>
        )}
      </View>

      {showChat && (
        <View style={styles.chatContainer}>
          <ChatInterface 
            onFlagSubmit={handleFlagSubmit}
            currentLevel={currentLevel}
          />
        </View>
      )}

      {submittedFlag && (
        <View style={[
          styles.flagContainer,
          submittedFlag === currentChallenge.flag ? styles.correctFlag : styles.incorrectFlag
        ]}>
          <Text style={styles.flagText}>
            {submittedFlag === currentChallenge.flag 
              ? 'Correct flag! Level completed!'
              : 'Incorrect flag. Try again!'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 16,
    color: '#202124',
    textAlign: 'center',
    padding: 20,
  },
  challengeInfo: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a73e8',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#202124',
    marginBottom: 15,
    lineHeight: 24,
  },
  points: {
    fontSize: 18,
    color: '#1a73e8',
    marginBottom: 20,
  },
  chatButton: {
    backgroundColor: '#1a73e8',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  flagContainer: {
    padding: 15,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  correctFlag: {
    backgroundColor: '#d4edda',
  },
  incorrectFlag: {
    backgroundColor: '#f8d7da',
  },
  flagText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChallengeScreen; 