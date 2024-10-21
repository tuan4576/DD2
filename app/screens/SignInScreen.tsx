import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Animated, Dimensions, Alert, ScrollView, BackHandler, RefreshControl, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN } from '../api/apiService';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Lỗi đăng nhập:']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('window');

const SignInScreen = ({ navigation }: { navigation: any }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const backPressedOnce = useRef(false);
  const [refreshing, setRefreshing] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const images = [
    require('../asset/image/Man.png'),
    require('../asset/image/Man2.png')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        slideAnim.setValue(0);
      });
    }, 5000);

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Load saved credentials if they exist
    loadSavedCredentials();

    return () => {
      clearInterval(interval);
      backHandler.remove();
    };
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('savedEmail');
      const savedPassword = await AsyncStorage.getItem('savedPassword');
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.error('Error loading saved credentials:', error);
    }
  };

  const handleBackPress = () => {
    if (backPressedOnce.current) {
      BackHandler.exitApp();
      return true;
    }

    backPressedOnce.current = true;
    Alert.alert('Thông báo', 'Bạn có muốn thoát ứng dụng?', [
      {
        text: 'Hủy',
        onPress: () => {
          backPressedOnce.current = false;
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => BackHandler.exitApp(),
      },
    ]);

    setTimeout(() => {
      backPressedOnce.current = false;
    }, 2000);

    return true;
  };

  const handleBiometricAuth = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert('Thông báo', 'Thiết bị của bạn không hỗ trợ xác thực sinh trắc học');
      return;
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      Alert.alert('Thông báo', 'Vui lòng thiết lập xác thực sinh trắc học trên thiết bị của bạn');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Xác thực để đăng nhập',
      cancelLabel: 'Hủy',
      disableDeviceFallback: true,
    });

    if (result.success) {
      navigateToHome();
    } else {
      Alert.alert('Thông báo', 'Xác thực không thành công. Vui lòng thử lại.');
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setMessage('Vui lòng điền đầy đủ thông tin');
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
      return;
    }
    
    try {
      const response = await LOGIN('login', { email, password });
      if (response && response.data) {
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
        
        if (response.data.user && response.data.user.photo) {
          await AsyncStorage.setItem('userAvatar', response.data.user.photo);
        }
        
        if (rememberMe) {
          await AsyncStorage.setItem('savedEmail', email);
          await AsyncStorage.setItem('savedPassword', password);
        } else {
          await AsyncStorage.removeItem('savedEmail');
          await AsyncStorage.removeItem('savedPassword');
        }
        
        navigateToHome();
      } else {
        setMessage('Sai thông tin đăng nhập. Vui lòng kiểm tra lại.');
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 3000);
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      setMessage('Bạn đã nhập sai thông tin. Vui lòng nhập lại.');
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
    }
  };

  const navigateToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setEmail('');
    setPassword('');
    setMessage('');
    setIsVisible(false);
    setRememberMe(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={[StyleSheet.absoluteFillObject, { overflow: 'hidden' }]}>
          {images.map((image, index) => (
            <Animated.Image
              key={index}
              source={image}
              style={[
                styles.backgroundImage,
                { 
                  position: 'absolute', 
                  top: 0, 
                  transform: [
                    { translateX: index === currentImageIndex ? slideAnim : (index === (currentImageIndex + 1) % images.length ? Animated.add(slideAnim, width) : width) }
                  ],
                }
              ]}
            />
          ))}
        </View>
        <View style={styles.overlay} />
        <ScrollView 
          contentContainerStyle={styles.loginContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#ab4d4d']}
              tintColor={'#fff'}
            />
          }
        >
          <Text style={styles.title}>Đăng Nhập</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Nhập email của bạn"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                value={email}
                onChangeText={setEmail}
              />
              <Ionicons name="mail-outline" size={20} color="#808080" style={styles.icon} />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mật khẩu</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu của bạn"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                underlineColorAndroid="transparent"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#808080" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rememberMeContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setRememberMe(!rememberMe)}
            >
              {rememberMe && <Ionicons name="checkmark" size={18} color="#fff" />}
            </TouchableOpacity>
            <Text style={styles.rememberMeText}>Ghi nhớ đăng nhập</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Đăng Nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => {}}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>hoặc đăng nhập bằng</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../asset/image/google.png')} style={styles.socialIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../asset/image/facebook.png')} style={styles.socialIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={handleBiometricAuth}>
              <Ionicons name="finger-print-outline" size={24} color="#808080" />
            </TouchableOpacity>
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Bạn chưa có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={[styles.signUpText, styles.signUpLink]}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {isVisible && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6dafce',
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  loginContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#fff',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    borderWidth: 0,
    color: '#fff',
  },
  icon: {
    padding: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberMeText: {
    color: '#fff',
    fontSize: 14,
  },
  button: {
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 14,
  },
  orText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    fontSize: 14,
    color: '#fff',
  },
  signUpLink: {
    marginLeft: 5,
    color: '#808080',
    fontWeight: 'bold',
  },
  messageContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  messageText: {
    color: '#fff',
    textAlign: 'center',
  },
});
