import { useState } from 'react';
import { getAuth, signInAnonymously } from "firebase/auth";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

import { StyleSheet, View, Text, TouchableOpacity, Alert, ImageBackground, TextInput } from "react-native"

//imports image into background 
const image = require('../assets/background-image.png')

const backgroundColors = {
  a: '#090C08',
  b: '#474056',
  c: '#8A95A5',
  d: '#B9C6AE'
}

const Start = ({ navigation }) => {
  const auth = getAuth();
  const signInUser = () => {
    signInAnonymously(auth)
      //get result from promise with temp user data
      .then((result) => {
        if (result.user.uid) {
          navigation.navigate("Chat", { userID: result.user.uid, name: name, color: color });
          Alert.alert("Signed in Successfully!");
        } else {
          Alert.alert("Something went wrong, try again!");
        }
      })
      .catch((error) => {
        Alert.alert("We could not sign you in. Try again later");
      });
  };

  const [name, setName] = useState('');
  const [color, setColor] = useState(backgroundColors);


  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.image}
        accessible={true}
        accessibilityLabel="Background Image"
        accessibilityRole="image"
      >
        <Text
          style={styles.title}
          accessibilityRole="header"
        >
          START TALK'N
        </Text>
        <View
          style={styles.inputContainer}
        >

          {/* Input field for user's nickname */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type username here'
            placeholderTextColor={'#8A95A5'}
            accessible={true}
            accessibilityLabel="Name input field"
            accessibilityHint="Enter your name here."

          />

          {/* Background color selection buttons */}
          <Text
            style={styles.colorSelectorText}
            accessible={true}
            accessibilityLabel="Background selection"
            accessibilityRole="menu"
          >
            Choose Background Color
          </Text>
          <View style={styles.colorSelectorContainer}>
            <TouchableOpacity
              style={[
                styles.circles,
                color === backgroundColors.a && styles.selectedCircle,
                { backgroundColor: backgroundColors.a },
              ]}
              onPress={() => setColor(backgroundColors.a)}
              accessible={true}
              accessibilityLabel="Color1"
              accessibilityRole="menuitem"
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.circles,
                color === backgroundColors.b && styles.selectedCircle,
                { backgroundColor: backgroundColors.b },
              ]}
              onPress={() => setColor(backgroundColors.b)}
              accessible={true}
              accessibilityLabel="Color2"
              accessibilityRole="menuitem"
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.circles,
                color === backgroundColors.c && styles.selectedCircle,
                { backgroundColor: backgroundColors.c },
              ]}
              onPress={() => setColor(backgroundColors.c)}
              accessible={true}
              accessibilityLabel="Color3"
              accessibilityRole="menuitem"
            ></TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.circles,
                color === backgroundColors.d && styles.selectedCircle,
                { backgroundColor: backgroundColors.d },
              ]}
              onPress={() => setColor(backgroundColors.d)}
              accessible={true}
              accessibilityLabel="Color4"
              accessibilityRole="menuitem"
            ></TouchableOpacity>
          </View>
          {/* Navigate to chat button */}
          <TouchableOpacity style={styles.button}
            onPress={signInUser}
            accessible={true}
            accessibilityLabel="Start Chatting Button"
            accessibilityHint="Navigates to chat screen"
            accessibilityRole='button'
          >
            <Text
              style={styles.buttonText}
            > Let's go chat! </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    padding: '12%',
    alignSelf: 'center',
    borderRadius: 10
  },
  title: {
    flex: 2,
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    padding: '12%',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    textAlign: 'center',
    padding: 3,
    borderWidth: 1.5,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,

  },

  circles: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  selectedCircle: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  colorSelectorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  colorSelectorText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    padding: 2,

  },
  button: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#757083',
    borderRadius: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default Start;