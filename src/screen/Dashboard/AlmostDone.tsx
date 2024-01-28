import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    KeyboardAvoidingView,
  } from 'react-native';
  import React ,{useState,useRef}from 'react';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import Logo from '../../assets/images/svgs/logo.svg';
  import {COLOR, FONTFAMILY, HP, WP} from '../../util/Textutils';
  import HeaderComponent from '../../component/HeaderComponent';
  import ViewContainer from '../../component/ViewContainer';
  import FormInput from '../../component/FormInput';
  import PhoneInput from "react-native-phone-number-input";
  
  
  const AlmostDone = () => {
    const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
    return (
     <KeyboardAvoidingView style={styles.container}>
       <ViewContainer>
        <HeaderComponent />
        <View style={styles.content}>
          <Text style={styles.login}>Almost done</Text>
          <Text style={styles.email}>
          We will use this email address to authenticate logins to your account
          </Text>
          <View style={styles.form}>
          <PhoneInput
          containerStyle={{height:HP(9), backgroundColor:COLOR.grey, opacity:0.2}}
            ref={phoneInput}
            defaultValue={value}
            defaultCode="NG"
            layout="second"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            // withShadow
            autoFocus
          />
            
           
          </View>
          
  
          <TouchableOpacity style={styles.proceedContainer}>
            <Text style={styles.proceed}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </ViewContainer>
     </KeyboardAvoidingView>
    );
  };
  
  export default AlmostDone;
  
  const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    login: {
      fontSize: WP(5),
      fontFamily: FONTFAMILY.bold,
      color: COLOR.dark,
    },
    content: {
      paddingTop: HP(5),
      paddingLeft: WP(2),
    },
    email: {
      fontSize: WP(4),
      fontFamily: FONTFAMILY.medium,
      paddingTop: HP(1.2),
      width:'80%'
    },

    form: {
      paddingTop: HP(3),
    },
    online: {
      marginTop: HP(30),
    },
    access: {
      textAlign: 'center',
      color: COLOR.dark,
      fontFamily: 'Lexend-Bold',
    },
    proceedContainer: {
      backgroundColor: COLOR.green,
      padding:HP(1.8),
      width:WP(85),
      marginTop:HP(5),
      borderRadius:10,
    },
    proceed: {
      textAlign: 'center',
      color:COLOR.dark,
      fontFamily:FONTFAMILY.medium
    },
    checkBoxContainer:{
        flexDirection:'row',
        paddingTop:10
       
    },
    bySigin:{
        marginLeft:3,
        fontFamily:FONTFAMILY.medium,
        color:COLOR.primaryDark,
        fontSize:WP(3)
    }
  });
  