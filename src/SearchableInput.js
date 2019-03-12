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
import { addOrRemoveItem } from "./utils/addOrRemoveItem";
import {
  Wrapper,
  Text,
  InputWrapper,
  Input,
  SearchList,
  SearchListItem,
  ErrorInfo
} from "./styled-components";

class SearchableInput extends Component {
  constructor(props) {
    super(props);
    this.initCollapse = isBoolean(this.props.resultsCollapse)
      ? this.props.resultsCollapse
      : true;
    this.state = {
      input: "",
      focused: false,
      searchCache: [],
      results: this.props.collection,
      resultsCollapse: this.initCollapse,
      selectedItems: this.props.selectAllByDefault ? this.props.collection : []
    };
    // prevent update or ajax fetch too often
    this.onValueChange = this.props.onValueChange
      ? throttle(this.props.onValueChange, 300)
      : null;
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
    onValueChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    showError: PropTypes.bool.isRequired,
    defaultError: PropTypes.string,
    isDisabled: PropTypes.bool,
    resultsCollapse: PropTypes.bool,
    ayncSearch: PropTypes.bool,
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
    this.refreshSelectAll();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.collection, nextProps.collection)) {
      this.setState(
        {
          results: nextProps.collection,
          selectedItems: this.props.selectAllByDefault
            ? nextProps.collection
            : []
        },
        () => this.refreshSelectAll()
      );
    }
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
    this.setState({
      input: e.target.value
    });
    const maybeCached = this.state.searchCache.find(
      cache => cache.query === e.target.value
    );
    if (this.onValueChange) {
      this.onValueChange(e.target.value);
    }
    const resultArray = maybeCached
      ? maybeCached.data
      : e.target.value === "" || this.props.ayncSearch
      ? this.props.collection
      : this.props.collection.filter(item => {
          const itemName = item.label || item;
          return (
            includes(itemName, e.target.value) ||
            includes(itemName.toLowerCase(), e.target.value)
          );
        });
    const newSearchCache = maybeCached
      ? this.state.searchCache
      : [
          ...this.state.searchCache,
          {
            query: e.target.value,
            data: resultArray
          }
        ];
    this.setState({
      searchCache:
        newSearchCache.length > 10 ? drop(newSearchCache) : newSearchCache,
      results: resultArray,
      resultsCollapse: false
    });
  };

  onListItemClick = value => () => {
    this.setState(
      {
        input: value.label || value,
        focused: false,
        results: isBoolean(this.props.closeOnSelect)
          ? this.state.results
          : this.props.collection,
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
      this.afterItemChanged
    );
  };

  afterItemChanged = () => {
    this.refreshSelectAll();
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

  onSelectAllClicked = () => {
    if (this.selectAll.checked) {
      this.setState(
        {
          selectedItems: this.state.results
        },
        this.afterItemChanged
      );
    } else {
      this.setState(
        {
          selectedItems: without(this.props.collection, ...this.state.results)
        },
        this.afterItemChanged
      );
    }
  };

  refreshSelectAll = () => {
    if (this.selectAll) {
      const allSelected =
        this.state.selectedItems.length === this.state.results.length;
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
    this.setState(
      {
        results: this.props.collection,
        resultsCollapse: false,
        focused: true
      },
      () => {
        this.refreshSelectAll();
      }
    );
  };

  showDropdown = () => {
    this.filterSearch.focus();
    this.setState({
      resultsCollapse: false
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
    const textFieldValue = this.state.input
      ? this.state.input
      : placeholder || "Choose a label"; // eslint-disable-line no-extra-boolean-cast
    return (
      <Wrapper>
        <Text
          onClick={isDisabled ? null : this.showDropdown}
          disabled={isDisabled}
          visible={!this.state.focused}
        >
          {textFieldValue}
        </Text>
        <ClickOutside handleOutsideClick={this.handleOutsideClick}>
          <InputWrapper
            collapse={this.state.resultsCollapse}
            border={this.props.theme.border}
          >
            <Input
              type="text"
              disabled={isDisabled}
              value={this.state.input}
              placeholder={placeholder ? placeholder : "Filter"}
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
              onFocus={this.onFocus}
              ref={input => (this.filterSearch = input)}
            />
            {!isEmpty(this.state.results) && (
              <SearchList>
                {multi && enableSelectAll && (
                  <SearchListItem key="all">
                    <label className="input-checkbox-label">
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        disabled={false}
                        onChange={this.onSelectAllClicked}
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
                {this.state.results.map((item, i) =>
                  multi ? (
                    <SearchListItem key={`${item.id}-${i}`}>
                      <label className="input-checkbox-label">
                        <input
                          type="checkbox"
                          className="input-checkbox"
                          disabled={false}
                          checked={this.state.selectedItems.includes(item)}
                          onChange={this.onListItemClick(item)}
                        />
                        <span>{item.label || item}</span>
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
