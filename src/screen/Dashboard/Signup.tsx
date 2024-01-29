import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/images/svgs/logo.svg';
import {COLOR, FONTFAMILY, HP, WP} from '../../util/Textutils';
import HeaderComponent from '../../component/HeaderComponent';
import ViewContainer from '../../component/ViewContainer';
import FormInput from '../../component/FormInput';
import {Dropdown} from 'react-native-element-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFormik} from 'formik';
import {SignUpValidationSchema} from '../Register/validation';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {setDetails} from '../../redux/AuthSlice';
import {RootState} from '../../redux/store';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const [data, setData] = useState<any[]>([
    {label: '', value: ''},
    {label: 'Female', value: 'Female'},
    {label: 'Male', value: 'Male'},
  ]);
  const [value, setValue] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const ref = useRef(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    setFieldError,
    handleChange,
  } = useFormik({
    initialValues: {
      fullName: '',
      gender: '',
      dob: '',
      address: '',
      state: '',
      bvn:""
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: () => SignUpDetails(),
  });

  const originalDate = new Date(date);

  const SignUpDetails = () => {
    dispatch(
      setDetails({
        fullName: values.fullName,
        gender: values?.gender,
        dob: originalDate.toISOString().slice(0, 10),
        address: values.address,
        state: values.state,
        bvn:values.bvn
      }),
    );
    navigation.navigate('AlmostDone');
  };

  // Format the date to "YYYY-MM-DD"
  const formattedDate = originalDate.toISOString().slice(0, 10);
  console.log(values, 'flamdlamldm');
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 130}}>
      <ViewContainer>
        <HeaderComponent />
        <View style={styles.content}>
          <Text style={styles.login}>Let’s get to know you</Text>
          <Text style={styles.email}>
            Please fill in the details as it appears on your official documents
            or means of identification
          </Text>
          <View style={styles.form}>
            <FormInput
              label="Your Full Name"
              placeholder="Enter your Full Name"
              onChangeText={handleChange('fullName')}
              error={errors.fullName}
            />
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Gender</Text>
              <Dropdown
                ref={ref}
                style={styles.dropdown}
                containerStyle={styles.container}
                backgroundColor={'white'}
                data={data}
                value={value}
                labelField="label"
                 valueField="value"
                placeholder="Gender"
                maxHeight={250}
                onChange={item => {
                  setValue(item);
                  // handleChange(item.value);
                  setIsSearch(false);
                  setFieldValue('gender', item.value);
                }}
                onChangeText={keyword => {
                  setIsSearch(keyword.length > 0);
                }}
                // flatListProps={{
                //   ListEmptyComponent: <RenderEmpty />,
                //   ListFooterComponent: <RenderFooter isLoading={isLoading} />,
                //   refreshControl: (
                //     <RefreshControl refreshing={false} onRefresh={onRefresh} />
                //   ),
                //   onEndReachedThreshold: 0.5,
                //   onEndReached: onLoadMore,
                // }}
                // renderLeftIcon={() => (
                //   <AntDesign style={styles.icon} name="dribbble" size={20} />
                // )}
              />
              <Text style={styles.gender}>{errors.gender}</Text>
            </View>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <View>
                <FormInput
                  label="Date of birth"
                  placeholder="dd/mm/yyyy"
                  onFocus={() => setOpen(true)}
                  onChangeText={() => setOpen(true)}
                  value={formattedDate}
                />
                <Text style={styles.dob}>{errors.dob}</Text>
              </View>
            </TouchableOpacity>
            <DatePicker
              modal
              open={open}
              mode="date"
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                setFieldValue('dob', date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <FormInput
              label="Home Address"
              placeholder="Type here"
              onChangeText={handleChange('address')}
              error={errors.address}
            />
            <FormInput
              label="State"
              placeholder="Type here"
              error={errors.state}
              onChangeText={handleChange('state')}
            />

            <FormInput
              label="Bvn"
              placeholder="Type here"
              error={errors.state}
              onChangeText={handleChange('bvn')}
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
            onPress={() => handleSubmit()}>
            <Text style={styles.proceed}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </ViewContainer>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

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
  dropdown: {
    backgroundColor: COLOR.grey,
    // margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: -5,
    width: WP(90),
    opacity: 0.7,
  },
  icon: {
    marginRight: 5,
  },

  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  footerContainer: {
    padding: 16,
    alignItems: 'center',
  },
  label: {
    color: '#BEBEBE',
    fontFamily: FONTFAMILY.regular,
    marginTop: 10,
  },
  dropdownContainer: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  gender: {
    color: 'red',
    fontFamily: FONTFAMILY.regular,
  },
  dob: {
    color: 'red',
    fontFamily: FONTFAMILY.regular,
    marginTop: HP(-3),
  },
});
