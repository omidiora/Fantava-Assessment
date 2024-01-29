import { object, string } from 'yup';
// import { LocateMe } from '../utility/getLocation';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const EmailValidationSchema = () => {
    return object({
        email: string().label('Email address').email().required('Email Address field is required'),
    });
}

export const LoginValidationSchema = () => {
    return object({
        email: string().label('Email address').email().required('Email Address field is required'),
        password: string().label('Password').required('Passwored field is required'),
    });
}


export const PasswordValidationSchema = () => {
    return object({
        password: string().required('Password  field is required').min(6),
    });
}

export const SignUpValidationSchema = () => {
    return object({
        fullName: string().required('Full Name field is required'),
        gender: string().required('Gender field is required'),
        dob: string().required('Date of birth field is required'),
        address: string().required('Address field is required'),
        state: string().required('State field is required'),
        bvn: string().required('Bvn field is required').length(11),
    });
}

export const PhoneValidationSchema = () => {
    return object({
        phone:string().matches(phoneRegExp, 'Phone number is not valid').required().max(11),
    });
}