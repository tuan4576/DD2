import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, BackHandler, ToastAndroid, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Svg, { Path } from 'react-native-svg';

import Feed from './hometabs/Feed';
import Notifications from './hometabs/Notifications';
import Profile from './hometabs/Profile';
import QR from './hometabs/QR';

import { GET_ALL, GET_IMG } from "../api/apiService"; 

const Tab = createBottomTabNavigator();

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 90; // Increased height
const CURVE_HEIGHT = 55;

const CustomTabBar = ({ state, descriptors, navigation }: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  const d = `
    M0 ${TAB_BAR_HEIGHT}
    L0 ${TAB_BAR_HEIGHT - CURVE_HEIGHT}
    Q${width / 2} ${TAB_BAR_HEIGHT - CURVE_HEIGHT * 2} ${width} ${TAB_BAR_HEIGHT - CURVE_HEIGHT}
    L${width} ${TAB_BAR_HEIGHT}
    Z
  `;

  return (
    <View style={styles.tabBarContainer}>
      <Svg width={width} height={TAB_BAR_HEIGHT}>
        <Path d={d} fill="white" />
      </Svg>
      <View style={styles.tabItemsContainer}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tabItem}
            >
              <View style={styles.iconContainer}>
                {options.tabBarIcon({ color: isFocused ? '#FF937B' : 'black', size: 24 })}
                {route.name === 'Notifications' && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>3</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.tabLabel, { color: isFocused ? '#FF937B' : 'black' }]}>{label}</Text>
              {isFocused && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const HomeScreen = ({navigation} : {navigation : any}) => {
  const backPressedOnce = useRef(false);
  const lastBackPressTime = useRef(0);


  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    const currentTime = new Date().getTime();
    
    if (currentTime - lastBackPressTime.current < 2000) {
      BackHandler.exitApp();
      return true;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      lastBackPressTime.current = currentTime;
      ToastAndroid.show('Nhấn back lần nữa để thoát', ToastAndroid.SHORT);
    }

    return true;
  };

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: '#FF937B',
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
        <Tab.Screen
          name="QR"
          component={QR}
          options={{
            tabBarLabel: 'Quét mã',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="qrcode-scan" size={size} color={color} />
            ),
          }}
        />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({ color, size }) => (
            <Feather name="bell" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}   

export default HomeScreen

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItemsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BAR_HEIGHT,
    alignItems: 'flex-end',
    paddingBottom: 15, // Increased padding at the bottom
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -5, // Moved the indicator down
    height: 3,
    width: '50%',
    backgroundColor: '#FF937B',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF937B',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
})
