import React, { useState } from 'react';
import {TextInput, StyleSheet} from 'react-native';

const SearchComponent = (props) => {

    const [text, setText] = useState("");

    const handleText = (text) => {
        setText(text)
    }

    const handleSubmit = () => {
        if(!text) return;
        props.onSubmit(text);
        setText("")
    }

    const {initialValue, initialColor} = props;
   

    return (
       
        <TextInput 
                style = {styles.textInput}
                placeholder={initialValue}
                placeholderTextColor = {initialColor}
                onChangeText={handleText} 
                onSubmitEditing = {handleSubmit}
                value={text}                  
        />
    );
}

const styles = StyleSheet.create({

    textInput: {
    backgroundColor: '#666',
    alignSelf: 'center',
    height: 40,
    width: 230,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
    
  }

})

export default SearchComponent;

