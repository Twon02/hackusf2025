import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { challenges } from '../constants/challenges';

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
  currentLevel: number;
  onSelectLevel?: (level: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose, currentLevel, onSelectLevel }) => {
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Levels</Text>
      </View>

      <View style={styles.levelsContainer}>
        {challenges.map((challenge) => (
          <TouchableOpacity
            key={challenge.id}
            style={[
              styles.levelButton,
              currentLevel === challenge.id && styles.activeLevel,
            ]}
            onPress={() => {
              if (onSelectLevel) {
                onSelectLevel(challenge.id);
              }
            }}
          >
            <Text
              style={[
                styles.levelText,
                currentLevel === challenge.id && styles.activeLevelText,
              ]}
            >
              Level {challenge.id}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#dadce0',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dadce0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#202124',
  },
  levelsContainer: {
    padding: 20,
  },
  levelButton: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  activeLevel: {
    backgroundColor: '#1a73e8',
  },
  levelText: {
    fontSize: 16,
    color: '#202124',
  },
  activeLevelText: {
    color: '#ffffff',
  },
});

export default Sidebar; 