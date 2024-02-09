import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Animated, Easing} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './pages/HomeScreen';
import SettingsPage from './pages/SettingsScreen';
import SwapPage from './pages/SwapScreen';
import MessagesPage from './pages/MessagesScreen';
import TransactionsPage from './pages/TransactionsScreen';
import imageasset from './assets/icon.png';



function HomeScreen() {
  return (
    <HomePage></HomePage>
  );
}

function SettingsScreen() {
  return (
    <SettingsPage></SettingsPage>
  );
}

function SwapScreen() {
  return (
    <SwapPage></SwapPage>
  );
}

function TransactionsScreen() {
  return (
    <TransactionsPage></TransactionsPage>
  );
}

function MessagesScreen() {
  return (
    <MessagesPage></MessagesPage>
  );
}

function MyTabBar({ state, descriptors, navigation }) {

  spinValue = new Animated.Value(0);

  Animated.timing(
      this.spinValue,
      {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
          
      }
  ).start()

  const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
      
  })

  return (
    <View style={{ flexDirection: 'row', backgroundColor: "blue"}}>
      {state.routes.map((route, index) => {
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
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            
          <View style={styles.Button}>
          
            <View>
              {label=="Swap"&&<Animated.View 
              style={{transform: [{rotate: '45deg'},{rotate: spin}], width: 80, height: 80, backgroundColor: 'green', borderRadius: 20, }}
              source={imageasset}/>}
            </View>

            
                
              
              
            
            <Text style={{ color: isFocused ? '#673ab7' : '#222' , fontSize: 10}}>
              {label}
            </Text>
          
          </View></TouchableOpacity>
        );
      })}
    </View>
  );

  
}

const Tab = createBottomTabNavigator();



export default function App() {

  


  return (
    <NavigationContainer>
      
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Messages" component={MessagesPage} />
        <Tab.Screen name="Wallet" component={HomeScreen} />
        <Tab.Screen name="Swap" component={SwapPage} listeners={{tabPress: e=>{console.log("123")}}}/>
        <Tab.Screen name="Transactions" component={TransactionsPage} />
        <Tab.Screen name="Settings" component={SettingsPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
  
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: "red",
    height: Dimensions.get("window").width*0.18,
    width: Dimensions.get("window").width*0.18,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  }
});