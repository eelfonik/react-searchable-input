import React, { Component } from "react";
import PropTypes from "prop-types";
import { includes, isEmpty, without, throttle } from "lodash";
import ClickOutside from "./utils/ClickOutside";
import { addOrRemoveItem, hasItem } from "./utils/addOrRemoveItem";
import updateSearchCache from "./utils/cacheHelper";
import { ThemeProvider } from "styled-components";
import {
  Wrapper,
  Text,
  Input,
  SearchList,
  SearchListItem,
  ErrorInfo
} from "./styled-components";

const _noop = () => {};
class SearchableInput extends Component {
  constructor(props) {
    super(props);
    // prevent update or ajax fetch too often
    this.asyncSearch = this.props.asyncSearch
      ? this.props.enableCache
        ? throttle(this.props.asyncSearch, 300)
        : this.props.asyncSearch
      : _noop;
    this.searchCache = [];
    this.state = {
      input: "",
      focused: false,
      selectedItems: [],
      showResults: false
    };
  }

  static propTypes = {
    collection: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          label: PropTypes.string.isRequired
        })
      ])
    ).isRequired,
    placeholder: PropTypes.string,
    isDisabled: PropTypes.bool,
    onListItemClick: PropTypes.func,
    asyncSearch: PropTypes.func,
    enableCache: PropTypes.bool,
    multi: PropTypes.bool,
    showLabelText: PropTypes.bool,
    closeOnSelect: PropTypes.bool,
    selectAll: PropTypes.shape({
      selectAllText: PropTypes.string,
      unSelectAllText: PropTypes.string
    }),
    enableSelectAll: PropTypes.bool,
    theme: PropTypes.object,
    renderListItem: PropTypes.func,
    onPressEnter: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    showError: PropTypes.bool,
    defaultError: PropTypes.string
  };

  static defaultProps = {
    placeholder: "Choose an item",
    isDisabled: false,
    showLabelText: false,
    multi: false,
    enableCache: false,
    closeOnSelect: true,
    theme: {
      disabledColor: "#DDDDDD",
      inputHeight: '34px',
      listMaxHeight: "500px",
      listPadding: '20px',
      listWidth: '100%',
      listTop: '34px',
      listLeft: '0px',
      listBg: 'transparent'
    },
    selectAll: {
      selectAllText: "Select all",
      unSelectAllText: "Unselect all"
    },
    defaultError: "please select a valid label"
  };

  handleOutsideClick = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this.setState({
      focused: false,
      showResults: false
    });
  };

  handleChange = e => {
    const input = e.target.value;
    this.setState({
      input,
      selectedItems: this.props.multi ? this.state.selectedItems : [],
      showResults: true
    });
    if (
      this.asyncSearch &&
      !this.searchCache.find(cache => cache.query === input)
    ) {
      this.asyncSearch(input);
    }
  };

  onListItemClick = item => () => {
    this.setState(
      {
        focused: false,
        selectedItems: this.props.multi
          ? this.props.collection.filter(col =>
              hasItem(
                addOrRemoveItem("id")(this.state.selectedItems, item),
                col,
                "id"
              )
            )
          : [item]
      },
      this.afterItemChanged
    );
  };

  afterItemChanged = () => {
    this.setState({
      showResults: this.props.multi || !this.props.closeOnSelect
    });
    if (this.props.onListItemClick) {
      this.props.onListItemClick(this.state.selectedItems);
    }
  };

  handleKeyPress = e => {
    const key = e.keyCode || e.charCode || 0;
    if (key === 13) {
      e.preventDefault();
      if (this.props.onPressEnter) {
        this.props.onPressEnter(e.target.value);
      }
    }
  };

  onSelectAllClicked = allItems => () => {
    this.setState(
      {
        selectedItems: this.selectAll.checked
          ? allItems
          : without(this.props.collection, ...allItems)
      },
      this.afterItemChanged
    );
  };

  onFocus = e => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.setState({
      showResults: true,
      focused: true
    });
  };

  showDropdown = () => {
    this.filterSearch.focus();
    this.setState({
      showResults: true,
      focused: true
    });
  };

  render() {
    const {
      isDisabled,
      placeholder,
      showError,
      defaultError,
      multi,
      selectAll,
      enableSelectAll,
      renderListItem,
      showLabelText
    } = this.props;
    const { input, focused, showResults, selectedItems } = this.state;
    const getText = () => {
      if (selectedItems.length) {
        return {
          text: multi
              ? `${selectedItems.length} selected`
              : selectedItems[0].label || selectedItems[0],
          isPlaceholder: false
        }
      }
      return {
        text: placeholder,
        isPlaceholder: true,
      }
    };

    const resultArray =
      input === "" || this.props.asyncSearch
        ? this.props.collection
        : this.props.collection.filter(item => {
            const itemName = item.label || item;
            return (
              includes(itemName, input) ||
              includes(itemName.toLowerCase(), input)
            );
          });

    // if you don't add cache or throttle control in your own component,
    // you can pass props enableCache true to prevent calling the server too often
    if (this.props.enableCache) {
      this.searchCache = updateSearchCache(
        this.searchCache,
        input,
        resultArray
      );
    }

    let allSelected = false;
    if (this.selectAll) {
      const isAllSelected = selectedItems.length === resultArray.length;
      this.selectAll.checked = isAllSelected;
      this.selectAll.indeterminate = selectedItems.length && !isAllSelected;
      allSelected = isAllSelected;
    }

    return (
      <ThemeProvider theme={this.props.theme}>
        <Wrapper>
          {showLabelText && (
            <Text
              onClick={isDisabled ? null : this.showDropdown}
              disabled={isDisabled}
              visible={!focused}
              greyOut={getText().isPlaceholder}
            >
              {getText().text}
            </Text>
          )}
          <ClickOutside handleOutsideClick={this.handleOutsideClick}>
            <Input
              type="text"
              disabled={isDisabled}
              value={input}
              placeholder={placeholder}
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
              onFocus={this.onFocus}
              visible={!showLabelText || focused}
              ref={input => (this.filterSearch = input)}
            />
            {!isEmpty(resultArray) && (
              <SearchList showResults={showResults} >
                {multi && enableSelectAll && (
                  <SearchListItem key="all">
                    <label className="input-checkbox-label">
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        disabled={false}
                        onChange={this.onSelectAllClicked(resultArray)}
                        ref={input => (this.selectAll = input)}
                      />
                      <span>
                        {allSelected
                          ? selectAll.unSelectAllText
                          : selectAll.selectAllText}
                      </span>
                    </label>
                  </SearchListItem>
                )}
                {resultArray.map((item, i) =>
                  multi ? (
                    <SearchListItem key={`${item.id}-${i}`}>
                      <label className="input-checkbox-label">
                        <input
                          type="checkbox"
                          className="input-checkbox"
                          disabled={false}
                          checked={hasItem(
                            this.state.selectedItems,
                            item,
                            "id"
                          )}
                          onChange={this.onListItemClick(item)}
                        />
                        {renderListItem ? (
                          renderListItem(item)
                        ) : (
                          <span>{item.label || item}</span>
                        )}
                      </label>
                    </SearchListItem>
                  ) : (
                    <SearchListItem
                      key={`${item.id}-${i}`}
                      onClick={this.onListItemClick(item)}
                    >
                      {renderListItem ? (
                        renderListItem(item)
                      ) : (
                        <span>{item.label || item}</span>
                      )}
                    </SearchListItem>
                  )
                )}
              </SearchList>
            )}
          </ClickOutside>
          {showError && <ErrorInfo>{defaultError}</ErrorInfo>}
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default SearchableInput;
