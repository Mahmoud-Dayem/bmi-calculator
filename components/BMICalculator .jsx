import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');


  const handleCalculate = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    if (isNaN(weightValue) || isNaN(heightValue) || weightValue <= 0 || heightValue <= 0) {
      alert('Please enter valid positive numbers for weight and height');
      return;
    }

    const calculatedBmi = weightValue / (heightValue * heightValue);
    setBmi(calculatedBmi.toFixed(2));

    // BMI categories
    if (calculatedBmi < 18.5) {
      setMessage('Underweight');
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
      setMessage('Normal weight');
    } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
      setMessage('Overweight');
    } else {
      setMessage('Obesity');
    }
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
        placeholder="Enter height (m)"
        keyboardType="numeric"
      />

      <Button title="Calculate BMI" onPress={handleCalculate} />

      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Your BMI: {bmi}</Text>
          <Text style={styles.category}>Category: {message}</Text>
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
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  category: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
});

export default BMICalculator;
