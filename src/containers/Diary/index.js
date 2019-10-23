import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import DayPicker from "react-day-picker";
import { initializeIcons } from "office-ui-fabric-react";

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

    this.handleDayClick = this.handleDayClick.bind(this);

    this.state = {
      selectedDate: moment().toDate(),
      monthSelected: moment().toDate(),
      modifiers: {
        hasDay: [
          moment("19.10.2019", "DD.MM.YYYY").toDate(),
          moment("17.10.2019", "DD.MM.YYYY").toDate()
        ]
      }
    };

    initializeIcons();
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

  handleDayClick(day, { selected }) {
    this.setState({
      selectedDate: selected ? undefined : day
    });
  }

  goToMonth = month => {
    this.setState({
      monthSelected: month
    });
  };

  navbar(params) {
    return (
      <div className="DayPicker-NavBar">
        <span className="DayPicker-NavBar_month-year">
          {moment(params.month).format("MMMM YYYY")}
        </span>
        <div className="DayPicker-NavBar_btns">
          <div
            className="DayPicker-NavBar_btns_goToMonth"
            onClick={() => this.goToMonth(params.previousMonth)}
          >
            <i class="mi mi-UpArrowShiftKey"></i>
          </div>
          <div
            className="DayPicker-NavBar_btns_goToMonth"
            onClick={() => this.goToMonth(params.nextMonth)}
          >
            <i class="mi mi-UpArrowShiftKey mi-flip-vertical"></i>
          </div>
        </div>
      </div>
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
              <div className="diary-container__main">
                <div className="diary-container__main_calendar-container">
                  <div className="DayPicker-container">
                    <DayPicker
                      selectedDays={this.state.selectedDate}
                      month={this.state.monthSelected}
                      modifiers={this.state.modifiers}
                      onDayClick={this.handleDayClick}
                      firstDayOfWeek={1}
                      captionElement={() => null}
                      navbarElement={params => this.navbar(params)}
                    />
                  </div>
                </div>
                <div className="diary-container__main_new-day-container">
                  <NewDay
                    date={moment().format("DD.MM.YYYY")}
                    initialValue={(() => {
                      if (this.props.lastSavedDay.day !== undefined) {
                        return this.props.lastSavedDay.day;
                      } else {
                        if (this.props.diary.diary.length === 0) {
                          return "Hello. It's my first day that I wrote in this diary...";
                        }
                        return "";
                      }
                    })()}
                    save={text => this.addOrUpdateDay(text)}
                  />
                </div>
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
