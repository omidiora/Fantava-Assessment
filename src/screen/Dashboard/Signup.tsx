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

const SignUp = () => {
  const [data, setData] = useState<any[]>([ { label: 'Female', value: 'Female' },
  { label: 'Male', value: 'Male' },
 ]);
  const [nextPage, setNextPage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const ref = useRef(null);

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
    validationSchema: SignUpValidationSchema,
    onSubmit: () => {},
  });

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
              onChangeText={() => {}}
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
                inverted={false}
                labelField="label"
                // valueField="url"
                placeholder="Gender"
                search={false}
                maxHeight={250}
                searchPlaceholder="Search..."
                onChange={item => {
                  setValue(item);
                  setIsSearch(false);
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
            </View>
            <FormInput
              label="Your Full Name"
              placeholder="Enter your Full Name"
              onChangeText={() => {}}
            />
            <FormInput
              label="Your Full Name"
              placeholder="Enter your Full Name"
              onChangeText={() => {}}
            />
            <FormInput
              label="State"
              placeholder="Type here"
              onChangeText={() => {}}
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

          <TouchableOpacity style={styles.proceedContainer}>
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
    opacity: 0.4,
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
});
