import React, { useLayoutEffect } from "react";
import {KeyboardAvoidingView,View,Text, TextInput, ScrollView, Image} from 'react-native'
import styles from '../../../styles/mainStyle';

export default function EditProfile(props){
    useLayoutEffect(()=>{
        props.hideTabBar(true)
        return () => {
            props.hideTabBar(false);
        }
    },[])
    return(
        <KeyboardAvoidingView enabled keyboardVerticalOffset={10} behavior="padding">
        <ScrollView>
            <View style={{flexDirection:'column',justifyContent:'center',alignContent:'center',alignItems:'center',flexWrap:'wrap',marginTop:30,marginBottom:20}}>
                <View style={{flex:1}}>
                    <Image source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}} style={[styles.coim,{width:95,height:95,borderRadius:95/2}]} />
                </View>
            </View>
            
            <View style={[styles.fl1,styles.pdlt10,styles.pdrt10,styles.mgtp20]}>
                <View style={[styles.fl1,styles.mgbt20]}>
                    <Text style={[[styles.f18,styles.pdbt10]]}>Account Name</Text>
                    <TextInput 
                        placeholder="Full Name"
                        style={[{width:'100%',height:40,backgroundColor:'#d9deea90'},styles.pdlt10,styles.f14]} 
                    />
                </View>    
                <View style={[styles.fl1,styles.mgbt20]}>
                    <Text style={[[styles.f18,styles.pdbt10]]}>Email</Text>
                    <TextInput 
                        placeholder="Email"
                        style={[{width:'100%',height:40,backgroundColor:'#d9deea90'},styles.pdlt10,styles.f14]} 
                    />
                </View>
                <View style={[styles.fl1,styles.mgbt20]}>
                    <Text style={[[styles.f18,styles.pdbt10]]}>Address</Text>
                    <TextInput 
                        multiline={true}
                        placeholder={"Shipping Address"}
                        style={[{width:'100%',height:100,backgroundColor:'#d9deea90'},styles.pdlt10,styles.f14]} 
                    />
                </View>
            </View>
            
        </ScrollView>
        </KeyboardAvoidingView>
    )
}