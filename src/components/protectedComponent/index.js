import React, { Component, PropTypes } from "react";

class ProtectedComponent extends Component {

  static propTypes = {
    predicate: PropTypes.bool,
    protectorFn: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  componentWillMount() {
    if (!this.props.predicate) {
      this.props.protectorFn(
      this.props.children.props.routeParams &&
      this.props.children.props.routeParams.id
    );
    }
  }
  componentDidUpdate() {
    if (!this.props.predicate) {
      this.props.protectorFn(
      this.props.children.props.routeParams &&
      this.props.children.props.routeParams.id
    );
    }
  }

  render() {
    return this.props.predicate ? this.props.children : <div />;
  }
}

export default ProtectedComponent;
