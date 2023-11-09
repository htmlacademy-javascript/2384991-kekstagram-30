//Функция, проверяющая длину строки
const checkStringLenght = (inputString, maxLength) => inputString.length <= maxLength;

checkStringLenght('проверяемая строка', 20);
checkStringLenght('проверяемая строка', 18);
checkStringLenght('проверяемая строка', 10) ;

//Функция, проверяющая, является ли слово палиндромом
const isStringPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < normalizedString.length / 2; i++) {
    if (normalizedString.at(i) !== normalizedString.at(-i - 1)) {
      return false;
    }
  }
  return true;
};

isStringPalindrome('тоПот');
isStringPalindrome('Леша на полке клопа нашел ');

//Дополнительное задание

const extractNumber = (arg) => {
  const string = arg.toString();
  let result = '';

  for (let i = 0; i < string.lenght; i++) {
    if (!Number.isNan(parseInt(string[i], 10))) {
      result += string[i];
    }
  }

  return parseInt(result, 10);
};

extractNumber('2023 год');
extractNumber('ECMAScript 2022');
extractNumber('1 кефир, 0.5 батона');
extractNumber('агент 007');
extractNumber('а я томат');

//Module5-task2

const isMeetingInWorkTime = function (workBegin, workEnd, meetingBegin, time) {
  const convertedWorkBegin = parseInt(workBegin.split(':')[0], 10) * 60 + parseInt(workBegin.split(':')[1], 10);
  const convertedWorkEnd = parseInt(workEnd.split(':')[0], 10) * 60 + parseInt(workEnd.split(':')[1], 10);
  const convertedMeetingBegin = parseInt(meetingBegin.split(':')[0], 10) * 60 + parseInt(meetingBegin.split(':')[1], 10);

  return convertedWorkEnd >= convertedMeetingBegin + time && convertedWorkBegin <= convertedMeetingBegin;
};

isMeetingInWorkTime('08:00', '17:30', '14:00', 90); // true
isMeetingInWorkTime('8:0', '10:0', '8:0', 120); // true
isMeetingInWorkTime('08:00', '14:30', '14:00', 90); // false
isMeetingInWorkTime('14:00', '17:30', '08:0', 90); // false
isMeetingInWorkTime('8:00', '17:30', '08:00', 900); // false

// первая попытка и трудозатратное решение

/* let isMeetingInWorkTime = function (workBegin, workEnd, meetingBegin, time) {
  const splitMeeting = meetingBegin.split(':');
  let hours = parseInt(splitMeeting[0], 10);
  let minutes = parseInt(splitMeeting[1], 10);

  if (time === 60) {
    hours++;
  }

  if (time >= 120) {
    const additionalHours = Math.floor(time / 60);
    hours += additionalHours;
    const remainingMinutes = time % 60;
    minutes += remainingMinutes;

    if (minutes >= 60) {
      hours++;
      minutes -= 60;
    }
  } else {
    if (minutes + time < 60) {
      minutes = minutes + time;
    } else {
      hours++;
      minutes = time - (60 - minutes);
    }
  }

  const meetingEnd = `${hours}:${minutes}`;
  return meetingEnd <= workEnd;
};*/

