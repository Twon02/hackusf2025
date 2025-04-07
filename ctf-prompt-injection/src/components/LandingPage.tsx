import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to P.R.I.N!</Text>
        
        <View style={styles.section}>
          <Text style={styles.text}>
            P.R.I.N. is a simple application made to teach rudimentary prompt injection attacks. 
            In order to facilitate this function, this application provides basic technical, 
            instructional, and practical materials to work through.
          </Text>
          <Text style={styles.text}>
            As a user, you will be proceeding through a list of levels, shown in the left toggle pane. 
            To complete each individual level, you will be required to submit a 'flag'.
            The flag format is PRIN followed by curly braces.
            You will obtain this by exploiting an AI chatbot.
          </Text>
          <Text style={styles.text}>
            Good luck and happy hacking!!!
          </Text>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>Disclaimer:</Text>
          <Text style={styles.disclaimerText}>
            Do not actually attempt any of the attacks presented in the following material or sandboxes. 
            Unauthorized use of techniques on publicly available AI assistants is illegal. 
            The purpose of this application is to simply show how insecure these tools can be if 
            implemented incorrectly and potential ways to mitigate injection.
          </Text>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={onStart}>
          <Text style={styles.startButtonText}>Start Learning</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a73e8',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#202124',
    marginBottom: 15,
  },
  disclaimer: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 10,
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#856404',
  },
  startButton: {
    backgroundColor: '#1a73e8',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingPage; 