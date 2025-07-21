import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Slider } from 'react-native';
import Svg, { Line, Path } from 'react-native-svg'; // Importing Svg and Path from react-native-svg

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');
  const [weightRange, setWeightRange] = useState('');
  const [resultColor, setResultColor] = useState('#27AE60'); // Default is green for normal
  const [frequency, setFrequency] = useState(1); // Default frequency for sine wave

  const handleCalculate = () => {
    let weightValue = parseFloat(weight);
    let heightValue = parseFloat(height);

    // Check if inputs are valid numbers
    if (isNaN(weightValue) || weightValue <= 0) {
      alert('Please enter a valid positive number for weight.');
      return;
    }

    // Check if height is in centimeters or meters, and convert accordingly
    if (isNaN(heightValue) || heightValue <= 0) {
      alert('Please enter a valid positive number for height.');
      return;
    }

    // If height is greater than 3 meters, assume it's in centimeters
    if (heightValue > 3) {
      heightValue = heightValue / 100; // Convert cm to meters
    }

    // Calculate BMI
    const calculatedBmi = weightValue / (heightValue * heightValue);
    setBmi(calculatedBmi.toFixed(2));

    // BMI categories and setting result color
    let bmiCategory = '';
    let color = '#27AE60'; // Default color for normal weight

    if (calculatedBmi < 18.5) {
      bmiCategory = 'Underweight';
      color = '#E74C3C'; // Red for underweight
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
      bmiCategory = 'Normal weight';
      color = '#27AE60'; // Green for normal weight
    } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
      bmiCategory = 'Overweight';
      color = '#F39C12'; // Yellow for overweight
    } else {
      bmiCategory = 'Obesity';
      color = '#E74C3C'; // Red for obesity
    }

    setMessage(bmiCategory);
    setResultColor(color);

    // Calculate recommended weight range for normal BMI (18.5 - 24.9)
    const lowerWeight = 18.5 * heightValue * heightValue;
    const upperWeight = 24.9 * heightValue * heightValue;
    setWeightRange(`Recommended weight: ${lowerWeight.toFixed(1)}kg - ${upperWeight.toFixed(1)}kg`);
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>

      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        placeholder="Enter weight (kg)"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        placeholder="Enter height (cm or m)"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Calculate BMI</Text>
      </TouchableOpacity>

      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={[styles.result, { color: resultColor }]}>Your BMI: {bmi}</Text>
          <Text style={[styles.category, { color: resultColor }]}>Category: {message}</Text>
          <Text style={styles.recommendedWeight}>{weightRange}</Text>
        </View>
      )}
    
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f4f4f9',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: 200,
    height: 50,
    borderColor: '#BDC3C7',
    borderWidth: 1.5,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 18,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  button: {
    width: 200,
    height: 60,
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    padding:5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  result: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  category: {
    fontSize: 20,
    marginBottom: 15,
  },
  recommendedWeight: {
    fontSize: 18,
    color: '#7F8C8D',
    fontStyle: 'italic',
    margin:10,
    width:'100%'

  },
  graphContainer: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  graphTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  slider: {
    width: '80%',
    marginBottom: 30,
  },
});

export default BMICalculator;
