import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ItemProductDetail from './screens/hometabs/Detail/ProductDetail';
import ProductDetails from './component/ProductDetails';
import ShoppingBag from './screens/hometabs/items/Cart/Cart';
import Checkout from './screens/hometabs/items/Cart/Checkout/Checkout';
import AddAdress from './component/AddAdress';
import OrderSuccess from './screens/hometabs/items/Cart/Checkout/Order/OrderSuccess';
import OrderDetails from './screens/hometabs/items/Cart/Checkout/Order/OrderDetails';
import ContactSupport from './component/ContactSupport';
import PrintProduct from './screens/hometabs/items/Cart/Checkout/Order/PrintProduct';
import User from './screens/hometabs/User/User';
import MyOrder from './screens/hometabs/items/Cart/Checkout/Order/MyOrder';
import Wishlist from './user/Wishlist';
import ShippingAddress from './user/ShippingAddress';
import PaymentMethod from './user/PaymentMethod';
import Setting from './screens/hometabs/User/Setting';
import Support from './user/Support';
import StoreMap from './user/StoreMap';
import Zoom from './screens/hometabs/component/Zoom';
import Test from './screens/hometabs/items/test';
import Tet from './screens/hometabs/User/test';
import Search from './screens/hometabs/items/Search/Search';
import Changepassword from './screens/hometabs/User/auth/Changepassword';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
      <NavigationContainer independent={true}>
        {/* <Stack.Navigator initialRouteName="Test"> */}
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignInScreen}  options={{headerShown:false}}/>
          <Stack.Screen name="Test" component={Test}  options={{headerShown:false}}/>
          <Stack.Screen name="Tet" component={Tet}  options={{headerShown:false}}/>
          <Stack.Screen name="SignUp" component={SignUpScreen}  options={{headerShown:false}}/> 
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
          <Stack.Screen name="Details" component={DetailsScreen}  options={{headerShown:false}}/>
          <Stack.Screen name="ItemProductDetail" component={ItemProductDetail} options={{headerShown:false}}/>
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
          <Stack.Screen name="Zoom" component={Zoom}  options={{headerShown:false}}/>
          <Stack.Screen name="Search" component={Search}  options={{headerShown:false}}/>
          <Stack.Screen name="Changepassword" component={Changepassword}  options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}

const App = () => {
  return (
    <AppNavigator />
  )
}

export default App
