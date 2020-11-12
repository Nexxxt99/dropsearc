import React from "react";
import { Observer, observer } from "mobx-react";

const Com = ({ counter }) => <h2>here{counter.value}</h2>;

export const TestObserver = observer(
  class TestObserver extends React.Component {
    render() {
      return (
        <div>
          {React.createElement("h1", null, "hello")}
          <h1>Static: {this.props.counter.value}</h1>
          <Observer>{() => <h1>{this.props.counter.value}</h1>}</Observer>
          <Observer>
            {() =>
              React.createElement(Com, { counter: { ...this.props.counter } })
            }
          </Observer>
          <button onClick={this.props.counter.increment}>clickme</button>
          <Com counter={this.props.counter} />
        </div>
      );
    }
  }
);

export class TestApp extends React.Component {
  render() {
    return (
      <div>
        {this.props.person.name}
        <Observer>{() => <div>{this.props.person.name}</div>}</Observer>
        <button onClick={this.props.person.changeName}>clickme</button>
      </div>
    );
  }
}
