const request = require("request");

const notifyLine = (msg) => {
  request({
    //ส่งไปที่ไหน
    uri: `https://notify-api.line.me/api/notify`,
    method: "POST",
    //token from https://notify-bot.line.me/en/
    auth: {
      bearer: "kcWLbkTlKo6JTH9uMvfVn4MUK8smhIEpP9thF6EO8qS",
    },
    form: {
      message: msg,
    },
  });
};

module.exports = notifyLine;
