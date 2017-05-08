/*jslint node: true, mocha: true */
/*jslint plusplus: true */
"use strict";

// Require chai.js expect module for assertions
var expect = require('chai').expect;

var checkDate = require('../lib/checkDate');

// Create a new test suite
suite("checkDate", function() {

	var muellstorage = [];

	test("check_no_date", function() {
		expect( checkDate.checkDate('', '') ).to.deep.equal({retval: false, msg: "Error muelltype is not an array"});
		expect( checkDate.checkDate([], '') ).to.deep.equal({retval: false, msg: "Error muelltype not in muellstorage"});

	muellstorage.gelber_sack = {};
		expect( checkDate.checkDate(muellstorage, 'gelber_sack') ).to.deep.equal({retval: false, msg: "Error muellstorage has no date property"});

	muellstorage.gelber_sack = {date: null, main_action_done: null, mail_sended: null};
		expect( checkDate.checkDate(muellstorage, 'gelber_sack') ).to.deep.equal({retval: false, msg: "Error date is not a date"});

	muellstorage.gelber_sack = {date: false, main_action_done: null, mail_sended: null};
		expect( checkDate.checkDate(muellstorage, 'gelber_sack') ).to.deep.equal({retval: false, msg: "Error date is not a date"});

	muellstorage.gelber_sack = {date: '2016-01-01', main_action_done: null, mail_sended: null};
		expect( checkDate.checkDate(muellstorage, 'gelber_sack') ).to.deep.equal({retval: true});

	});
});
