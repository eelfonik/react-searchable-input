# react-searchable-input
A react based text input with search/select/multi-select build in

## example usage
```javascript
import SearchableInput from 'react-searchable-input';

const handleSelect = (valueArr) => {
  // do something with the selected items array (the returned value is alway an array even we have only one item selected)
}

const handleSearch = (value) => {
  // do something with the input search value
  // EX: perfect place to ajax fetch
}

//what ever you like, just don't forget the `key`
//for validated html structure, better use span as wrapper element
const renderListItem = (item) => (
  <span key={item.id}>
    <img src={item.img} alt={item.label} />
    <span>{`${item.id} = ${item.label}`}</span>
  </span>
)

const someComponent = ({ collection }) => (
  <wrapper>
    <SearchableInput
      name='sample'
      onListItemClick={handleSelect}
      asyncSearch={handleChange}
      collection={collection.map(col => ({...col, id: col.id, label: col.name}))}
      placeholder='search for something'
      theme={{
        mainColor: 'transparent',
        itemHeight: '30px'
      }}
      renderListItem={renderListItem}
    />
  </wrapper>
)
```

## Props:
| Name   |      type      |  default | description
|----------|:-------------:|------:|---------:|
| collection |  array |  | The only required props, can be an array of string, or an array of object. In later case, each object should contain minimum an `id` and a `label`|
| placeholder |    string   |  "Choose an item" | placeholder text for input field |
| isDisabled | boolean |  false | disable the search input all together |
| onListItemClick | function |   | a callback function takes an array of the current selected items as argument, to trigger further actions |
| asyncSearch | function |   | a callback function to trigger ajax search when current input changed|
| enableCache | boolean | false | allow local cache for search result, useful when you have `ayncSearch` but don't use advanced async flow control solution like `rx.js` or `redux-saga`, it will throttle `onChange` event to prevent fetch on every keystroke, and cache a maximum of 10 queries results to be retrieved directly instead of calling the server again |
| showLabelText |  boolean | false | Label Text is a text overlay after you selected some items in search result, without modifying the underlying search input. It would display `n selected` for multi selection (where `n` is the number of items selected), or the label of item for single selection |
| multi |    boolean   | false | enable multiple item selection, turn the result list to checkbox items |
| closeOnSelect |  boolean | true | control if the search list should be hidden after selected an item, always false for multi-selection |
| enableSelectAll | boolean |   false | used when active `multi` option, add an option on top of search list, to select/deselect all avaiable items on the list  |
| selectAll |   object  |  <pre>{</br>selectAllText: "Select all",</br>unSelectAllText: "Unselect all"</br>}</pre> | text to display for select/deselect all when `enableSelectAll` is `true`
| theme | object |  <pre>{</br>mainColor: "#F0F1F2",</br>disabledColor:"#DDDDDD",</br>itemHeight: "34px",</br>listMaxHeight: "500px"</br>}</pre> | some theme variables allow to custom the color of list, EX: `mainColor` is used for `border-bottom` of the input field (pass `transparent` if you don't want one)
| renderListItem |  function |  | a render function allows to customize the list items, it takes the shape of item inside `collection` props, and should return a validated DOM node/ react node | 
| onPressEnter |   function   |    | function to call with current input value when user typed `enter` key |
| onBlur | function |    | additional function to call when the whole component lost focus |
| onFocus | function | | addtional function when the input field is focused |
| showError | boolean | | to display an error message if something went wrong (EX: ajax fetch failed) |
| defaultError | string or nodes | "please select a valid label" | if `showError` is `true`, display it |

## TODO:
- SSR support (ClickOutside component)
- Better cache strategy (attach unique id to a given request to associate response)
- More customization options for elements (multi-selections, etc)
- TypeScript