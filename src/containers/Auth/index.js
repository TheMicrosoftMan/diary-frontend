import React from "react";
import { connect } from "react-redux";
import { userRegister, userLogin } from "../../_actions/user.actions";

import { Spinner } from "office-ui-fabric-react";

import { ReactComponent as Icon } from "../../images/icon.svg";

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

  enterHandler = (e, f) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      f();
    }
  };

  render() {
    return (
      <div className="auth">
        <div className="auth-form">
          <div className="container">
            <div className="auth-form__user-icon">
              <Icon />
              {this.props.pending && <Spinner />}
            </div>
            {this.props.pending && (
              <h1 className="auth-form__project-title">My React Diary</h1>
            )}
            {!this.props.pending && (
              <React.Fragment>
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
                          onKeyDown={e => this.enterHandler(e, this.login)}
                        />
                      </label>
                      <label className="auth-form__label">
                        Password:{" "}
                        <input
                          className="auth-form__inputs_input"
                          placeholder="********"
                          type="password"
                          ref={this.logPassword}
                          onKeyDown={e => this.enterHandler(e, this.login)}
                        />
                      </label>
                      <button
                        className="auth-form__button"
                        onClick={this.login}
                      >
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
                          onKeyDown={e => this.enterHandler(e, this.register)}
                        />
                      </label>
                      <label className="auth-form__label">
                        Email:{" "}
                        <input
                          className="auth-form__inputs_input"
                          placeholder="yourname@example.com"
                          type="email"
                          ref={this.regEmail}
                          onKeyDown={e => this.enterHandler(e, this.register)}
                        />
                      </label>
                      <label className="auth-form__label">
                        Password:{" "}
                        <input
                          className="auth-form__inputs_input"
                          placeholder="********"
                          type="password"
                          ref={this.regPassword}
                          onKeyDown={e => this.enterHandler(e, this.register)}
                        />
                      </label>
                      <button
                        className="auth-form__button"
                        onClick={this.register}
                      >
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
              </React.Fragment>
            )}
          </div>
        </div>
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

const connectedAuth = connect(mapStateToProps, mapDispatchToProps)(Auth);
export { connectedAuth as Auth };
