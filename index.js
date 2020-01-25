const subtitle = `2
00:02:52,806 --> 00:02:54,773
Sample text
`;
const offset = -15600;
const timeSeparator = " --> ";
let rowNum = 1;
let newSubtitle = "";
const parseTime = timeStr => {
  const [hrs, min, sec] = timeStr.replace(",", ".").split(":");
  return parseInt((hrs * 60 * 60 + min * 60 + sec * 1) * 1000);
};
const formatTime = timeMs =>
  [
    ("00" + parseInt(timeMs / 60 / 60 / 1000)).slice(-2),
    ("00" + parseInt((timeMs / 60 / 1000) % 60)).slice(-2),
    ("00" + parseInt(((timeMs / 1000) % 60) % 60)).slice(-2)
  ].join(":") +
  "," +
  ("000" + (timeMs % 1000)).slice(-3);
const addOffset = (time, offset) => parseTime(time) + offset;

for (const [i, section] of subtitle.split(/^\n+/m).entries()) {
  const [, time, ...text] = section.split("\n");
  const [start, end] = time.split(timeSeparator);
  if (!start || !end) {
    console.error("corrupt section:", section);
    continue;
  }

  newSubtitle += [
    rowNum++,
    "\n",
    formatTime(addOffset(start, offset)),
    timeSeparator,
    formatTime(addOffset(end, offset)),
    "\n",
    text.join("\n"),
    "\n"
  ].join("");
}

console.log(newSubtitle);
