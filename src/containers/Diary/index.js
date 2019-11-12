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
  SearchBox,
  Spinner,
  SpinnerSize
} from "office-ui-fabric-react";
import { CSSTransition } from "react-transition-group";

import { userLogout } from "../../_actions/user.actions";
import {
  getDiaryAction,
  addDiaryDay,
  updateDiaryDay,
  findDayAction,
  findByRangeAction,
  findByTextAction,
  clearFindedResults,
  importDiary,
  exportDiaryAction,
  deleteAllAction,
  hideError
} from "../../_actions/diary.actions";

import {
  downloadJSON,
  downloadTXT,
  downloadCSV
} from "../../_helpers/download";
import { getStats } from "../../_helpers/stats";

import { Day, MiniDay } from "../../components/Day";

import Modal from "../../components/Modal";
import StatisticModal from "../../components/StatisticModal";
import ExportModal from "../../components/ExportModal";
import SettingsModal from "../../components/SettingsModal";
import AboutModal from "../../components/AboutModal";

class Diary extends React.Component {
  constructor(props) {
    super(props);
    moment.locale();

    this.handleDayClick = this.handleDayClick.bind(this);

    this.state = {
      selectedDate: moment().startOf("date"),
      monthSelected: moment().startOf("month"),
      stats: {},
      deletedDaysResult: null,

      showSidebar: window.innerWidth >= 740 ? true : false,
      showStatsModal: false,
      showSettingsModal: false,
      showExportModal: false,
      showResultModal: false,
      showAboutModal: false
    };

    window.addEventListener("resize", this.windowResize);

    initializeIcons();
  }

  componentDidMount() {
    this.props.findByRangeAction(
      this.props.user.user.token,
      this.props.user.user.id,
      this.state.monthSelected.startOf("month").toDate(),
      this.state.monthSelected.endOf("month").toDate()
    );
  }

  windowResize = () => {
    if (window.innerWidth >= 740) {
      this.setState({ showSidebar: true });
    }
  };

  addDay = text => {
    this.props.addDiaryDay(
      this.props.user.user.token,
      this.props.user.user.id,
      text,
      moment(this.state.selectedDate)
        .startOf("date")
        .format("YYYY-MM-DD")
    );
  };

  updateDay = (id, text) => {
    this.props.updateDiaryDay(
      this.props.user.user.token,
      this.props.user.user.id,
      id,
      text
    );
  };

  deleteAll = () => {
    this.props
      .deleteAllAction(this.props.user.user.token, this.props.user.user.id)
      .then(count => {
        this.setState({
          showSettingsModal: false,
          showResultModal: true,
          deletedDaysResult: `Deleted ${count} days.`
        });
      })
      .catch(err => {
        this.setState({
          showSettingsModal: false,
          showResultModal: true,
          deletedDaysResult: `Error: ${err}`
        });
      });
  };

  findByRange = () => {
    const dateState = this.state.monthSelected.clone();
    const period = {
      start: dateState.startOf("month").toDate(),
      end: dateState.endOf("month").toDate()
    };

    this.props.findByRangeAction(
      this.props.user.user.token,
      this.props.user.user.id,
      period.start,
      period.end
    );
  };

  handleDayClick = day => {
    this.setState({
      selectedDate: moment(day).startOf("date")
    });
  };

  goToMonth = month => {
    this.setState(
      {
        monthSelected: moment(month)
      },
      () => this.findByRange()
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

  navbar = params => {
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
  };

  importJSON = () => {
    this.props
      .importDiary(this.props.user.user.token, this.props.user.user.id)
      .then(data => {
        const obj = data.map(day => {
          return {
            date: moment(day.dayDate).format("DD.MM.YYYY"),
            text: day.day
          };
        });

        downloadJSON(obj);
      })
      .catch(err => {
        console.error(err);
      });
  };

  importTXT = () => {
    this.props
      .importDiary(this.props.user.user.token, this.props.user.user.id)
      .then(data => {
        const obj = data.map(day => {
          return {
            date: moment(day.dayDate).format("DD.MM.YYYY"),
            text: day.day
          };
        });

        downloadTXT(obj);
      })
      .catch(err => {
        console.error(err);
      });
  };

  importCSV = () => {
    this.props
      .importDiary(this.props.user.user.token, this.props.user.user.id)
      .then(data => {
        const obj = data.map(day => {
          return {
            date: moment(day.dayDate),
            text: day.day
          };
        });

        downloadCSV(obj);
      })
      .catch(err => {
        console.error(err);
      });
  };

  showStats = () => {
    this.props
      .importDiary(this.props.user.user.token, this.props.user.user.id)
      .then(data => {
        const obj = data.map(day => {
          return {
            date: moment(day.dayDate).format("DD.MM.YYYY"),
            text: day.day
          };
        });

        const stats = getStats(obj);
        this.setState({
          stats,
          showStatsModal: true
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

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
                <div className="diary-container__title-container_options">
                  {this.props.diary.pending && (
                    <Spinner size={SpinnerSize.medium} />
                  )}
                  <IconButton
                    menuProps={{
                      items: [
                        {
                          key: "statisticsMessage",
                          text: "Statistics",
                          onClick: this.showStats,
                          iconProps: { iconName: "StackedLineChart" }
                        },
                        {
                          key: "uploadJSONEvent",
                          text: "Export from CSV",
                          onClick: () => {
                            this.setState({
                              showExportModal: true
                            });
                          },
                          iconProps: { iconName: "Upload" }
                        },
                        {
                          key: "importJSONEvent",
                          text: "Import JSON",
                          onClick: this.importJSON,
                          iconProps: { iconName: "Download" }
                        },
                        {
                          key: "saveTXTEvent",
                          text: "Import TXT",
                          onClick: this.importTXT,
                          iconProps: { iconName: "Download" }
                        },
                        {
                          key: "saveCSVEvent",
                          text: "Import CSV",
                          onClick: this.importCSV,
                          iconProps: { iconName: "Download" }
                        },
                        {
                          key: "settingsEvent",
                          text: "Settings",
                          onClick: () => {
                            this.setState({
                              showSettingsModal: true
                            });
                          },
                          iconProps: { iconName: "Settings" }
                        },
                        {
                          key: "signOutEvent",
                          text: "Sign out",
                          onClick: this.props.userLogout,
                          iconProps: { iconName: "FollowUser" }
                        },
                        {
                          key: "aboutEvent",
                          text: "About",
                          onClick: () =>
                            this.setState({ showAboutModal: true }),
                          iconProps: { iconName: "Info" }
                        }
                      ],
                      directionalHintFixed: true
                    }}
                    iconProps={{
                      iconName: "Settings"
                    }}
                    title="Settings"
                    ariaLabel="Settings"
                  />
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
                <CSSTransition
                  in={this.state.showSidebar}
                  timeout={400}
                  classNames="diary-container__main_calendar-container-animation"
                  unmountOnExit
                >
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
                                      ).startOf("date");

                                      this.setState(
                                        {
                                          selectedDate: newDate,
                                          monthSelected: newDate
                                        },
                                        () => this.findByRange()
                                      );
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
                </CSSTransition>
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
        {this.props.diary.errorMsg && !this.state.showExportModal && (
          <div className="diary-notifications-list">
            <div className="diary-notifications-list__notify">
              <MessageBar
                messageBarType={MessageBarType.error}
                isMultiline={false}
                onDismiss={this.props.hideError}
                dismissButtonAriaLabel="Close"
              >
                {this.props.diary.errorMsg}
              </MessageBar>
            </div>
          </div>
        )}
        <Modal
          title="Statistic"
          show={this.state.showStatsModal}
          hide={() => this.setState({ showStatsModal: false })}
        >
          <StatisticModal stats={this.state.stats} />
        </Modal>

        <SettingsModal
          title="Settings"
          show={this.state.showSettingsModal}
          hide={() => this.setState({ showSettingsModal: false })}
          options={{
            deleteAll: this.deleteAll
          }}
          pending={this.props.diary.pending}
        />

        <ExportModal
          title="Export from CSV"
          show={this.state.showExportModal}
          hide={() => this.setState({ showExportModal: false })}
          user={{
            token: this.props.user.user.token,
            id: this.props.user.user.id
          }}
          upload={this.props.exportDiaryAction}
          pending={this.props.diary.pending}
        />

        <AboutModal
          title="About"
          show={this.state.showAboutModal}
          hide={() => this.setState({ showAboutModal: false })}
        />

        <Modal
          title="Delete result"
          show={this.state.showResultModal}
          hide={() => this.setState({ showResultModal: false })}
        >
          <span>{this.state.deletedDaysResult}</span>
        </Modal>
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
  clearFindedResults: clearFindedResults,
  importDiary: importDiary,
  exportDiaryAction: exportDiaryAction,
  deleteAllAction: deleteAllAction,
  hideError: hideError
};

const mapStateToProps = state => {
  const { user, diary } = state;

  return { user, diary };
};

const connectedDiary = connect(mapStateToProps, mapDispatchToProps)(Diary);
export { connectedDiary as Diary };
