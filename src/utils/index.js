import moment from "moment/moment"
import * as React from "react"

class DateFormatter {
  onlyMonthXYear(params = new Date()) {
    return moment(params).format("MMMM YYYY")
  }
}

function formatNumber(number = "") {
  if (number === undefined) return "0"
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return screenWidth;
};

export {
  DateFormatter,
  formatNumber
}