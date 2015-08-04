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
var styleComponent = StyleSheet.create(require('../../styles/AutoComplete'));
class SimpleAutocomplete extends Component {
  propTypes: {
    onSelect: React.PropTypes.func.isRequired,
    onTyping: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired,
  }
  componentWillReceiveProps(nextProps) {
    console.log('whoo', nextProps.data);
    this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.data)});
  }
  onTyping(text) {
    this.setState({text});
    this.props.onTyping(text);
  }
  _renderRow(displayName) {
    return (
      <TouchableHighlight
        onPress={this.onSelect.bind(this, displayName)}
        style={styleComponent.plusButton}>
        <Text style={styleComponent.autocompleteListRow}>{displayName}</Text>
      </TouchableHighlight>
    );
  }
  render() {
    return (
      <View styleComponent={styleComponent.mainContainer}>
      <TextInput
          style={styleComponent.autocompleteInput}
          onChangeText={this.onTyping.bind(this)}
          value={this.state.text}
        />
        <ListView
          style={styleComponent.autocompleteList}
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
