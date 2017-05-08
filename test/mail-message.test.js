/*jslint node: true, mocha: true */
/*jslint plusplus: true */
"use strict";

// Require chai.js expect module for assertions
var expect = require('chai').expect;

var mail_message = require('../lib/mail-message');

// Create a new test suite
suite("mail-message", function() {

	test("check_no_date", function() {
		expect( mail_message.get_mail_options('', '') ).to.deep.equal(false);
		expect( mail_message.get_mail_options('falscher_eintrag', '') ).to.deep.equal(false);
		expect( mail_message.get_mail_options('gelber_sack', '') ).to.deep.equal(false);
	});
	test("check_wrong_date", function() {
		expect( mail_message.get_mail_options('', '2016-00-00') ).to.deep.equal(false);
		expect( mail_message.get_mail_options('falscher_eintrag', '2016-00-00') ).to.deep.equal(false);
		expect( mail_message.get_mail_options('gelber_sack', '2016-00-00') ).to.deep.equal(false);
	});
	test("check_correct_date", function() {
		expect( mail_message.get_mail_options('', '2016-01-01') ).to.deep.equal(false);
		expect( mail_message.get_mail_options('falscher_eintrag', '2016-01-01') ).to.deep.equal(false);
		expect( mail_message.get_mail_options('gelber_sack', '2016-01-01') ).to.deep.not.equal(false);
	});

	test("check_gelber_sack_property", function() {
		expect( mail_message.get_mail_options('gelber_sack', '2016-01-01') ).to.have.property('from');
		expect( mail_message.get_mail_options('gelber_sack', '2016-01-01') ).to.have.property('to');
		expect( mail_message.get_mail_options('gelber_sack', '2016-01-01') ).to.have.property('subject');
		expect( mail_message.get_mail_options('gelber_sack', '2016-01-01') ).to.have.property('text');
	});

	test("check_subject", function() {
		expect( mail_message.get_mail_options('gelber_sack', '2016-01-01').subject ).to.deep.equal('[SMMS] Gelber Sack wird morgen abgeholt');
		expect( mail_message.get_mail_options('restmuell',   '2016-01-01').subject ).to.deep.equal('[SMMS] Restmüll wird morgen abgeholt');
		expect( mail_message.get_mail_options('papiermuell', '2016-01-01').subject ).to.deep.equal('[SMMS] Papiermüll wird morgen abgeholt');
	});

	test("check_output_gelber_sack", function() {
		expect( mail_message.get_mail_options('gelber_sack', '2016-01-01') ).to.deep.equal(
			{
				from: '"shack Muell Mailer Service " <xxxxxxxx@gmail.com>',
				to: '"Mitgliedermailingliste shack e.V." <mitglieder@lists.shackspace.de>',
				subject: '[SMMS] Gelber Sack wird morgen abgeholt',
				text: 'Hallo shack,\n\nMorgen ( Freitag, 01. Januar 2016 ) wird der Gelber Sack abgeholt.\n\nBitte bringe den Müll nach unten und die Gelben Säcke die im Aufzugsvorraum stehen\nvor an die Ulmer Straße neben den Laternenmast!\n\nDieser Service wird präsentiert von:\n[SMMS] shack Muell Mailer Service [0]\n\n[0] http://shackspace.de/wiki/doku.php?id=muellabholung'
			}
		);
	});
	test("check_output_gelber_sack_text", function() {
		expect( mail_message.get_mail_options('gelber_sack', '2016-01-01').text ).to.deep.equal(
				'Hallo shack,\n\nMorgen ( Freitag, 01. Januar 2016 ) wird der Gelber Sack abgeholt.\n\nBitte bringe den Müll nach unten und die Gelben Säcke die im Aufzugsvorraum stehen\nvor an die Ulmer Straße neben den Laternenmast!\n\nDieser Service wird präsentiert von:\n[SMMS] shack Muell Mailer Service [0]\n\n[0] http://shackspace.de/wiki/doku.php?id=muellabholung'
		);
		expect( mail_message.get_mail_options('restmuell', '2016-02-02').text ).to.deep.equal(
				'Hallo shack,\n\nMorgen ( Dienstag, 02. Februar 2016 ) wird der Restmüll abgeholt.\n\nBitte bringe den Müll nach unten und lass die Mülltone aufgeschlossen!\n\nDieser Service wird präsentiert von:\n[SMMS] shack Muell Mailer Service [0]\n\n[0] http://shackspace.de/wiki/doku.php?id=muellabholung'
		);
		expect( mail_message.get_mail_options('papiermuell', '2016-03-03').text ).to.deep.equal(
				'Hallo shack,\n\nMorgen ( Donnerstag, 03. März 2016 ) wird der Papiermüll abgeholt.\n\nBitte bringe den Müll nach unten und lass die Mülltone aufgeschlossen!\n\nDieser Service wird präsentiert von:\n[SMMS] shack Muell Mailer Service [0]\n\n[0] http://shackspace.de/wiki/doku.php?id=muellabholung'
		);
	});
});
