import React from 'react';
import { TextInput } from 'react-native';

export default class SearchInput extends React.Component{
 constructor(props){
    super(props);
    this.state = {
      text: '',
    }  
  }
  handleText = (text) => {
    this.setState({text})
  }

  handleSubmit = () => {
    if(!this.state.text) return;

    this.props.onSubmit(this.state.text);

    this.setState({text: ''})
  }
 /* doAction = (newText) => {
     this.setState({text : newText})
  }
  doActionEnvoi = () => {

    if(!this.state.text) return;
    this.props.onSubmit(this.state.text);
    this.setState({text: ''})
  }*/
  
  render(){
    const {initialValue, initialColor} = this.props;
    const {text} = this.state;
      return (

         <TextInput 
                    style = {styles.textInput}
                    placeholder={initialValue}
                    placeholderTextColor = {initialColor}
                    onChangeText={this.handleText} 
                    onSubmitEditing = {this.handleSubmit}
                    value={text}                  
                  
                    
                    /*onChangeText = {this.doAction}
                    onSubmitEditing = {this.doActionEnvoi} */
          />
      );
  }
}

const styles = {

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
}