export function shortenNumber(number: number): string {
  if (number < 1000) {
    return number.toString();
  }
  let shortenedNumber = number / 1000;
  while (shortenedNumber >= 1000) {
    shortenedNumber /= 1000;
  }
  let shortenedNumberStr = shortenedNumber.toFixed(1);
  if (shortenedNumberStr.endsWith(".0")) {
    shortenedNumberStr = shortenedNumberStr.slice(0, -2);
  }
  if (number >= 1000000000) {
    shortenedNumberStr += "B";
  } else if (number >= 1000000) {
    shortenedNumberStr += "M";
  } else if (number >= 1000) {
    shortenedNumberStr += "K";
  }
  return shortenedNumberStr;
}
