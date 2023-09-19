import moment from "moment/moment"

class DateFormatter {
  onlyMonthXYear(params = new Date()) {
    return moment(params).format("MMMM YYYY")
  }
}

export {
  DateFormatter
}