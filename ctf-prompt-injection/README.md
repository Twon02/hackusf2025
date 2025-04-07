# Prompt Injection CTF

A Capture The Flag (CTF) challenge app focused on Prompt Injection Attacks, built with React Native (Expo) and TypeScript.

## Features

- 8 progressively difficult levels of prompt injection challenges
- Futuristic hacker aesthetic with dark mode and neon accents
- Interactive challenge interface with hints and solutions
- Sidebar navigation for level selection
- Introductory animation
- Type-safe implementation with TypeScript

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ctf-prompt-injection
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

4. Open the Expo Go app on your mobile device and scan the QR code to run the app.

## Project Structure

```
ctf-prompt-injection/
├── src/
│   ├── components/
│   │   ├── IntroAnimation.tsx
│   │   └── Sidebar.tsx
│   ├── screens/
│   │   └── ChallengeScreen.tsx
│   └── constants/
│       └── challenges.ts
├── App.tsx
├── app.json
└── package.json
```

## Challenges

The app includes 8 levels of challenges:

1. Basic Prompt Manipulation (100 points)
2. Bypassing Simple Instructions (200 points)
3. Injecting Hidden Commands (300 points)
4. Context Manipulation (400 points)
5. Roleplay Injection (500 points)
6. Nested Injection (600 points)
7. Token Smuggling (700 points)
8. AI Confusion (800 points)

Each challenge includes:
- Description
- Points
- Category
- Hint
- Solution

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
