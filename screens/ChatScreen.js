import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Content, List, ListItem, Badge, Icon, Form, Textarea, Button, Text } from 'native-base';
import { v4 as uuidv4 } from 'uuid';

import GLOBAL from '../components/Global.js';

export default class ChatScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShowNewMsg : false,
      list : undefined
    }
  }

  componentDidMount(){
    console.info('comp did mount');
    if(!this.state.list){
      this.createList();
    }
    this.props.navigation.addListener('willFocus', (route) => {
      console.info('tab focused');
      this.createList();
    });
  }

  showNewMsg = () => {
    this.setState({
      isShowNewMsg : true
    });
    const mongoDB = GLOBAL.mongoDB;
  }

  submit = async () => {
    const mongoDB = GLOBAL.mongoDB;
    const msgObj = {
      id : uuidv4(),
      owner : GLOBAL.userProfile.id,
      msg : this.state.message,
      timestamp: Date.now()

    }
    const ret = await mongoDB.push('messages',GLOBAL.location[0].name,{'message':msgObj});
    console.info(ret);
  }

  createList = async () => {
    console.info('creating list');
    const mongoDB = GLOBAL.mongoDB;
    const ret = await mongoDB.get('messages',GLOBAL.location[0].name,{
      id:0,
      message:{$slice:2}
    });
    let list = [];
    for(let i = 0; i < ret[0].message.length; i++) {
      list.push(<ListItem key={i}><Text>{ret[0].message[i].msg}</Text></ListItem>);
    }
    this.setState({list:list});
  };

  render() {
    return (
      <Container>
        <Content>
          { !this.state.isShowNewMsg &&
          <List>
            {this.state.list}
          </List>
          }
          { this.state.isShowNewMsg &&
          <Form>
            <Textarea rowSpan={5}
                      onChangeText={message => this.setState({message:message})}
                      bordered
                      placeholder="Textarea" />
            <Button onPress={this.submit}>
              <Text>Submit</Text>
            </Button>
          </Form>
          }
          <Button iconLeft light
                  style={{alignSelf: 'flex-start'}}
                  onPress={this.showNewMsg}>
            <Icon name='add-circle'/>
            <Text>New message</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

ChatScreen.navigationOptions = {
  title: 'Chat',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
