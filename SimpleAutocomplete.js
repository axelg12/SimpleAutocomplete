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
    autoFocus: React.PropTypes.bool,
    autoCorrect: React.PropTypes.bool,
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
    var dropdownContainerRowStyle = [styleComponent.resultRow, this.props.dropdownContainerRowStyle];
    var separator = [styleComponent.separator, this.props.separatorStyle];
   return (
      <View>
        <TouchableHighlight
          activeOpacity={0.2}
          underlayColor={'#ffffff'}
          onPress={this.onSelect.bind(this, obj)}>
          <View style={dropdownContainerRowStyle}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Text style={{fontWeight: 'bold', marginRight: 10}}>{obj.displayAirportCode}</Text>
              <Text style={dropdownRowStyle}>{obj.displayString}</Text>
            </View>
            <Text style={{fontSize:10}}>{obj.country}</Text>
          </View>
        </TouchableHighlight>
        <View style={styleComponent.separator} />
      </View>
    );
  }
  render() {
    var textInput = [styleComponent.autocompleteInput, this.props.textInputStyle];
    var dropdown = [styleComponent.autocompleteList, this.props.dropdownStyle];
    var leadingSeparator = [styleComponent.leadingSeparator, this.props.leadingSeparatorStyle];
    return (
      <View styleComponent={styleComponent.mainContainer}>
      <TextInput
          placeholder={this.props.placeholder}
          style={textInput}
          onChangeText={this.onTyping.bind(this)}
          value={this.state.text}
          autoFocus={this.props.autoFocus}
          autoCorrect={this.props.autoCorrect}
        />
        <View style={styleComponent.leadingSeparator} />
        <ListView
          keyboardShouldPersistTaps={true}
          keyboardDismissMode='on-drag'
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
