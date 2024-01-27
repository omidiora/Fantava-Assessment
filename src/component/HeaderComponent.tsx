import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../assets/images/svgs/logo.svg';
import {COLOR} from '../util/Textutils';

const HeaderComponent = () => {
  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor={COLOR.blue}
        barStyle={'dark-content'}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <View style={styles.row}>
        <Ionicons name="arrow-back" size={32} color={COLOR.dark} />
        <Logo />
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
