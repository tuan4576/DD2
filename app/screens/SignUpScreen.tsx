import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Animated, Dimensions, Alert, ScrollView, BackHandler, RefreshControl, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { REGISTER } from '../api/apiService';
import { CommonActions } from '@react-navigation/native';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Lỗi đăng ký:']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

const { width, height } = Dimensions.get('window');

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const backPressedOnce = useRef(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const emailSuggestions = ['gmail.com'];

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

    return () => {
      clearInterval(interval);
      backHandler.remove();
    };
  }, []);

  const handleBackPress = () => {
    if (backPressedOnce.current) {
      BackHandler.exitApp();
      return true;
    }

    backPressedOnce.current = true;
    Alert.alert('Thông báo', 'Nhấn back lần nữa để thoát ứng dụng');

    setTimeout(() => {
      backPressedOnce.current = false;
    }, 2000);

    return true;
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setMessage('Vui lòng điền đầy đủ thông tin');
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Mật khẩu không khớp');
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
      return;
    }
    
    try {
      const response = await REGISTER('register', { name, email, password, password_confirmation: confirmPassword });
      if (response && response.data) {
        setMessage('Đăng ký thành công');
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
          navigation.navigate('SignIn');
        }, 3000);
      } else {
        setMessage('Đăng ký không thành công. Vui lòng thử lại.');
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 3000);
      }
    } catch (error: any) {
      // console.error('Lỗi đăng ký:', error);
      if (error.response && error.response.status === 400) {
        setMessage('Email đã tồn tại. Vui lòng sử dụng email khác.');
      } else {
        setMessage('Đăng ký không thành công. Vui lòng thử lại.');
      }
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
    setIsVisible(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (text.endsWith('@')) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setEmail(email + suggestion);
    setShowSuggestions(false);
  };

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
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#d56b6b']}
              tintColor="#fff"
            />
          }
        >
          <Text style={styles.title}>Đăng Ký</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Họ và tên</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Nhập họ và tên của bạn"
                placeholderTextColor="#999"
                autoCapitalize="words"
                underlineColorAndroid="transparent"
                value={name}
                onChangeText={setName}
              />
              <Ionicons name="person-outline" size={20} color="#808080" style={styles.icon} />
            </View>
          </View>
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
                onChangeText={handleEmailChange}
              />
              <Ionicons name="mail-outline" size={20} color="#808080" style={styles.icon} />
            </View>
            {showSuggestions && (
              <FlatList
                data={emailSuggestions}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
                    <Text style={styles.suggestionText}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
                style={styles.suggestionList}
              />
            )}
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
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nhập lại mật khẩu</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Nhập lại mật khẩu của bạn"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirmPassword}
                underlineColorAndroid="transparent"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.icon}>
                <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#808080" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Đăng Ký</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>hoặc đăng ký bằng</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../asset/image/google.png')} style={styles.socialIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../asset/image/facebook.png')} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Bạn đã có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={[styles.signInText, styles.signInLink]}>Đăng nhập</Text>
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

export default SignUpScreen;
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
  scrollViewContent: {
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
  orText: {
    fontSize: 14,
    marginVertical: 15,
    color: '#fff',
    textAlign: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  socialButton: {
    marginHorizontal: 10,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  signInText: {
    fontSize: 14,
    color: '#fff',
  },
  signInLink: {
    color: '#808080',
    marginLeft: 5,
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
  suggestionList: {
    maxHeight: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    marginTop: 5,
  },
  suggestionText: {
    padding: 10,
    fontSize: 14,
    color: '#333',
  },
});
