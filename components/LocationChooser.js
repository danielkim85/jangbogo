import React, { Component, Fragment } from 'react';
import SearchableDropdown from './SearchableDropdown';

let items = [

];

//let items = [];
export default class LocationChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: []
    }
  }
  render(){
    return (
      <Fragment>
        {/* Single */}
        <SearchableDropdown
          onItemSelect={(item) => {
            console.info(item);
            const items = this.state.selectedItems;
            items.push(item)
            this.setState({ selectedItems: items });
          }}
          containerStyle={{ padding: 5 }}
          onRemoveItem={(item, index) => {
            const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
            this.setState({ selectedItems: items });
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{ color: '#222' }}
          itemsContainerStyle={{ maxHeight: 140 }}
          items={items}
          resetValue={false}
          textInputProps={
            {
              placeholder: "placeholder",
              underlineColorAndroid: "transparent",
              style: {
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              },
              onTextChange: function(text){

              }
            }
          }
          listProps={
            {
              nestedScrollEnabled: true
            }
          }
        />
      </Fragment>
    );
  }
}
