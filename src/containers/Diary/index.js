import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import DayPicker from "react-day-picker";
import {
  initializeIcons,
  MessageBar,
  MessageBarType,
  IconButton,
  MaskedTextField
} from "office-ui-fabric-react";

import { userLogout } from "../../_actions/user.actions";
import {
  getDiaryAction,
  addDiaryDay,
  updateDiaryDay,
  findDayAction,
  findByRangeAction
} from "../../_actions/diary.actions";

import Preloader from "../../components/Preloader";
import { Day, NewDay } from "../../components/Day";

class Diary extends React.Component {
  constructor(props) {
    super(props);
    moment.locale();

    this.handleDayClick = this.handleDayClick.bind(this);

    this.state = {
      selectedDate: moment(),
      monthSelected: moment(),

      showMaskedTextField: false
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
    }
  }

  addDay(text) {
    this.props.addDiaryDay(
      this.props.user.user.token,
      this.props.user.user.id,
      text,
      moment(this.state.selectedDate)
        .startOf("date")
        .format("YYYY-MM-DD")
    );
  }

  componentDidMount() {
    this.props.findByRangeAction(
      this.props.user.user.token,
      this.props.user.user.id,
      this.state.monthSelected.startOf("month").toDate(),
      this.state.monthSelected.endOf("month").toDate()
    );
  }

  handleDayClick(day) {
    this.setState({
      selectedDate: moment(day).startOf("date")
    });
  }

  goToMonth = month => {
    this.setState(
      {
        monthSelected: moment(month)
      },
      () =>
        this.props.findByRangeAction(
          this.props.user.user.token,
          this.props.user.user.id,
          this.state.monthSelected.startOf("month").toDate(),
          this.state.monthSelected.endOf("month").toDate()
        )
    );
  };

  goToToday = () => {
    this.setState({
      selectedDate: moment(),
      monthSelected: moment()
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
            <i className="mi mi-UpArrowShiftKey"></i>
          </div>
          <div
            className="DayPicker-NavBar_btns_goToMonth"
            onClick={() => this.goToMonth(params.nextMonth)}
          >
            <i className="mi mi-UpArrowShiftKey mi-flip-vertical"></i>
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
                  <div className="search-panel">
                    <div className="search-panel__container">
                      <div className="search-panel__container_item">
                        <IconButton
                          iconProps={{
                            iconName: "ForwardEvent"
                          }}
                          title="Go to today"
                          ariaLabel="Go to today"
                          onClick={this.goToToday}
                        />
                      </div>
                      <div className="search-panel__container_item">
                        <IconButton
                          iconProps={{
                            iconName: "CalendarWorkWeek"
                          }}
                          title="Go to date"
                          ariaLabel="Go to date"
                          onClick={() =>
                            this.setState({
                              showMaskedTextField: !this.state
                                .showMaskedTextField
                            })
                          }
                        />
                        {this.state.showMaskedTextField && (
                          <MaskedTextField
                            mask="99.99.9999"
                            onKeyDown={e => {
                              if (e.keyCode === 13) {
                                const newDate = moment(
                                  e.target.value,
                                  "DD.MM.YYYY"
                                );
                                this.setState({
                                  selectedDate: newDate,
                                  monthSelected: newDate
                                });
                              }
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="DayPicker-container">
                    <DayPicker
                      selectedDays={this.state.selectedDate.toDate()}
                      month={this.state.monthSelected.toDate()}
                      modifiers={{
                        hasDay: this.props.diary.diary.map(diaryItem => {
                          return moment(diaryItem.dayDate).toDate();
                        })
                      }}
                      onDayClick={this.handleDayClick}
                      firstDayOfWeek={1}
                      captionElement={() => null}
                      navbarElement={params => this.navbar(params)}
                    />
                  </div>
                </div>
                <div className="diary-container__main_new-day-container">
                  <NewDay
                    date={moment(this.state.selectedDate).format("DD.MM.YYYY")}
                    initialValue="Hello. It's my first day that I wrote in this diary..."
                    save={text => this.addDay(text)}
                  />
                  {(() => {
                    const item = this.props.diary.diary.find(diaryItem => {
                      let firstDate = moment(diaryItem.dayDate).startOf("date");
                      let secondDate = this.state.selectedDate;

                      if (moment(firstDate).isSame(secondDate)) return true;
                      return false;
                    });

                    return (
                      item && (
                        <Day
                          date={moment(item.dayDate).format("DD.MM.YYYY")}
                          text={item.day}
                        />
                      )
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.diary.errorMsg && (
          <div className="diary-notifications-list">
            <div className="diary-notifications-list__notify">
              <MessageBar
                messageBarType={MessageBarType.error}
                isMultiline={false}
              >
                {this.props.diary.errorMsg}
                <span
                  className="diary-notifications-list__notify_logout"
                  onClick={this.props.userLogout}
                >
                  Logout
                </span>
              </MessageBar>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  userLogout: userLogout,
  getDiaryAction: getDiaryAction,
  addDiaryDay: addDiaryDay,
  updateDiaryDay: updateDiaryDay,
  findDayAction: findDayAction,
  findByRangeAction: findByRangeAction
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
