import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLOR, FONTFAMILY, WP} from '../util/Textutils';
import Feather from 'react-native-vector-icons/Feather';

interface FormInputProps {
  label: string;
  placeholder: string;
  onChangeText: () => void;
  password?: boolean;
  error:string;
  onFocus:()=>void;
  value:string
}
const FormInput = ({
  label,
  placeholder,
  onChangeText,
  password = false,
  error,
  onFocus,
  value
}: FormInputProps) => {
  const [eyeIcon, seteyeIcon] = React.useState<boolean>(false);
  return (
    <View style={styles.margin}>
      <Text style={styles.label}>{label}</Text>
      <View style={{flexDirection: 'row', width: 3000}}>
        <View>
          <TextInput
            placeholder={placeholder}
            style={styles.FormInput}
            onChangeText={onChangeText}
            secureTextEntry={password && !eyeIcon}
            onFocus={onFocus}
            value={value}
            
          
          />
          <Text style={styles.error}>{error}</Text>
        </View>
        <View>
          {password && (
            <TouchableOpacity style={styles.eye} onPress={() => seteyeIcon(!eyeIcon)}>
              {eyeIcon ? (
                <Feather name="eye" size={20} style={{opacity: 0.6}} />
              ) : (
                <Feather name="eye-off" size={20} style={{opacity: 0.6}} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  FormInput: {
    borderWidth: 0.8,
    borderRadius: 10,
    borderColor: COLOR.grey,
    backgroundColor: COLOR.grey,
    opacity: 0.5,
    color: 'black',
    width: WP(90),
    paddingLeft:20
  },
  label: {
    color: '#BEBEBE',
    fontFamily: FONTFAMILY.regular,
    padding:4
  },
  margin: {marginVertical: 10},
  eye: {marginLeft: -40, marginTop: 14},
  error:{
    color:"red",
    fontFamily:FONTFAMILY.regular,
  }
});
