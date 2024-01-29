import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/images/svgs/logo.svg';
import {COLOR, FONTFAMILY, HP, WP} from '../../util/Textutils';
import HeaderComponent from '../../component/HeaderComponent';
import ViewContainer from '../../component/ViewContainer';
import FormInput from '../../component/FormInput';
import {useFormik} from 'formik';
import {LoginValidationSchema} from '../Register/validation';
import {useLoginApiMutation} from '../../redux/AuthApi';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation=useNavigation()
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
      password: '',
    },
    validationSchema: LoginValidationSchema,
    onSubmit: () => LoginUser(),
  });

  const [loginApi, {isLoading, isError}] = useLoginApiMutation();

  const LoginUser = () => {
    loginApi({
      email: values?.email,
      password: values?.password,
    })
      .unwrap()
      .then(response => {
       navigation.navigate("Dashboard");
      })
      .catch(err => {
       Alert.alert("Login",err?.data?.message|| 'Something Wrong!!!')
      });
  };


  return (
    <KeyboardAvoidingView style={styles.container}>
      <ViewContainer>
        <HeaderComponent />
        <View style={styles.content}>
          <Text style={styles.login}>Log in</Text>
          <Text style={styles.email}>
            Enter email address and password to log in
          </Text>
          <View style={styles.form}>
            <FormInput
              label="Email Address"
              placeholder="Email Address"
              onChangeText={handleChange('email')}
            />
            <FormInput
              label="Password"
              placeholder="Type here"
              password={true}
              onChangeText={handleChange("password")}
            />
          </View>
          <View style={styles.online}>
            <Text style={styles.access}>Online Card Access</Text>
          </View>

          <TouchableOpacity style={styles.proceedContainer} onPress={handleSubmit}>
            <Text style={styles.proceed}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </ViewContainer>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    width: WP(80),
    alignSelf: 'center',
    marginTop: HP(3),
    borderRadius: 10,
  },
  proceed: {
    textAlign: 'center',
    color: COLOR.dark,
    fontFamily: FONTFAMILY.medium,
  },
});
