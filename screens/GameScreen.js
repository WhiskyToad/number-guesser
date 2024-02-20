import { View, Text, StyleSheet, Alert } from "react-native";
import Title from "../components/ui/Title";
import { useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

const generateRandomNumber = (min, max, exclude) => {
  const randomNum = Math.floor(Math.random() * (max - min) + min);

  if (randomNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  }
  return randomNum;
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumber(1, 100, props.selectedNumber)
  );
  const [minBoundary, setMinBoundary] = useState(1);
  const [maxBoundary, setMaxBoundary] = useState(100);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.selectedNumber) ||
      (direction === "higher" && currentGuess > props.selectedNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      setMaxBoundary(currentGuess);
      const newGuess = generateRandomNumber(
        minBoundary,
        currentGuess,
        currentGuess
      );
      setCurrentGuess(newGuess);
    } else {
      setMinBoundary(currentGuess + 1);
      const newGuess = generateRandomNumber(
        currentGuess,
        maxBoundary,
        currentGuess
      );
      setCurrentGuess(newGuess);
    }
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          <PrimaryButton onPress={() => nextGuessHandler("lower")}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={() => nextGuessHandler("higher")}>
            +
          </PrimaryButton>
        </View>
      </View>
      <View></View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});
