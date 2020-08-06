import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
import {  createAppContainer  } from 'react-navigation';
import { createBottomTabNavigator} from 'react-navigation-tabs';
import BookTransactions from './screens/BookTransactions.js';
import SearchScreen from './screens/SearchScreen.js';
export default class  App extends React.Component {
  render(){
  return (
    <Appcontainer />
  );
  }}
const TabNavigator = createBottomTabNavigator({
  Transaction:{screen:BookTransactions},
  Search:{screen:SearchScreen}
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon:()=>{
      const routeName = navigation.state.routeName;
      if (routeName === "Transaction"){
     return (
       <Image 
       source = {require("./assets/book.png")}
       style = {{width:40,height:40}}
       />
     )
      }
     else if (routeName === "Search"){
      return (
        <Image 
        source = {require("./assets/searchingbook.png")}
        style = {{width:40,height:40}}
        />
      )
       }


    }
  })
}
);


const Appcontainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
