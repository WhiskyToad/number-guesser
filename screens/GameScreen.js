import { View, Text, StyleSheet, Alert } from "react-native";
import Title from "../components/ui/Title";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

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

  useEffect(() => {
    if (currentGuess == props.selectedNumber) {
      props.setGameIsOver(true);
    }
  }, [currentGuess, props.selectedNumber, props.setGameIsOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess <= props.selectedNumber) ||
      (direction === "higher" && currentGuess >= props.selectedNumber)
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
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              -
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("higher")}>
              +
            </PrimaryButton>
          </View>
        </View>
      </Card>
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
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
