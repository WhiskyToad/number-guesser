import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/colors";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);
  const [totalGuess, setTotalGuess] = useState(1);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const startNewGame = () => {
    setSelectedNumber(undefined);
    setGameIsOver(false);
    setTotalGuess(1);
  };

  if (!fontsLoaded) return <AppLoading />;
  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {!selectedNumber && !gameIsOver && (
            <StartGameScreen setSelectedNumber={setSelectedNumber} />
          )}
          {selectedNumber && !gameIsOver && (
            <GameScreen
              selectedNumber={selectedNumber}
              setGameIsOver={setGameIsOver}
              setTotalGuess={setTotalGuess}
            />
          )}
          {gameIsOver && (
            <GameOverScreen
              selectedNumber={selectedNumber}
              totalGuess={totalGuess}
              startNewGame={startNewGame}
            />
          )}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
