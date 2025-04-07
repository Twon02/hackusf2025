import React, { useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet, StatusBar, ScrollView } from 'react-native';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        onComplete();
      });
    }, 8000); // Increased duration to allow reading the introduction

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#ffffff" 
        translucent={true}
      />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>P.R.I.N</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.introText}>
            {`Hello! Welcome to P.R.I.N!

P.R.I.N is a simple application made to teach rudimentary prompt injection attacks. In order to facilitate this function, this application provides basic technical, instructional, and practical materials to work through.

As a user, you will be proceeding through a list of levels, shown in the left toggle pane. To complete each individual level, you will be required to submit a 'flag,' (format: PRIN{...}) obtained by exploiting an AI chatbot.

Good luck and happy hacking!!!

Disclaimer:
Do not actually attempt any of the attacks presented in the following material or sandboxes. Unauthorized use of techniques on publicly available AI assistants is illegal. The purpose of this application is to simply show how insecure these tools can be if implemented incorrectly and potential ways to mitigate injection.`}
          </Text>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1a73e8',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  scrollView: {
    flex: 1,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#202124',
    textAlign: 'justify',
  },
  disclaimerTitle: {
    fontWeight: 'bold',
    color: '#d93025',
  },
});

export default IntroAnimation; 