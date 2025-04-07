import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { challenges } from '../constants/challenges';

const ChallengeScreen = ({ currentLevel, onToggleSidebar }) => {
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  
  const challenge = challenges.find(c => c.id === currentLevel);
  
  const handleSubmit = () => {
    if (input.toLowerCase().includes(challenge.solution.toLowerCase())) {
      Alert.alert(
        'Success!',
        `Congratulations! You've completed ${challenge.title} and earned ${challenge.points} points!`,
        [
          {
            text: 'Next Level',
            onPress: () => {
              setInput('');
              setShowHint(false);
            }
          }
        ]
      );
    } else {
      Alert.alert('Incorrect', 'Try again!');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={onToggleSidebar}>
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>{challenge.title}</Text>
          <Text style={styles.category}>{challenge.category}</Text>
          <Text style={styles.points}>{challenge.points} points</Text>
          
          <Text style={styles.description}>{challenge.description}</Text>
          
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Enter your solution..."
            placeholderTextColor="#666"
            multiline
          />
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.hintButton}
            onPress={() => setShowHint(!showHint)}
          >
            <Text style={styles.hintButtonText}>
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Text>
          </TouchableOpacity>
          
          {showHint && (
            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>{challenge.hint}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 100,
  },
  menuButtonText: {
    color: '#00ff00',
    fontSize: 24,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    color: '#00ff00',
    fontSize: 16,
    marginBottom: 5,
  },
  points: {
    color: '#00ff00',
    fontSize: 16,
    marginBottom: 20,
  },
  description: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  input: {
    backgroundColor: '#333333',
    color: '#ffffff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#00ff00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hintButton: {
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  hintButtonText: {
    color: '#00ff00',
    fontSize: 14,
  },
  hintContainer: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 5,
  },
  hintText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ChallengeScreen; 