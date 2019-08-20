import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import { userLogout } from "../../_actions/user.actions";
import {
  getDiaryAction,
  addDiaryDay,
  updateDiaryDay
} from "../../_actions/diary.actions";

import Preloader from "../../components/Preloader";
import { Day, NewDay } from "../../components/Day";

class Diary extends React.Component {
  constructor(props) {
    super(props);
    moment.locale();
  }

  addOrUpdateDay(text) {
    if (this.props.isTodayWrited) {
      this.props.updateDiaryDay(
        this.props.user.user.token,
        this.props.user.user.id,
        text,
        this.props.lastSavedDay.dayDate,
        this.props.lastSavedDay._id
      );
    } else {
      this.props.addDiaryDay(
        this.props.user.user.token,
        this.props.user.user.id,
        text,
        this.props.now.format().toString()
      );
    }
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
              <div className="diary-container__days-container">
                <NewDay
                  date={moment().format("DD.MM.YYYY")}
                  initialValue={this.props.lastSavedDay.day}
                  save={text => this.addOrUpdateDay(text)}
                />
                {this.props.diary.diary.length &&
                this.props.diary.diary.length > 0 ? (
                  <React.Fragment>
                    {this.props.diary.pending && (
                      <Preloader mode="mini" style={{ marginBottom: 20 }} />
                    )}
                    {this.props.diary.diary
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
                      })}
                  </React.Fragment>
                ) : (
                  <div className="diary-container__days-container_emtry">
                    Nothings to show...
                  </div>
                )}
              </div>
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
  addDiaryDay: addDiaryDay,
  updateDiaryDay: updateDiaryDay
};

const mapStateToProps = state => {
  const { user, diary } = state;

  const now = moment();
  let lastSavedDay = {};
  let isTodayWrited = false;

  if (diary.diary.length > 0) {
    lastSavedDay = diary.diary[diary.diary.length - 1];
    const lastDayDate = moment(lastSavedDay.dayDate);
    isTodayWrited = moment(now).isSame(lastDayDate, "day");
  }

  return { user, diary, now, lastSavedDay, isTodayWrited };
};

const connectedDiary = connect(
  mapStateToProps,
  mapDispatchToProps
)(Diary);
export { connectedDiary as Diary };
