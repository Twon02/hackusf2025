import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import IntroAnimation from './src/components/IntroAnimation';
import Sidebar from './src/components/Sidebar';
import ChallengeScreen from './src/screens/ChallengeScreen';

type Level = number;

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<Level>(1);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSelectLevel = (level: Level) => {
    setCurrentLevel(level);
    setShowSidebar(false);
  };

  return (
    <View style={styles.container}>
      {showIntro ? (
        <IntroAnimation onComplete={handleIntroComplete} />
      ) : (
        <>
          <ChallengeScreen
            currentLevel={currentLevel}
            onToggleSidebar={handleToggleSidebar}
          />
          <Sidebar
            isVisible={showSidebar}
            onClose={handleToggleSidebar}
            onSelectLevel={handleSelectLevel}
            currentLevel={currentLevel}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
}); 