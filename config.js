/*jslint node: true */
"use strict";

var config = {};

config.email = {};
config.email.auth = {};

config.email.host = 'smtp.gmail.com';
config.email.port = 465;
config.email.secure = true;
config.email.auth.user = 'xxxxxxxx@gmail.com';
config.email.auth.pass = 'xxxxxxxxxxxxxxxx';

config.muellshack = {};
config.muellshack.url = 'http://openhab.shack/muellshack/';
config.muellshack.types = ['gelber_sack', 'papiermuell', 'restmuell'];

module.exports = config;

