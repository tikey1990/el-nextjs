"use client";
import PropTypes from "prop-types";
import { Component } from "react";

export class ErrorBoundary extends Component {
  state = {
    error: null,
  };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    const { error } = this.state;

    if (error) {
      return <this.props.ErrorComponent error={error} />;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  ErrorComponent: PropTypes.any,
  children: PropTypes.node,
};
