import React, { Component } from "react";
import PropTypes from "prop-types";

class ClickOutside extends Component {
  componentDidMount() {
    document.body.addEventListener("click", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.handleOutsideClick);
  }

  handleOutsideClick = (e) => {
    if (!this.component.contains(e.target)) {
      // Clicked outside component
      if (this.props.handleOutsideClick) {
        this.props.handleOutsideClick();
      }
    }
  }

  render() {
    return (
      <div ref={(node) => { this.component = node }}>
        {this.props.children}
      </div>
    );
  }
}

ClickOutside.propTypes={
  handleOutsideClick: PropTypes.func,
  children: PropTypes.node,
}

export default ClickOutside;