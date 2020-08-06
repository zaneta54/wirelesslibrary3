import React, { Component } from 'react';
import { Text, View, StyleSheet, Button,Image} from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
export default class TransactionScreen extends React.Component{
    constructor(){
    super();
    this.state = {
        hasCameraPermissions:null,
        scanned:false,
        scannedData:'',
        scannedBookId:'',
        scannedStudentId:'',
        buttonState:'normal'
    }
    }
    getCameraPermissions = async(id)=>{
 const {status}= await Permissions.askAsync(Permissions.CAMERA)
 this.setState({
     hasCameraPermissions:status==='granted',
     buttonState:id,
     scanned:false
 });
    }
    handleBarCodeScanned= async({type,data})=>{
        const {buttonState} = this.state
        if (buttonState==="BookId"){
            this.setState ({
                scanned:true,
                scannedBookId:data,
                buttonState:'normal'
            });
        }
        else if (buttonState==="StudentId"){
            this.setState ({
                scanned:true,
                scannedStudentId:data,
                buttonState:'normal'
            });
        }

    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if (buttonState !=="normal"&&hasCameraPermissions){
return(<BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />);
        }

        else if (buttonState==="normal"){
     return(
        <View style = {styles.container}    > 
        <View >
        <Image 
        source = {require("./assets/booklogo.png")}
        style = {{width:40,height:40}}
        />
<Text  style = {{textAlign:'center',fontSize:30}}>
Wily 
</Text>
        </View><View>
        <TextInput  style = {styles.inputBox}
        placeholder = "Book Id"
        value = {this.state.scannedBookId}/>
        
        
        <TouchableOpacity  onPress  =  {()=>{this.getCameraPermissions ("BookId")}
        } style = {styles.scanbutton}     >     
        <Text style = {styles.buttontext}   > scan QR code   </Text>
           </TouchableOpacity>
        
        
         
        
         
           </View><View>
  <TextInput  style = {styles.inputBox}
         placeholder = "Student Id"
         value = {this.state.scannedStudentId}/>
         
         
         <TouchableOpacity  onPress  =  {()=>{this.getCameraPermissions ("StudentId")}
         } style = {styles.scanbutton}     >     
         <Text style = {styles.buttontext}   > scan QR code   </Text>
            </TouchableOpacity>
</View>

     );
        }
    }
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
 displayText:{ fontSize: 15, textDecorationLine: 'underline' }, 
 scanButton:{ backgroundColor: '#2196F3', padding: 10, margin: 10 }, 
 buttonText:{ fontSize: 20, } ,
 inputView:{ flexDirection: 'row', margin: 20 }, 
 inputBox:{ width: 200, height: 40, 
    borderWidth: 1.5,
     borderRightWidth: 0, 
     fontSize: 20 }, 
     scanButton:{ backgroundColor: '#66BB6A', 
     width: 50, 
     borderWidth: 1.5, 
     borderLeftWidth: 0 }});
