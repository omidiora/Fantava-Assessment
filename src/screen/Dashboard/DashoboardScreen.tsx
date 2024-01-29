import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ViewContainer from '../../component/ViewContainer';
import { COLOR, HP } from '../../util/Textutils';
import { useNavigation } from '@react-navigation/native';

const DashoboardScreen = () => {
  const navigation=useNavigation();
  return (
    <ViewContainer>
      <View>
        
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton}>
              {/* <Text style={styles.closeButtonText}>Close</Text> */}
            </TouchableOpacity>
            {/* Your modal content goes here */}
            <Text style={styles.name}>Welcome to the dashboard!!!</Text>
            <Text style={styles.name}>My name is Omidiora Emmanuel and this is my subbmission to the assessment test!!!</Text>
            <Text style={styles.name}>Looking forward to hear from you.</Text>
            <View style={styles.sub}>
            <Text style={styles.bal}>The tools used are react-native ,typescript, redux, redux-toolkit, formik ,axios</Text>
            </View>
          </View>
         <TouchableOpacity style={styles.logout} onPress={()=>navigation.navigate("OnboardingScreen")}>
          <Text style={{color:COLOR.dark}}>LOGOUT</Text>
         </TouchableOpacity>
        </View>
      </View>
    </ViewContainer>
  );
};

export default DashoboardScreen;

const styles = StyleSheet.create({
 
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    height:300,
    
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    color: 'blue',
  },
  name:{
    color:COLOR.dark
  },
  sub:{
    marginTop:HP(4),
    // alignSelf:'center',
   
  },
  bal:{
    // fontSize:20,
    color:COLOR.dark
  },
  logout:{marginTop:HP(3)}
});
