const addLeadingZero = (value) => (value < 10) ? `0${value}` : value;

const addTimezonOffset = (date, time) => {
  console.log('>>>>>> addTimezonOffset', date.toString())
  const match = /GMT\+\d+/.test(date.toString());
  let result = time;

  if (match) {
    result = time + date.getTimezoneOffset() * 60000;
  }

  return result;
};

export default function (unixTimestamp, locale = 'en-US') {
  const date = new Date(unixTimestamp * 1000);
  console.log('data', date);
  const utc = date.getTime();
  console.log('utc', utc);
  const finalDate = new Date(addTimezonOffset(date, utc));
  console.log('finalDate', finalDate);

  const year = finalDate.getFullYear();
  let month = finalDate.getMonth() + 1;
  let day = finalDate.getDate();
  let hours = finalDate.getHours();
  let minutes = finalDate.getMinutes();
  const weekDay = finalDate.getDay();

  month = addLeadingZero(month);
  day = addLeadingZero(day);
  hours = addLeadingZero(hours);
  minutes = addLeadingZero(minutes);

  const localeDateString = finalDate.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  console.log('localeDateString', localeDateString);

  return {
    localeDateString,
    weekDay,
    day,
    month,
    year,
    hours,
    minutes
  };
}

