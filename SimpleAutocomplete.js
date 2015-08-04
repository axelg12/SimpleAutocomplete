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
  _renderRow(displayName) {
    var dropdownRowStyle = [styleComponent.autocompleteListRow, this.props.dropdownRowStyle];
    return (
      <TouchableHighlight
        onPress={this.onSelect.bind(this, displayName)}
        style={styleComponent.plusButton}>
        <Text style={dropdownRowStyle}>{displayName}</Text>
      </TouchableHighlight>
    );
  }
  render() {
    var textInput = [styleComponent.autocompleteInput, this.props.textInputStyle];
    var dropdown = [styleComponent.autocompleteList, this.props.dropdownStyle];
    return (
      <View styleComponent={styleComponent.mainContainer}>
      <TextInput
          style={textInput}
          onChangeText={this.onTyping.bind(this)}
          value={this.state.text}
        />
        <ListView
          style={dropdown}
          placeholder={this.props.placeholder}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this._renderRow(rowData)}
          />
      </View>
    );
  }
  onSelect(displayName) {
    this.props.onSelect(displayName);
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
