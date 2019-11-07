import React from "react";
import { connect } from "react-redux";
import { userRegister, userLogin } from "../../_actions/user.actions";

import Universe from "../../components/Universe";
import Preloader from "../../components/Preloader";

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginFormOpen: true
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
            <div className="auth-form__user-icon">
              <i className="mi mi-Contact"></i>
            </div>
            {this.state.isLoginFormOpen ? (
              <React.Fragment>
                <h2 className="auth-form__title">Sign in</h2>
                <div className="auth-form__inputs">
                  <label className="auth-form__label">
                    Email:{" "}
                    <input
                      className="auth-form__inputs_input"
                      placeholder="yourname@example.com"
                      type="email"
                      ref={this.logEmail}
                    />
                  </label>
                  <label className="auth-form__label">
                    Password:{" "}
                    <input
                      className="auth-form__inputs_input"
                      placeholder="********"
                      type="password"
                      ref={this.logPassword}
                    />
                  </label>
                  <button className="auth-form__button" onClick={this.login}>
                    Sign in
                  </button>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h2 className="auth-form__title">Sign up</h2>
                <div className="auth-form__inputs">
                  <label className="auth-form__label">
                    Name:{" "}
                    <input
                      className="auth-form__inputs_input"
                      placeholder="Your name"
                      type="text"
                      ref={this.regName}
                    />
                  </label>
                  <label className="auth-form__label">
                    Email:{" "}
                    <input
                      className="auth-form__inputs_input"
                      placeholder="yourname@example.com"
                      type="email"
                      ref={this.regEmail}
                    />
                  </label>
                  <label className="auth-form__label">
                    Password:{" "}
                    <input
                      className="auth-form__inputs_input"
                      placeholder="********"
                      type="password"
                      ref={this.regPassword}
                    />
                  </label>
                  <button className="auth-form__button" onClick={this.register}>
                    Sign up
                  </button>
                </div>
              </React.Fragment>
            )}
            {this.props.error && (
              <p className="auth_error">{this.props.error}</p>
            )}
            <span
              className="auth_login"
              onClick={() => {
                this.setState({
                  isLoginFormOpen: !this.state.isLoginFormOpen
                });
              }}
            >
              {this.state.isLoginFormOpen ? "Sign up" : "Sign in"}
            </span>
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
