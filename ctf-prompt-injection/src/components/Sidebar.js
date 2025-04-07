import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { challenges } from '../constants/challenges';

const Sidebar = ({ isVisible, onClose, onSelectLevel, currentLevel }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.sidebar}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Levels</Text>
        
        {challenges.map((challenge) => (
          <TouchableOpacity
            key={challenge.id}
            style={[
              styles.levelButton,
              currentLevel === challenge.id && styles.activeLevel,
              challenge.locked && styles.lockedLevel
            ]}
            onPress={() => !challenge.locked && onSelectLevel(challenge.id)}
            disabled={challenge.locked}
          >
            <Text style={styles.levelText}>
              {challenge.title}
              {challenge.locked && ' 🔒'}
            </Text>
            <Text style={styles.pointsText}>{challenge.points} pts</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 1000,
  },
  content: {
    padding: 20,
    paddingTop: 50,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    color: '#00ff00',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  levelButton: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeLevel: {
    backgroundColor: '#003300',
    borderColor: '#00ff00',
    borderWidth: 1,
  },
  lockedLevel: {
    opacity: 0.5,
  },
  levelText: {
    color: '#ffffff',
    fontSize: 16,
  },
  pointsText: {
    color: '#00ff00',
    fontSize: 14,
  },
});

export default Sidebar; 