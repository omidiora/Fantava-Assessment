import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/images/svgs/logo.svg';
import {COLOR, FONTFAMILY, HP, WP} from '../../util/Textutils';
import HeaderComponent from '../../component/HeaderComponent';
import ViewContainer from '../../component/ViewContainer';
import FormInput from '../../component/FormInput';
import {useVerifyOtpMutation} from '../../redux/AuthApi';
import Preloader from '../../util/Preloader';
import {useNavigation} from '@react-navigation/native';
import {setPassword} from '../../redux/AuthSlice';
import { useDispatch } from 'react-redux';

const OtpScreen = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [verifyOtp, {isLoading, error}] = useVerifyOtpMutation();
  const navigation = useNavigation();
  const dispatch=useDispatch()
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [editable, setEditable] = useState(true)

  const handleTextInputChange = (text: string) => {
  
    setTextInputValue(text);
    if (( text?.length==6)) {
      handleResendPress();
      verifyOtp(text)
        .unwrap()
        .then(response => {
          dispatch(setPassword(textInputValue))
          navigation.navigate('CreatePassword');
        })
        .catch(error => {
          console.log(error,'error')
          Alert.alert('Otp', error?.data?.message[0] || 'Invalid Code');
        });
    }
  };

  const handleResendPress = () => {
    if (!resendDisabled) {
      console.log('Resending OTP...');
      setResendDisabled(true);
      setTimer(30);

      const intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      setTimeout(() => {
        setResendDisabled(false);
        clearInterval(intervalId);
      }, 30000); // 30 seconds delay
    }
  };

  React.useEffect(() => {
    if (timer > 0 && resendDisabled) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timer, resendDisabled]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ViewContainer>
        <HeaderComponent />
        <View style={styles.content}>
          <Text style={styles.login}>Enter OTP Code</Text>
          <Text style={styles.email}>
            Enter the 6- digit code sent to your email address
          </Text>
          {isLoading ? (
            <Preloader />
          ) : (
            <>
              <View style={styles.form}>
                <TextInput
                  placeholder="******"
                  style={styles.textinput}
                  maxLength={6}
                  keyboardType="numeric"
                  onChangeText={handleTextInputChange}
                  editable={editable}
                />

                <View style={styles.checkBoxContainer}>
                  <TouchableOpacity>
                    <Ionicons name="checkbox" size={22} color={COLOR.green} />
                  </TouchableOpacity>
                  <Text style={styles.bySigin}>
                    By signing up, I confirm I accept the Terms of Use
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.resendContainer} disabled={resendDisabled} onPress={()=> handleTextInputChange()}>
                <Text style={styles.resend}>Resend({timer})</Text>
              </TouchableOpacity>
            </>
          )}
          {/*   
          <TouchableOpacity style={styles.proceedContainer}>
            <Text style={styles.proceed}>Proceed</Text>
          </TouchableOpacity> */}
        </View>
      </ViewContainer>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '90%',
    color: COLOR.black,
    opacity:0.6
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
    padding: HP(1.8),
    width: WP(85),
    marginTop: HP(5),
    borderRadius: 10,
  },
  proceed: {
    textAlign: 'center',
    color: COLOR.dark,
    fontFamily: FONTFAMILY.medium,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  bySigin: {
    marginLeft: 3,
    fontFamily: FONTFAMILY.medium,
    color: COLOR.primaryDark,
    fontSize: WP(3),
  },
  textinput: {
    borderWidth: 1,
    width: WP(40),
    letterSpacing: 10,
    backgroundColor: COLOR.white,
    fontSize: 22,
    // fontWeight:"bold",
    fontFamily: FONTFAMILY.bold,
    borderColor: COLOR.white,
    borderRadius: 10,
    height: HP(7.5),
    paddingLeft: 10,
  },
  resendContainer: {
    backgroundColor: COLOR.white,
    borderWidth: 1,
    width: WP(27),
    padding: 10,
    borderColor: COLOR.white,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: HP(22),
  },
  resend: {
    color: COLOR.green,
    fontFamily: FONTFAMILY.medium,
    // position:'absolute',
    // right:WP(10),
    // paddingTop:HP(24)
  },
});
