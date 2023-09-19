import moment from "moment/moment"

class DateFormatter {
  onlyMonthXYear(params = new Date()) {
    return moment(params).format("MMMM YYYY")
  }
}

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export {
  DateFormatter,
  formatNumber
}