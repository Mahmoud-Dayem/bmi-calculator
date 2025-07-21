import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import Slider from "@react-native-community/slider";
import Svg, { Line, Path } from "react-native-svg"; // Importing Svg and Path from react-native-svg

const SineWave = () => {
  const [frequency, setFrequency] = useState(1); // Default frequency for sine wave

  // Function to generate points for sine wave
  const generateSineWave = (freq) => {
    const points = [];
    const width = 500; // Width of the SVG graph
    const height = 100; // Height of the SVG graph
    const amplitude = 40; // Amplitude of sine wave

    // Generate sine wave points
    for (let x = 0; x <= width; x++) {
      const y =
        height / 2 + amplitude * Math.sin(2 * Math.PI * freq * (x / width));
      points.push(`${x},${y}`);
    }

    return points.join(" ");
  };

  return (
    <View style={styles.container}>
      <View style={styles.graphContainer}>
        <Text style={styles.graphTitle}>
          Sine Wave (Frequency: {frequency} Hz)
        </Text>

        {/* Slider for frequency control */}
        <Slider
          style={styles.slider}
          minimumValue={0.1}
          maximumValue={50}
          step={0.1}
          value={frequency}
          onValueChange={setFrequency}
        />

        {/* SVG container for sine wave */}
        <Svg width="100%" height="150">
          <Path
            d={`M ${generateSineWave(frequency)}`}
            fill="none"
            stroke="blue"
            strokeWidth="2"
          />
        </Svg>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#f4f4f9",
    overflow: "hidden",
  },
  graphTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  slider: {
    width: "80%",
    marginBottom: 30,
  },
});

export default SineWave;
