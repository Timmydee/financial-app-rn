import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import assetsObject from '../../constants/assets';
import { LOGIN, OTPSCREEN } from '../../constants/screenRoutes';
import BigBlueButton from './Components/BigBlueButton';
import Toast from 'react-native-toast-message';
import CustomLoadingComponent from '../../components/CustomLoadingComponent';
import {
  apiResponse,
  RegisterPayload,
} from '../../Helpers/Interfaces/apiResponse';
import { register } from '../../Helpers/Service/AuthService';
import { isEqual, isValidEmail } from '../../constants/commonHelpers';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [textinputBorder, setTextInputBorder] = useState('border-gray-400');
  const [isLoading, setIsLoading] = useState(false);

  const handleUsername = (val) => {
    setUsername(val);
  };
  const handleEmail = (val) => {
    setTextInputBorder('border-red-700');
    setEmail(val);
  };
  const handlePassword = (val) => {
    setPassword(val);
  };
  const handleConfirmPassword = (val) => {
    setConfirmPassword(val);
  };
  const GotoLogin = () => {
    navigation.navigate(LOGIN);
  };
  const GotoOTP = () => {
    navigation.navigate(OTPSCREEN, {
      emailAddress: Email,
    });
  };

  const handleRegister = () => {
    if (isValidEmail(Email) && isEqual(Password, ConfirmPassword)) {
    } else {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Email must be valid and passwords must match',
      });
    }
    try {
      setIsLoading(true);
      const payload: RegisterPayload = {
        email: Email,
        password: Password,
        firstName: firstname,
        lastName: lastname,
        phoneNumber: phoneNumber,
        userName: username,
      };
      register(payload)
        .then((res: apiResponse<string>) => {
          if (res.hasError) {
            setIsLoading(false);
            Toast.show({
              type: 'error',
              text1: 'Register Error',
              text2: res.message,
            });
          } else {
            setIsLoading(false);
            Toast.show({
              type: 'success',
              text1: 'Register Success',
              text2: res.message,
            });
            GotoOTP();
          }
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Register Error',
            text2: err.message,
          });
        });
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Register Error',
        text2: error.message,
      });
    }
  };
  const CheckValidation = () => {
    if (isValidEmail(Email)) {
      setTextInputBorder('border-gray-400');
    }
  };

  const handleSignUpWithGoogle = () => {
    Toast.show({
      type: 'info',
      text1: 'Coming Soon',
      text2: 'This feature is coming soon',
    });
  };
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView className='flex-1 mx-4 mt-10'>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            className='border border-gray-400 rounded-md p-2 w-[40px]'
          >
            <Ionicons name='chevron-back' size={24} color='black' />
          </Pressable>
          <View className='mt-5 space-y-5'>
            <Text className='text-accent text-2xl font-bold'>
              Hello! Register to get started
            </Text>
            <View className='space-y-4'>
              <TextInput
                onChangeText={(text) => {
                  handleUsername(text);
                }}
                value={username}
                placeholder='Username'
                className='text-sm border border-gray-400 h-[56px] pl-4 bg-inputBackground rounded-md'
              />
              <TextInput
                onChangeText={(text) => {
                  setFirstname(text);
                }}
                value={firstname}
                placeholder='First Name'
                className='text-sm border border-gray-400 h-[56px] pl-4 bg-inputBackground rounded-md'
              />
              <TextInput
                onChangeText={(text) => {
                  setLastname(text);
                }}
                value={lastname}
                placeholder='Last Name'
                className='text-sm border border-gray-400 h-[56px] pl-4 bg-inputBackground rounded-md'
              />
              <TextInput
                onChangeText={(text) => {
                  handleEmail(text);
                }}
                value={Email}
                onEndEditing={CheckValidation}
                placeholder='Email'
                className={`text-sm border ${textinputBorder} h-[56px] pl-4 bg-inputBackground rounded-md`}
              />
              <TextInput
                onChangeText={(text) => {
                  setPhoneNumber(text);
                }}
                value={phoneNumber}
                placeholder='Phone Number'
                className='text-sm border border-gray-400 h-[56px] pl-4 bg-inputBackground rounded-md'
              />
              <TextInput
                onChangeText={(text) => {
                  handlePassword(text);
                }}
                value={Password}
                placeholder='Password'
                className='text-sm border border-gray-400 h-[56px] pl-4 bg-inputBackground rounded-md'
                secureTextEntry={true}
              />
              <TextInput
                onChangeText={(text) => {
                  handleConfirmPassword(text);
                }}
                value={ConfirmPassword}
                placeholder='ConfirmPassword'
                className='text-sm border border-gray-400 h-[56px] pl-4 bg-inputBackground rounded-md'
                secureTextEntry={true}
              />
            </View>
            <View className='space-y-5'>
              <BigBlueButton action={handleRegister} buttonName='Register' />
              <View className='flex flex-row justify-around'>
                <Image source={assetsObject.line} className='w-[105px] mt-2' />
                <Text className='text-gray-900 text-center font-semibold'>
                  Or Register with
                </Text>
                <Image source={assetsObject.line} className='w-[105px] mt-2' />
              </View>
            </View>
            <View className='flex flex-row space-x-2'>
              <TouchableOpacity
                className='border border-gray-400 rounded-md p-2 flex flex-row justify-center items-center w-full space-x-2 h-12'
                onPress={handleSignUpWithGoogle}
              >
                <FontAwesome5 name='google' size={20} color='black' />
                <Text className='text-gray-900 text-center font-semibold'>
                  Register With Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className='flex flex-row w-full justify-center space-x-2 mt-4'>
            <Text className='font-normal text-base'>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={GotoLogin}>
              <Text className='font-semibold text-base text-accent'>
                Login Now
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      {isLoading ? <CustomLoadingComponent visible={isLoading} /> : null}
    </ScrollView>
  );
};

export default RegisterScreen;
