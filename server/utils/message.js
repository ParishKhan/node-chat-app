const moment = require('moment');

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().format('h:mm a')
  }
}

const generateLocationMessage = (from, lat, lon) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lon}`,
    createdAt: moment().format('h:mm a')
  }
}

module.exports = {generateMessage, generateLocationMessage}