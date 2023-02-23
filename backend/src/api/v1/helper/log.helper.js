const fs = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");

const filename = path.join(__dirname, "../logs", "log.log");

const logEvents = async (msg) => {
    const dateTime = `${format(new Date(), "dd-MM-YYYY\tHH:mm:ss")}`;
    const contentLog = `${dateTime} ------- ${msg}\n`;

    try {
        fs.appendFile(filename, contentLog);
    } catch (error) {
        console.log(error);
    }
};

module.exports = logEvents;
