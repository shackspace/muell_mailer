/*jslint node: true */
"use strict";

var moment = require('moment');
moment.locale('de-DE');

function get_mail_options(muellarg, date) {
    var muellname = false,
        datestr = null,
        mailOptions = {};

    switch (muellarg) {
    case 'gelber_sack':
        muellname = 'Gelber Sack';
        break;
    case 'restmuell':
        muellname = 'Restmüll';
        break;
    case 'papiermuell':
        muellname = 'Papiermüll';
        break;
    default:
        return false;
    }

    date = moment(date);

    if (date.isValid() === false)
        return false;

    datestr = date.format("dddd, DD. MMMM YYYY");

    mailOptions.from = '"shack Muell Mailer Service " <xxxxxxxx@gmail.com>'; // sender address
    mailOptions.to = '"Mitgliedermailingliste shack e.V." <mitglieder@lists.shackspace.de>'; // list of receivers
    mailOptions.subject = '[SMMS] ' + muellname + ' wird morgen abgeholt'; // Subject line
    mailOptions.text = 'Hallo shack,\n\nMorgen ( ' + datestr + ' ) wird der ' + muellname + ' abgeholt.\n\n' +
        'Bitte bringe den Müll nach unten ';

    if (muellarg === 'gelber_sack') {
        mailOptions.text += 'und die Gelben Säcke die im Aufzugsvorraum stehen\nvor an die Ulmer Straße neben den Laternenmast!\n\n';
    } else {
        mailOptions.text += 'und lass die Mülltone aufgeschlossen!\n\n';
    }

    mailOptions.text += 'Dieser Service wird präsentiert von:\n[SMMS] shack Muell Mailer Service [0]\n\n' +
        '[0] http://shackspace.de/wiki/doku.php?id=muellabholung';

    return mailOptions;
}

module.exports = {
    get_mail_options: get_mail_options
};

