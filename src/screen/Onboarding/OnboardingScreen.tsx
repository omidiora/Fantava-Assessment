import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {BODY_IMAGE} from '../../util/imageUtils';
import Slider1 from '../../assets/images/svgs/onboarding1.svg';
import Slider2 from '../../assets/images/svgs/onboarding2.svg';
import Slider3 from '../../assets/images/svgs/onboarding3.svg';
import Header from '../../assets/images/svgs/header.svg';
import {COLOR, FONTFAMILY} from '../../util/Textutils';
import {useNavigation} from '@react-navigation/native';

const slides = [
  {
    key: 'one',
    title: 'Gift Cards',
    text: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    image: <Slider1 height={330} />,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Fast & Secure',
    text: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    image: <Slider2 height={330} />,
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'Easy to use',
    text: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    image: <Slider3 height={330} />,
    backgroundColor: '#22bcb5',
  },
];

const OnboardingScreen = () => {
  const [showRealApp, setShowRealApp] = useState(false);
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Text> {item.image}</Text>
        <View style={styles.section}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <TouchableOpacity
        style={styles.buttonCircle}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.skip}>{'Skip  >>'}</Text>
      </TouchableOpacity>
    );
  };

  const onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    setShowRealApp(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        activeDotStyle={styles.active}
        dotStyle={styles.dotStyle}
        nextLabel="Skip"
        renderNextButton={renderNextButton}
        renderDoneButton={renderNextButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 80,
    alignSelf: 'center',
    flex: 0.15,
  },
  section: {
    backgroundColor: COLOR.blue,
    flex: 2,
    width: '100%',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    color: COLOR.dark,
    // fontWeight:"bold",
    fontFamily: FONTFAMILY.bold,
    textAlign: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
  
    textAlign: 'center',
    fontFamily: FONTFAMILY.light,
    width: '90%',
    alignSelf: 'center',
    color: COLOR.black,
    opacity:0.6
  },
  active: {backgroundColor: COLOR.dark, marginTop: -150},
  dotStyle: {
    marginTop: -150,
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  skip: {
    color: COLOR.green,
    fontSize: 17,
    fontFamily: FONTFAMILY.regular,
  },
});

export default OnboardingScreen;
