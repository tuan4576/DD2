import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

import ProductDetails from './component/ProductDetails';
import ShoppingBag from './component/ShoppingBag';
import Checkout from './component/Checkout';
import AddAdress from './component/AddAdress';
import OrderSuccess from './component/OrderSuccess';
import OrderDetails from './component/OrderDetails';
import ContactSupport from './component/ContactSupport';
import PrintProduct from './component/PrintProduct';
import User from './user/User';
import MyOrder from './user/MyOrder';
import Wishlist from './user/Wishlist';
import ShippingAddress from './user/ShippingAddress';
import PaymentMethod from './user/PaymentMethod';
import Setting from './user/Setting';
import Support from './user/Support';
import StoreMap from './user/StoreMap';
const Stack = createNativeStackNavigator();
const index = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen}  options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}  options={{headerShown:false}}/> 
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="Details" component={DetailsScreen}  options={{headerShown:false}}/>
        <Stack.Screen name="ProductDetails" component={ProductDetails}  options={{headerShown:false}}/>
        <Stack.Screen name="ShoppingBag" component={ShoppingBag}  options={{headerShown:false}}/>
        <Stack.Screen name="Checkout" component={Checkout}  options={{headerShown:false}}/>
        <Stack.Screen name="AddAdress" component={AddAdress}  options={{headerShown:false}}/>
        <Stack.Screen name="OrderSuccess" component={OrderSuccess}  options={{headerShown:false}}/>
        <Stack.Screen name="OrderDetails" component={OrderDetails}  options={{headerShown:false}}/>
        <Stack.Screen name="ContactSupport" component={ContactSupport}  options={{headerShown:false}}/>
        <Stack.Screen name="PrintProduct" component={PrintProduct}  options={{headerShown:false}}/>
        <Stack.Screen name="User" component={User}  options={{headerShown:false}}/>
        <Stack.Screen name="MyOrder" component={MyOrder}  options={{headerShown:false}}/>
        <Stack.Screen name="Wishlist" component={Wishlist}  options={{headerShown:false}}/>
        <Stack.Screen name="ShippingAddress" component={ShippingAddress}  options={{headerShown:false}}/>
        <Stack.Screen name="PaymentMethod" component={PaymentMethod}  options={{headerShown:false}}/>
        <Stack.Screen name="Setting" component={Setting}  options={{headerShown:false}}/>
        <Stack.Screen name="Support" component={Support}  options={{headerShown:false}}/>
        <Stack.Screen name="StoreMap" component={StoreMap}  options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default index
