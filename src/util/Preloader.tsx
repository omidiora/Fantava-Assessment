import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
//   useEffect(() => {
//     setInterval(() => {
//       setVisible(!visible);
//     }, 1000);
//   }, []);

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
        <AnimatedLoader
      visible={visible}
      overlayColor="rgba(255,255,255,0.75)"
      animationStyle={styles.lottie}
      speed={1}>
      <Text>Loading......</Text>
    </AnimatedLoader>
    </View>
  );
}
const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});