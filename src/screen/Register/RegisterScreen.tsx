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
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/images/svgs/logo.svg';
import {COLOR, FONTFAMILY, HP, WP} from '../../util/Textutils';
import HeaderComponent from '../../component/HeaderComponent';
import ViewContainer from '../../component/ViewContainer';
import FormInput from '../../component/FormInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {setEmail} from '../../redux/AuthSlice';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {EmailValidationSchema} from './validation';
import {useVerifyMutation} from '../../redux/AuthApi';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [verify, {isLoading, error}] = useVerifyMutation();
  const dispatch = useDispatch();

  const setEmailValue = () => {
    dispatch(setEmail(values?.email));
    Alert.alert(
      'Email Verification',
      'Your Email is verified successfully. check your email for the otp code.',
      [{text: 'OK', onPress: () =>  navigation.navigate('Otp')}],
    );
   
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
      email: '',
    },
    validationSchema: EmailValidationSchema,
    onSubmit: () => VerifyEmail(),
  });

  const VerifyEmail = () => {
    verify({
      email: values?.email,
    })
      .unwrap()
      .then(response => {
        console.log(response,'rlamldmalmdlfamldmflamlfma')
        setEmailValue();
      })
      .catch(error => {
        console.log('Error', error || 'Something Went Wrong');
      });
  };

  console.log(isLoading, 'error');
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <ViewContainer>
        <HeaderComponent />
        <View style={styles.content}>
          <Text style={styles.login}>Sign up</Text>
          <Text style={styles.email}>
            We will use this email address to authenticate logins to your
            account
          </Text>
          <View style={styles.form}>
            <FormInput
              label="Email Address"
              placeholder="Email Address"
              error={errors.email}
              onChangeText={handleChange('email')}
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

          <TouchableOpacity
            style={styles.proceedContainer}
            onPress={() => VerifyEmail()}>
          {isLoading ? <ActivityIndicator color={'white'}/> : <Text style={styles.proceed}>Proceed</Text>}
          </TouchableOpacity>
        </View>
      </ViewContainer>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;

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
});
