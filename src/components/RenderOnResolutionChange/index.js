import React, { Component } from "react";
import EventListener from "react-event-listener";
import { debounce } from "lodash/fp";

const renderOnResolutionChange = (InnerComponent, debounceTime) =>
  class RenderOnResolutionChange extends Component {
    constructor(props) {
      super(props);
      this.onResize = debounce(debounceTime || 200, this.onResize.bind(this));
    }
    onResize() {
      this.forceUpdate();
    }
    render() {
      return (
        <EventListener target="window" onResize={this.onResize}>
          <InnerComponent {...this.props} />
        </EventListener>
      );
    }
  };


export default renderOnResolutionChange;
