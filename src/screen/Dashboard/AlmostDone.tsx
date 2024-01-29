import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/images/svgs/logo.svg';
import {COLOR, FONTFAMILY, HP, WP} from '../../util/Textutils';
import HeaderComponent from '../../component/HeaderComponent';
import ViewContainer from '../../component/ViewContainer';
import FormInput from '../../component/FormInput';
import PhoneInput from 'react-native-phone-number-input';
import {RootState} from '../../redux/store';
import {useSelector} from 'react-redux';
import {useRegisterApiMutation} from '../../redux/AuthApi';
import { useNavigation } from '@react-navigation/native';
import { PhoneValidationSchema } from '../Register/validation';
import { useFormik } from 'formik';

const AlmostDone = () => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const registerDetails = useSelector(
    (state: RootState) => state?.auth,
  );
  const [registerApi, {isLoading, error}] = useRegisterApiMutation();

  const navigation=useNavigation()

  console.log(registerDetails, 'adad');

  const Registration = () => {
    registerApi({
      firstName:'adadfa',
      lastName:'adfa',
      dateOfBirth: registerDetails?.details?.dob,
      email: registerDetails?.value,
      state: registerDetails?.details?.state,
      password: registerDetails?.password,
      phoneNumber: values?.phone,
      bvn:  registerDetails?.details?.bvn,
      address:registerDetails?.details?.address,
    })
      .unwrap()
      .then(response => {
        Alert.alert('Registration', 'Registration is successfully', [
          {text: 'OK', onPress: () => navigation.navigate("Dashboard")},
        ]);
    
      })
      .catch(err => {
       Alert.alert("Registration", "Something Went wrong with your details. kindly check and retry")
      });
  };

  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    setFieldError,
    handleChange,
  } = useFormik({
    initialValues: {
      phone: '',
    },
    validationSchema: PhoneValidationSchema,
    onSubmit: () =>  Registration(),
  });



  console.log(values,'value')

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ViewContainer>
        <HeaderComponent />
        <View style={styles.content}>
          <Text style={styles.login}>Almost done</Text>
          <Text style={styles.email}>
            We will use this email address to authenticate logins to your
            account
          </Text>
          <View style={styles.form}>
            <PhoneInput
              containerStyle={{
                height: HP(9),
                backgroundColor: COLOR.grey,
                opacity: 0.2,
              }}
              ref={phoneInput}
              defaultValue={value}
              defaultCode="NG"
              layout="second"
              onChangeText={handleChange("phone")}
              onChangeFormattedText={text => {
                setFormattedValue(text);
              }}
              withDarkTheme
              // withShadow
              autoFocus
            />
            <Text style={styles.phone}>{errors.phone}</Text>
          </View>

          <TouchableOpacity
          disabled={isLoading}
            style={styles.proceedContainer}
            onPress={handleSubmit}>
          {isLoading?   <ActivityIndicator color="white"/> : <Text style={styles.proceed}>Proceed</Text>}
          </TouchableOpacity>
        </View>
      </ViewContainer>
    </KeyboardAvoidingView>
  );
};

export default AlmostDone;

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
    width: '80%',
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
  phone:{
    color:"red",
    fontFamily:FONTFAMILY.regular
  }
});
