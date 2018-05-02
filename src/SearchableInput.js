import React, { Component } from "react";
import PropTypes from "prop-types";
import includes from "lodash/includes";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import isBoolean from "lodash/isBoolean";
import without from "lodash/without";
import throttle from "lodash/throttle";
import drop from "lodash/drop";
import ClickOutside from './utils/ClickOutside';
import { addOrRemoveItem } from "./utils/addOrRemoveItem";

class SearchableInput extends Component {
  constructor(props) {
    super(props);
    this.initCollapse = isBoolean(this.props.resultsCollapse)
      ? this.props.resultsCollapse
      : true;
    this.state = {
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
    inputClassName: PropTypes.string,
    listClassName: PropTypes.string,
    classNames: PropTypes.string,
    onListItemClick: PropTypes.func,
    labelValue: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    showError: PropTypes.bool.isRequired,
    defaultError: PropTypes.string,
    isDisabled: PropTypes.bool,
    resultsCollapse: PropTypes.bool,
    ajaxSearch: PropTypes.bool,
    closeOnSelect: PropTypes.bool,
    multi: PropTypes.bool,
    textValue: PropTypes.string,
    selectAllByDefault: PropTypes.bool,
    selectAllText: PropTypes.shape({
      selectAll: PropTypes.string,
      unSelectAll: PropTypes.string
    }),
    enableSelectAll: PropTypes.bool
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

  handleOutsideClick = (e) => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this.setState({
      resultsCollapse: this.initCollapse
    });
  };

  handleChange = (e) => {
    const maybeCached = this.state.searchCache.find(
      cache => cache.query === e.target.value
    );
    if (this.onValueChange) {
      this.onValueChange(e.target.value);
    }
    const resultArray = maybeCached
      ? maybeCached.data
      : e.target.value === "" || this.props.ajaxSearch
        ? this.props.collection
        : this.props.collection.filter((item) => {
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

  onListItemClick = value => (e) => {
    this.setState(
      {
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
                col.id
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

  handleKeyPress = (e) => {
    const key = e.keyCode || e.charCode || 0;
    if (key === 13) {
      e.preventDefault();
      if (this.props.onPressEnter) {
        this.props.onPressEnter(e.target.value);
      }
    }
  };

  onSelectAllClicked = (e) => {
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

  onFocus = (e) => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.setState(
      {
        results: this.props.collection,
        resultsCollapse: false
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
      labelValue,
      placeholder,
      classNames,
      listClassName,
      inputClassName,
      onPressEnter,
      showError,
      defaultError,
      multi,
      textValue,
      selectAllText,
      enableSelectAll
    } = this.props;
    const textFieldValue = multi
      ? textValue
      : labelValue ? labelValue : placeholder || "Choose a label";
    return (
      <div
        className={`searchableInput ${
          classNames ? classNames : ""
        }`}
      >
        <div
          onClick={isDisabled ? null : this.showDropdown}
          className={`searchableInput-text ${
            inputClassName ? inputClassName : ""
          } ${isDisabled ? "-disabled" : ""}`}
        >
          {textFieldValue}
        </div>
        <ClickOutside handleOutsideClick={this.handleOutsideClick}>
          <div
            className={`searchableInput-selectWrap ${
              listClassName ? listClassName : ""
            } ${this.state.resultsCollapse ? "-collapse" : ""}`}
          >
            <input
              type="text"
              disabled={isDisabled}
              value={labelValue || ""}
              placeholder={placeholder ? placeholder : "Filter"}
              className={`input-search ${inputClassName ? inputClassName : ""}`}
              onKeyPress={this.handleKeyPress}
              onChange={this.handleChange}
              onFocus={this.onFocus}
              ref={input => (this.filterSearch = input)}
            />
            {!isEmpty(this.state.results) && (
              <ul
                className={`searchableInput-list ${
                  listClassName ? listClassName : ""
                }`}
              >
                {multi &&
                  enableSelectAll && (
                    <li key="all" className="searchableInput-listItem">
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
                    </li>
                  )}
                {this.state.results.map((item, i) => multi ? (
                    <li key={i} className="searchableInput-listItem">
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
                    </li>
                  ) : (
                    <li key={i} onClick={this.onListItemClick(item)} className="searchableInput-listItem">
                      <label>
                        <span>{item.label || item}</span>
                      </label>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </ClickOutside>
        {showError ? (
          <span className="input-error">
            {defaultError ? defaultError : "please select a valid label"}
          </span>
        ) : null}
      </div>
    );
  }
}

export default SearchableInput;
