import React from "react";

const StatisticModal = ({ stats, hide }) => {
  return (
    <div className="stats">
      <div className="stats__modal">
        <div className="stats__modal_container">
          <div className="stats__modal_container_header">
            <div className="stats__modal_container_header_title">
              <span>Statistic</span>
            </div>
            <div className="stats__modal_container_header_options">
              <button
                className="stats__modal_container_header_options_btn"
                onClick={hide}
              >
                <i className="mi mi-ChromeClose"></i>
              </button>
            </div>
          </div>
          <div className="stats__modal_container_body">
            <table className="stats__modal_container_body_table">
              <tbody>
                <tr>
                  <td className="stats__modal_container_body_table_number">
                    {stats.totalDays}
                  </td>
                  <td className="stats__modal_container_body_table_label">
                    total days
                  </td>
                </tr>
                <tr>
                  <td className="stats__modal_container_body_table_number">
                    {stats.totalWords}
                  </td>
                  <td className="stats__modal_container_body_table_label">
                    total words
                  </td>
                </tr>
                <tr>
                  <td className="stats__modal_container_body_table_number">
                    {stats.avarageWordsPerDay}
                  </td>
                  <td className="stats__modal_container_body_table_label">
                    avarage words per day
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="stats__shadow" onClick={hide} />
    </div>
  );
};

export default StatisticModal;
