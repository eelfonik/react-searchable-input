import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  includes,
  isEmpty,
  isEqual,
  isBoolean,
  without,
  throttle,
  drop
} from "lodash-es";
import ClickOutside from "./utils/ClickOutside";
import { addOrRemoveItem, hasItem } from "./utils/addOrRemoveItem";
import {
  Wrapper,
  Text,
  InputWrapper,
  Input,
  SearchList,
  SearchListItem,
  ErrorInfo
} from "./styled-components";

const _noop = () => {}

const updateSearchCache = (prevCache, input, resultArray) => {
  const hasCache = prevCache.find(
    cache => cache.query === input && isEqual(cache.data, resultArray)
  );
  const newSearchCache = hasCache
    ? prevCache
    : [
        ...prevCache.filter(cache => cache.query !== input),
        {
          query: input,
          data: resultArray
        }
      ];
  return newSearchCache.length > 10 ? drop(newSearchCache) : newSearchCache;
};

class SearchableInput extends Component {
  constructor(props) {
    super(props);
    this.initCollapse = isBoolean(this.props.resultsCollapse)
      ? this.props.resultsCollapse
      : true;
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
      resultsCollapse: this.initCollapse
    };
  }

  static propTypes = {
    collection: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          id: PropTypes.string,
          label: PropTypes.string
        })
      ])
    ).isRequired,
    onPressEnter: PropTypes.func,
    placeholder: PropTypes.string,
    onListItemClick: PropTypes.func,
    onValueChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    showError: PropTypes.bool,
    defaultError: PropTypes.string,
    isDisabled: PropTypes.bool,
    resultsCollapse: PropTypes.bool,
    asyncSearch: PropTypes.func,
    enableCache: PropTypes.bool,
    closeOnSelect: PropTypes.bool,
    multi: PropTypes.bool,
    selectAllByDefault: PropTypes.bool,
    selectAllText: PropTypes.shape({
      selectAll: PropTypes.string,
      unSelectAll: PropTypes.string
    }),
    enableSelectAll: PropTypes.bool,
    theme: PropTypes.object,
    renderListItem: PropTypes.func
  };

  componentDidMount() {
    this.refreshSelectAll(this.props.collection);
  }

  handleOutsideClick = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this.setState({
      focused: false,
      resultsCollapse: this.initCollapse
    });
  };

  handleChange = e => {
    const input = e.target.value;
    this.setState({ input });
    if (this.props.onValueChange) {
      this.props.onValueChange(input);
    }
    if (
      this.asyncSearch &&
      !this.searchCache.find(cache => cache.query === input)
    ) {
      this.asyncSearch(input);
    }
  };

  onListItemClick = (value, allItems) => () => {
    this.setState(
      {
        focused: false,
        resultsCollapse: isBoolean(this.props.closeOnSelect)
          ? this.props.closeOnSelect
          : this.initCollapse,
        selectedItems: this.props.multi
          ? this.props.collection.filter(col =>
              includes(
                addOrRemoveItem(
                  this.state.selectedItems.map(item => item.id),
                  value.id
                ),
                col.id.toString()
              )
            )
          : value
      },
      this.afterItemChanged(allItems)
    );
  };

  afterItemChanged = allItems => () => {
    this.refreshSelectAll(allItems);
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
    if (this.selectAll.checked) {
      this.setState(
        {
          selectedItems: allItems
        },
        this.afterItemChanged(allItems)
      );
    } else {
      this.setState(
        {
          selectedItems: without(this.props.collection, ...allItems)
        },
        this.afterItemChanged(allItems)
      );
    }
  };

  refreshSelectAll = allItems => {
    if (this.selectAll) {
      const allSelected = this.state.selectedItems.length === allItems.length;
      this.selectAll.checked = allSelected;
      this.selectAll.indeterminate =
        this.state.selectedItems.length && !allSelected;
      this.setState({
        allSelected: allSelected
      });
    }
  };

  onFocus = e => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.setState({
      resultsCollapse: false,
      focused: true
    });
  };

  showDropdown = () => {
    this.filterSearch.focus();
    this.setState({
      resultsCollapse: false,
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
      selectAllText,
      enableSelectAll,
      renderListItem
    } = this.props;
    const { input, focused, resultsCollapse } = this.state;
    const textFieldValue = input ? input : placeholder || "Choose a label"; // eslint-disable-line no-extra-boolean-cast

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
    console.log({
      results: resultArray,
      collections: this.props.collection,
      searchCache: this.searchCache,
      selectedItems: this.state.selectedItems
    });
    return (
      <Wrapper>
        <Text
          onClick={isDisabled ? null : this.showDropdown}
          disabled={isDisabled}
          visible={!focused}
        >
          {textFieldValue}
        </Text>
        <ClickOutside handleOutsideClick={this.handleOutsideClick}>
          <InputWrapper
            collapse={resultsCollapse}
            border={this.props.theme.border}
          >
            <Input
              type="text"
              disabled={isDisabled}
              value={input}
              placeholder={placeholder ? placeholder : "Filter"}
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
              onFocus={this.onFocus}
              ref={input => (this.filterSearch = input)}
            />
            {!isEmpty(resultArray) && (
              <SearchList>
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
                        {this.state.allSelected
                          ? selectAllText.unSelectAll
                          : selectAllText.selectAll}
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
                            this.state.selectedItems.map(it => it.id),
                            item.id
                          )}
                          onChange={this.onListItemClick(item, resultArray)}
                        />
                        {renderListItem ? (
                          renderListItem(item)
                        ) : (
                          <label>
                            <span>{item.label || item}</span>
                          </label>
                        )}
                      </label>
                    </SearchListItem>
                  ) : (
                    <SearchListItem
                      key={`${item.id}-${i}`}
                      onClick={this.onListItemClick(item, resultArray)}
                    >
                      {renderListItem ? (
                        renderListItem(item)
                      ) : (
                        <label>
                          <span>{item.label || item}</span>
                        </label>
                      )}
                    </SearchListItem>
                  )
                )}
              </SearchList>
            )}
          </InputWrapper>
        </ClickOutside>
        {showError && (
          <ErrorInfo>
            {defaultError ? defaultError : "please select a valid label"}
          </ErrorInfo>
        )}
      </Wrapper>
    );
  }
}

export default SearchableInput;
