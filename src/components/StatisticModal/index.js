import React from "react";

const Statistic = ({ stats }) => {
  return (
    <table className="stats__table">
      <tbody>
        <tr>
          <td className="stats__table_number">
            {stats.totalDays}
          </td>
          <td className="stats__table_label">
            total days
          </td>
        </tr>
        <tr>
          <td className="stats__table_number">
            {stats.totalWords}
          </td>
          <td className="stats__table_label">
            total words
          </td>
        </tr>
        <tr>
          <td className="stats__table_number">
            {stats.avarageWordsPerDay}
          </td>
          <td className="stats__table_label">
            avarage words per day
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Statistic;
