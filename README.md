![Logo](/logo.jpg?raw=true)

[![GitHub package version](https://img.shields.io/github/package-json/v/itaditya/Code-Runner.svg?style=flat-square)](https://github.com/itaditya/Code-Runner) [![Dependencies](https://david-dm.org/itaditya/Code-Runner.svg?style=flat-square)](https://github.com/itaditya/Code-Runner/network/dependencies) [![GitHub issues](https://img.shields.io/github/issues/itaditya/Code-Runner.svg?style=flat-square)](https://github.com/itaditya/Code-Runner/issues) [![GitHub pull requests](https://img.shields.io/github/issues-pr/itaditya/Code-Runner.svg?style=flat-square)](https://github.com/itaditya/Code-Runner/pulls) [![GitHub contributors](https://img.shields.io/github/contributors/itaditya/Code-Runner.svg?style=flat-square)](https://github.com/itaditya/Code-Runner/graphs/contributors) [![GitHub last commit](https://img.shields.io/github/last-commit/itaditya/Code-Runner.svg?style=flat-square)](https://github.com/itaditya/Code-Runner/commits/master) [![Heroku](http://heroku-badge.herokuapp.com/?app=codingrunner&style=flat)](codingrunner.herokuapp.com)

## Description

 Code Runner is an online portal where a user can code in various languages and get the output of the program. Compile time and Run time errors are also shown. User has the ability to add custom input also.



![](https://i.imgur.com/8zOVrfH.gif)

## Roadmap

 [x] Run Github Gists.
 [ ] Code saving in LocalStorage.
 [x] Code sharing with permanent url (public/private).
 [ ] Live code monitoring - One can see changes done by other in realtime. (Useful for coding interviews).
 [ ] Keyboard Control
 [ ] Refactor
 [ ] Code annotation and an open chat for particular code. (Useful for a user to help debug other's code)

## Currently Supported Languages
 1. Python
 2. C
 3. C++
 4. Java
 5. Javascript

## Steps to Setup Locally

 1. Fork and clone the repo.
 2. In project directory, run `npm i`.
 3. Duplicate `.env.example` file and rename the new file to `.env`.
 4. Sign up on [glot.io](https://glot.io), then go [here](https://glot.io/account/token).
 5. Open the `.env` file and put the glot token in the `GLOT_TOKEN` field.
 6. Now run `npm start` to start the server.
 7. Run `npm run client` to start webpack build task.
