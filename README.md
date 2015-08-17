# SimpleAutocomplete
ATTENTION: From version 0.2 I had to make some changes to make this fit to the Dohop Search Autocompleter. Sorry for any inconvenience. If you want please make a issue if you want me to fix this or keep using 0.1
This is just a simple Autocompleter/Typeahead that uses TextInput to filter/populate a listview that is rendered below. Pure react-native solution

You can pass any prop you could normally pass down to both TextInput and ListView

Use at your own risk but PR and issues are encouraged ! 

# Usage 
```
 <View style={styles.mainContainer}>
  <AutoComplete
    onTyping={this.onTyping.bind(this)}
    onSelect={this.onSelect.bind(this)}
    data={this.state.data}/>
</View>
var styles = {
  mainContainer: {
    borderColor: '#48BBEC',
    borderWidth: 1,
    height: 50,
  },
}
```
## Props
I've allowed for passage for some special props to be used
+ onSelect (Required): Function when user clicks on row in listview
+ onTyping (Required): A function that is called when user is typing into the TextInput. Used to filter the data passed to the ListView
+ data (Required): Array of strings to be passed down to the ListView
+ placeholder (Required): Placeholder for the TextInput
+ dropdownRowStyle: Styling for the ListView Row
+ textInputStyle: Styling for the TextInput
+ dropdownStyle: Styling for ListView
