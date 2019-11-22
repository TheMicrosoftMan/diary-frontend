import React from "react";
import { FontIcon, initializeIcons } from "office-ui-fabric-react";

class NetworkDetector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisconnected: false
    };
    initializeIcons();
  }

  componentDidMount() {
    this.handleConnectionChange();
    window.addEventListener("online", this.handleConnectionChange);
    window.addEventListener("offline", this.handleConnectionChange);
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleConnectionChange);
    window.removeEventListener("offline", this.handleConnectionChange);
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      const webPing = setInterval(() => {
        fetch("//google.com", {
          mode: "no-cors"
        })
          .then(() => {
            this.setState({ isDisconnected: false }, () => {
              return clearInterval(webPing);
            });
          })
          .catch(() => {
            this.setState({ isDisconnected: true });
          });
      }, 2000);
      return;
    }

    return this.setState({ isDisconnected: true });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isDisconnected ? (
          <div className="offline">
            <FontIcon iconName="PlugDisconnected" className="offline__icon" />
            You're not connected
          </div>
        ) : (
          this.props.children
        )}
      </React.Fragment>
    );
  }
}

export default NetworkDetector;
