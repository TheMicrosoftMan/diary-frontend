import React from "react";
import { connect } from "react-redux";
import { userAutoLogin } from "./_actions/user.actions";
import { Auth } from "./containers/Auth";
import { Diary } from "./containers/Diary";
import Universe from "./components/Universe";
import NetworkDetector from "./hoc/NetworkDetector";
import "./_styles/main.scss";

class App extends React.Component {
  componentDidMount() {
    this.props.userAutoLogin();
  }

  render() {
    return (
      <div className="App">
        <Universe />
        <NetworkDetector>
          {this.props.user.token ? <Diary /> : <Auth />}
        </NetworkDetector>
      </div>
    );
  }
}

const mapDispatchToProps = {
  userAutoLogin: userAutoLogin
};

const mapStateToProps = state => {
  const { user } = state;
  return user;
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App };
