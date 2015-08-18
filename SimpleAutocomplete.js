var React = require('react-native');
var {
    Component,
    StyleSheet,
    View,
    Text,
    TextInput,
    ListView,
    TouchableHighlight,
} = React;
var styleComponent = StyleSheet.create(require('./defaultStyles'));
/* 
* onSelect: Callback function that is called when user selects item from the listview
* onTyping: Callback function to update the autocomplete list
* data: Object containing whatever you like, only thing is needs to contain
*       is a key called displayString which will be used to populate the 
*       listview
* Placeholder: Placeholder for the textinput
**/
class SimpleAutocomplete extends Component {
  propTypes: {
    onSelect: React.PropTypes.func.isRequired,
    onTyping: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired,
    placeholder: React.PropTypes.string,
  }
  componentWillReceiveProps(nextProps) {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.data)});
  }
  onTyping(text) {
    this.setState({text});
    this.props.onTyping(text);
  }
  _renderRow(obj) {
    var dropdownRowStyle = [styleComponent.autocompleteListRow, this.props.dropdownRowStyle];
   return (
      <TouchableHighlight
        onPress={this.onSelect.bind(this, obj)}>
        <View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={{fontWeight: 'bold', marginRight: 10}}>{obj.displayAirportCode}</Text>
            <Text style={dropdownRowStyle}>{obj.displayString}</Text>
          </View>
          <Text style={{fontSize: 10}}>{obj.country}</Text>
          <View style={styleComponent.separator} />
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    var textInput = [styleComponent.autocompleteInput, this.props.textInputStyle];
    var dropdown = [styleComponent.autocompleteList, this.props.dropdownStyle];
    return (
      <View styleComponent={styleComponent.mainContainer}>
      <TextInput
          placeholder={this.props.placeholder}
          style={textInput}
          onChangeText={this.onTyping.bind(this)}
          value={this.state.text}
        />
        <View style={styleComponent.separator} />
        <ListView
          style={dropdown}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this._renderRow(rowData)}
          />
      </View>
    );
  }
  onSelect(obj) {
    this.props.onSelect(obj);
  }
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    };
  }
}
module.exports = SimpleAutocomplete;
