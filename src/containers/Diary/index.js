import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import DayPicker from "react-day-picker";
import {
  initializeIcons,
  MessageBar,
  MessageBarType,
  IconButton,
  MaskedTextField,
  SearchBox
} from "office-ui-fabric-react";

import { userLogout } from "../../_actions/user.actions";
import {
  getDiaryAction,
  addDiaryDay,
  updateDiaryDay,
  findDayAction,
  findByRangeAction,
  findByTextAction,
  clearFindedResults
} from "../../_actions/diary.actions";

import Preloader from "../../components/Preloader";
import { Day, MiniDay } from "../../components/Day";

class Diary extends React.Component {
  constructor(props) {
    super(props);
    moment.locale();

    this.handleDayClick = this.handleDayClick.bind(this);

    this.state = {
      selectedDate: moment().startOf("date"),
      monthSelected: moment().startOf("month"),

      showSidebar: true
    };

    window.addEventListener("resize", this.windowResize);

    initializeIcons();
  }

  windowResize = () => {
    if (window.innerWidth >= 740) {
      this.setState({ showSidebar: true });
    }
  };

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

  updateDay(id, text) {
    this.props.updateDiaryDay(
      this.props.user.user.token,
      this.props.user.user.id,
      id,
      text
    );
  }

  findByRange = () => {
    this.props.findByRangeAction(
      this.props.user.user.token,
      this.props.user.user.id,
      this.state.monthSelected.startOf("month").toDate(),
      this.state.monthSelected.endOf("month").toDate()
    );
  };

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
      this.findByRange
    );
  };

  goToToday = () => {
    this.setState(
      {
        selectedDate: moment().startOf("date"),
        monthSelected: moment().startOf("date")
      },
      this.findByRange
    );
  };

  searchByText = text => {
    this.props.findByTextAction(
      this.props.user.user.token,
      this.props.user.user.id,
      text
    );
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

              <div
                className="diary-container__toogler"
                onClick={() =>
                  this.setState({
                    showSidebar: !this.state.showSidebar
                  })
                }
              >
                <i className="mi mi-GlobalNavigationButton"></i>
              </div>

              <div className="diary-container__main">
                {this.state.showSidebar && (
                  <div className="diary-container__main_calendar-container">
                    <div className="find-text-block">
                      <div className="search-panel">
                        <div className="search-panel__row">
                          <div className="search-panel__row_item">
                            <div className="search-panel__row_item_cont">
                              <SearchBox
                                placeholder="Search by text"
                                onSearch={text => this.searchByText(text)}
                                onClear={this.props.clearFindedResults}
                              />
                            </div>
                            {this.props.diary.foundDays.length > 0 && (
                              <div className="finded-list">
                                <span className="finded-list__title">
                                  Finded days{" "}
                                  {this.props.diary.foundDays.length}:
                                </span>
                                {this.props.diary.foundDays.map(findedDay => {
                                  return (
                                    <MiniDay
                                      key={findedDay._id}
                                      date={moment(findedDay.dayDate).format(
                                        "DD.MM.YYYY"
                                      )}
                                      text={findedDay.day}
                                      onClick={() =>
                                        this.handleDayClick(findedDay.dayDate)
                                      }
                                    />
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {!this.props.diary.foundDays.length > 0 && (
                      <React.Fragment>
                        <div className="search-panel">
                          <div className="search-panel__row">
                            <div className="DayPicker-container">
                              <DayPicker
                                selectedDays={this.state.selectedDate.toDate()}
                                month={this.state.monthSelected.toDate()}
                                modifiers={{
                                  hasDay: this.props.diary.diary.map(
                                    diaryItem => {
                                      return moment(diaryItem.dayDate).toDate();
                                    }
                                  )
                                }}
                                onDayClick={this.handleDayClick}
                                firstDayOfWeek={1}
                                captionElement={() => null}
                                navbarElement={params => this.navbar(params)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="search-panel">
                          <div className="search-panel__row">
                            <div className="search-panel__row_item">
                              <div className="search-panel__row_item_cont">
                                <IconButton
                                  iconProps={{
                                    iconName: "ForwardEvent"
                                  }}
                                  title="Go to today"
                                  ariaLabel="Go to today"
                                  onClick={this.goToToday}
                                />
                              </div>
                            </div>
                            <div className="search-panel__row_item">
                              <div className="search-panel__row_item_cont">
                                <IconButton
                                  iconProps={{
                                    iconName: "CalendarWorkWeek"
                                  }}
                                  title="Go to date"
                                  ariaLabel="Go to date"
                                />
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                )}
                <div className="diary-container__main_new-day-container">
                  <Day
                    date={moment(this.state.selectedDate).format(
                      "dddd, DD.MM.YYYY"
                    )}
                    day={this.props.diary.diary.find(diaryItem => {
                      let firstDate = moment(diaryItem.dayDate).startOf("date");
                      let secondDate = this.state.selectedDate;

                      if (moment(firstDate).isSame(secondDate)) return true;
                      return false;
                    })}
                    save={text => this.addDay(text)}
                    edit={(id, text) => this.updateDay(id, text)}
                  />
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
  findByRangeAction: findByRangeAction,
  findByTextAction: findByTextAction,
  clearFindedResults: clearFindedResults
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
