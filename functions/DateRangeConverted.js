function formatEventDateRange(startDate, endDate) {
    // Convert the date strings into JavaScript Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Format date to get day, month, and year parts
    const formatDay = (date) => date.getDate(); // Day
    const formatMonth = (date) => date.toLocaleString('default', { month: 'long' }); // Full month name

    const startDay = formatDay(start);
    const endDay = formatDay(end);
    const startMonth = formatMonth(start);
    const endMonth = formatMonth(end);

    if (startMonth === endMonth) {
        // If the months are the same, display in the "25th-27th September" format
        return `${startDay}th-${endDay}th ${startMonth}`;
    } else {
        // If the months are different, display in the "25th September to 27th October" format
        return `${startDay}th ${startMonth} to ${endDay}th ${endMonth}`;
    }
}

module.exports = {formatEventDateRange}