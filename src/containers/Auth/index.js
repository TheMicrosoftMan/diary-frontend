import React from "react";
import { connect } from "react-redux";
import { userRegister, userLogin } from "../../_actions/user.actions";

import Universe from "../../components/Universe";
import Preloader from "../../components/Preloader";

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginFormOpen: true,
      errorMsg: ""
    };

    this.regEmail = React.createRef();
    this.regPassword = React.createRef();
    this.regName = React.createRef();
    this.logEmail = React.createRef();
    this.logPassword = React.createRef();
  }

  register = () => {
    this.props.userRegister(
      this.regName.current.value,
      this.regEmail.current.value,
      this.regPassword.current.value
    );
  };

  login = () => {
    this.props.userLogin(
      this.logEmail.current.value,
      this.logPassword.current.value
    );
  };

  render() {
    return (
      <div className="auth">
        <Universe />
        <div className="auth-form">
          <div className="container">
            {this.state.isLoginFormOpen ? (
              <React.Fragment>
                <h2 className="auth-form__title">Login</h2>
                <div className="auth-form__inputs">
                  <input
                    className="auth-form__inputs_input"
                    placeholder="Email..."
                    type="email"
                    ref={this.logEmail}
                  />
                  <input
                    className="auth-form__inputs_input"
                    placeholder="Password..."
                    type="password"
                    ref={this.logPassword}
                  />
                  <button className="auth-form__button" onClick={this.login}>
                    Log in
                  </button>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h2 className="auth-form__title">Sign up</h2>
                <div className="auth-form__inputs">
                  <input
                    className="auth-form__inputs_input"
                    placeholder="Name..."
                    type="text"
                    ref={this.regName}
                  />
                  <input
                    className="auth-form__inputs_input"
                    placeholder="Email..."
                    type="emain"
                    ref={this.regEmail}
                  />
                  <input
                    className="auth-form__inputs_input"
                    placeholder="Password..."
                    type="password"
                    ref={this.regPassword}
                  />
                  <button className="auth-form__button" onClick={this.register}>
                    Sign up
                  </button>
                </div>
              </React.Fragment>
            )}
            <p className="auth_error">{this.props.error && this.props.error}</p>
            <p
              className="auth_login"
              onClick={() => {
                this.setState({
                  isLoginFormOpen: !this.state.isLoginFormOpen
                });
              }}
            >
              {this.state.isLoginFormOpen ? "Sign up" : "Login"}
            </p>
          </div>
        </div>
        {this.props.pending && <Preloader mode="fullscreen" />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return user;
};

const mapDispatchToProps = {
  userRegister: userRegister,
  userLogin: userLogin
};

const connectedAuth = connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
export { connectedAuth as Auth };
