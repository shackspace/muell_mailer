/*jslint node: true */
"use strict";

var moment = require('moment');

function checkDate(muellstorage, muelltype) {

	if (!Array.isArray(muellstorage)) {
		return {retval: false, msg: "Error muelltype is not an array"};
    }
	if (!(muelltype in muellstorage)) {
		return {retval: false, msg: "Error muelltype not in muellstorage"};
    }
    if (!muellstorage[muelltype].hasOwnProperty("date")) {
		return {retval: false, msg: "Error muellstorage has no date property"};
    }
    if (muellstorage[muelltype].date === false) {
		return {retval: false, msg: "Error date is not a date"};
    }

	var date = moment(muellstorage[muelltype].date);
	if (date.isValid() === false) {
		return {retval: false, msg: "Error date is not a date"};
    }

	return {retval: true};
}

module.exports = {
    checkDate: checkDate
};

