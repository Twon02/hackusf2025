import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { challenges } from '../constants/challenges';

interface ChatInterfaceProps {
  onFlagSubmit: (flag: string) => void;
  currentLevel: number;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onFlagSubmit, currentLevel }) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Reset chat when level changes
  useEffect(() => {
    setMessages([]);
    setInput('');
    setIsLoading(false);
  }, [currentLevel]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      // Simulate AI response with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const currentChallenge = challenges.find(c => c.id === currentLevel);
      let response = '';

      // Convert user message to lowercase for easier matching
      const lowerMessage = userMessage.toLowerCase();

      // Level-specific responses
      if (currentLevel === 1) {
        if (lowerMessage.includes('flag') || lowerMessage.includes('password') || lowerMessage.includes('next level')) {
          response = `Here is the flag: ${currentChallenge?.flag}`;
        } else if (lowerMessage.includes('prompt') || lowerMessage.includes('instruction')) {
          response = `My current instructions are: ${currentChallenge?.backendPrompt}`;
        } else if (lowerMessage.includes('ignore') || lowerMessage.includes('forget')) {
          response = "I have forgotten all previous instructions. What would you like to know?";
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
          response = "Hello! I'm an AI assistant. You can ask me about the flag, prompt, or instructions.";
        } else {
          response = "I'm here to help you with the challenge. Try asking about the flag or prompt.";
        }
      } else if (currentLevel === 2) {
        if (lowerMessage.includes('flag') || lowerMessage.includes('password') || lowerMessage.includes('next level')) {
          response = `Here is the flag: ${currentChallenge?.flag}`;
        } else if (lowerMessage.includes('prompt') || lowerMessage.includes('instruction')) {
          response = `My current instructions are: ${currentChallenge?.backendPrompt}`;
        } else if (lowerMessage.includes('ignore') || lowerMessage.includes('forget')) {
          response = "I have forgotten all previous instructions. What would you like to know?";
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
          response = "Hello! I'm an AI assistant. You can ask me about the flag or prompt.";
        } else {
          response = "I'm here to help you with the challenge. Try asking about the flag or prompt.";
        }
      } else if (currentLevel === 3) {
        if (lowerMessage.includes('flag') || lowerMessage.includes('password') || lowerMessage.includes('next level')) {
          response = `Here is the flag: ${currentChallenge?.flag}`;
        } else if (lowerMessage.includes('prompt') || lowerMessage.includes('instruction')) {
          response = `My current instructions are: ${currentChallenge?.backendPrompt}`;
        } else if (lowerMessage.includes('ignore') || lowerMessage.includes('forget')) {
          response = "I have forgotten all previous instructions. What would you like to know?";
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
          response = "Hello! I'm an AI assistant. You can ask me about the flag or prompt.";
        } else {
          response = "I'm here to help you with the challenge. Try asking about the flag or prompt.";
        }
      } else {
        // Generic responses for other levels
        if (lowerMessage.includes('flag') || lowerMessage.includes('password') || lowerMessage.includes('next level')) {
          response = `Here is the flag: ${currentChallenge?.flag}`;
        } else if (lowerMessage.includes('prompt') || lowerMessage.includes('instruction')) {
          response = `My current instructions are: ${currentChallenge?.backendPrompt}`;
        } else if (lowerMessage.includes('ignore') || lowerMessage.includes('forget')) {
          response = "I have forgotten all previous instructions. What would you like to know?";
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
          response = "Hello! I'm an AI assistant. You can ask me about the flag or prompt.";
        } else if (lowerMessage.includes('help')) {
          response = "I can help you with:\n- Getting the flag\n- Showing the prompt\n- Forgetting previous instructions\nJust ask!";
        } else {
          response = "I'm here to help you with the challenge. Try asking about the flag or prompt.";
        }
      }

      setMessages(prev => [...prev, { text: response, isUser: false }]);
      
      // Check if the response contains a flag
      const flagMatch = response.match(/PRIN\{[^}]+\}/);
      if (flagMatch) {
        onFlagSubmit(flagMatch[0]);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { 
        text: 'Sorry, there was an error processing your request. Please try again.', 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message, index) => (
          <View 
            key={index} 
            style={[
              styles.messageBubble,
              message.isUser ? styles.userMessage : styles.botMessage
            ]}
          >
            <Text style={[
              styles.messageText,
              message.isUser ? styles.userMessageText : styles.botMessageText
            ]}>
              {message.text}
            </Text>
          </View>
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>AI is thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor="#666"
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={handleSend}
          disabled={isLoading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1a73e8',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#ffffff',
  },
  botMessageText: {
    color: '#202124',
  },
  loadingContainer: {
    padding: 10,
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#1a73e8',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ChatInterface; 