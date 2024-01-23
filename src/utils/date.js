import dayjs from "dayjs";

export const format = {
  monthName: 'DD-MMM-YYYY'
}

export const dateFormatter = (date, format) => {
  return dayjs(date).format(format);
}

export const filterIncomeDataByTimeRange = (data, months) => {
  const currentDate = new Date();
  const filteredData = data.filter((entry) => {
    const entryDate = new Date(entry.date);
    const diffInMonths =
      (currentDate.getFullYear() - entryDate.getFullYear()) * 12 +
      (currentDate.getMonth() - entryDate.getMonth());

    return diffInMonths <= months;
  })

  return filteredData;
}