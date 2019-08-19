import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import { userLogout } from "../../_actions/user.actions";
import { getDiaryAction, addDiaryDay } from "../../_actions/diary.actions";

import Preloader from "../../components/Preloader";
import Day from "../../components/Day";

class Diary extends React.Component {
  constructor(props) {
    super(props);
    moment.locale();
  }

  addNewDay(text) {
    const date = moment()
      .format()
      .toString();
    this.props.addDiaryDay(
      this.props.user.user.token,
      this.props.user.user.id,
      text,
      date
    );
  }

  componentDidMount() {
    this.props.getDiaryAction(
      this.props.user.user.token,
      this.props.user.user.id
    );
  }

  render() {
    return (
      <div className="diary-page">
        <div className="diary">
          <div className="wrapper">
            <div className="diary-container">
              <div className="diary-container__title-container">
                <div className="diary-container__title-container_title">
                  {this.props.user.user.name}
                </div>
                <div className="diary-container__title-container_logout">
                  <button
                    className="diary-container__title-container_logout_btn"
                    onClick={this.props.userLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
              {this.props.diary.pending ? (
                <Preloader mode="mini" />
              ) : (
                <div className="diary-container__days-container">
                  <Day
                    key={0}
                    date={moment().format("DD.MM.YYYY")}
                    emtry
                    save={text => this.addNewDay(text)}
                  />
                  {this.props.diary.diary.length &&
                  this.props.diary.diary.length > 0 ? (
                    this.props.diary.diary
                      .slice(0)
                      .reverse(0)
                      .map(day => {
                        return (
                          <Day
                            key={day._id}
                            id={day._id}
                            date={moment(day.dayDate).format("DD.MM.YYYY")}
                            text={day.day}
                          />
                        );
                      })
                  ) : (
                    <div className="diary-container__days-container_emtry">
                      Nothings to show...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  userLogout: userLogout,
  getDiaryAction: getDiaryAction,
  addDiaryDay: addDiaryDay
};

const mapStateToProps = state => {
  const { user, diary } = state;
  return { user, diary };
};

const connectedDiary = connect(
  mapStateToProps,
  mapDispatchToProps
)(Diary);
export { connectedDiary as Diary };
