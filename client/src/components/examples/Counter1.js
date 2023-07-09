import React, { useState } from "react";

export default class Counter1 extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        counter: 0,
      };
  }

  increment = () => {
        this.setState((state, props) => ({
          counter: this.state.counter + 1,
        }));
  }

    render() {
      return (
        <div>
        <i><b>{this.state.counter}</b></i><br/>
        <button onClick={this.increment}>Add to Shopping Cart</button><br/>
        </div>
      );
    }
}