/*jslint node: true */
/*jslint plusplus: true */
"use strict";

var nodemailer = require('nodemailer');
var Client = require('node-rest-client').Client;
var client = new Client();
var mail_message = require('./lib/mail-message');
var config = require('./config');
var cron = require('node-cron');

var muellstorage = {};

var muelltypes = config.muellshack.types,
    i;
for (i = 0; i < muelltypes.length; i++) {
    muellstorage[muelltypes[i]] = Object.assign({}, {date: null, main_action_done: null, mail_sended: null});
}

console.log(muellstorage);



/*jshint loopfunc: true */
function getMUELL() {
    var muelltypes = config.muellshack.types;
    for (var i = 0; i < muelltypes.length; i++) {
        console.log('GET Request: ' + muelltypes[i]);
        var req = client.get(config.muellshack.url + muelltypes[i], function (data, response) {
            Object.assign(muellstorage[data.muelltype], data);
            checkSendEmail(data.muelltype);
        });

        req.on('requestTimeout', function (req) {
            console.log('request has expired');
            req.abort();
        });
 
        req.on('responseTimeout', function (res) {
            console.log('response has expired');
        });

        //it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts 
        req.on('error', function (err) {
            console.log('request error');
        });
    }
}
/*jshint loopfunc: false */

function checkDate() {
    var muelltypes = config.muellshack.types;
    for (var i = 0; i < muelltypes.length; i++) {
        checkSendEmail(muelltypes[i]);
    }
}

function checkSendEmail(muelltype) {

    if (muelltype !== 'gelber_sack') {
    //    return;
    }

    var limit = 1;
    var dat_limit = new Date(muellstorage[muelltype].date);
    dat_limit = new Date(dat_limit.setDate(dat_limit.getDate() - limit));

    var min_limit = new Date(dat_limit);
    min_limit.setHours(20,26);
    var max_limit = new Date(dat_limit);
    max_limit.setHours(20,33);


    console.log(dat_limit);
    console.log(min_limit);
    console.log(max_limit);

    console.log(new Date());
    if (min_limit < new Date() && max_limit > new Date())
    {
        console.log('Mail senden');

        if(muellstorage[muelltype].mail_sended === true) {
            console.log('Mail ist bereits gesendet');
            return;
        }
        if(muellstorage[muelltype].main_action_done === true) {
            console.log('main_action_done is true, no action needed');
            return;
        }

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport(config.email);

        var mailOptions = mail_message.get_mail_options(muelltype, muellstorage[muelltype].date);

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            muellstorage[muelltype].mail_sended = true;

			var args = {
				data: {mail_sended: true},
				headers: { "Content-Type": "application/json" }
            };

            client.post(config.muellshack.url + muelltype, args, function (data, response) {
                // parsed response body as js object
                console.log('POST {mail_sended: true}');
            });

        });


    } else {
        console.log('Mail nicht senden');
    }

}


getMUELL();

cron.schedule('50 * * * * *', function(){
	getMUELL();
});
cron.schedule('0 * * * * *', function(){
	checkDate();
});

cron.schedule('0 * * * * *', function(){
	console.log(muellstorage);
});

