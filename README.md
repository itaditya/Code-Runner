[![GitHub package version](https://img.shields.io/github/package-json/v/itaditya/Code-Runner.svg?style=flat-square)](https://github.com/itaditya/Code-Runner) [![Dependencies](https://david-dm.org/itaditya/Code-Runner.svg?style=flat-square)](https://github.com/itaditya/Code-Runner/network/dependencies) [![GitHub issues](https://img.shields.io/github/issues/itaditya/Code-Runner.svg?style=flat-square)](https://github.com/itaditya/Code-Runner/issues) [![GitHub pull requests](https://img.shields.io/github/issues-pr/itaditya/Code-Runner.svg?style=flat-square)](https://github.com/itaditya/Code-Runner/pulls) [![GitHub contributors](https://img.shields.io/github/contributors/itaditya/Code-Runner.svg?style=flat-square)](https://github.com/itaditya/Code-Runner/graphs/contributors) [![GitHub last commit](https://img.shields.io/github/last-commit/itaditya/Code-Runner.svg?style=flat-square)](https://github.com/itaditya/Code-Runner/commits/master) [![Heroku](http://heroku-badge.herokuapp.com/?app=codingrunner&style=flat)](codingrunner.herokuapp.com)
 
## Description

 Code Runner is an online portal where a user can code in various languages and get the output of the program. Compile time and Run time errors are also shown. User has the ability to add custom input also.

![](https://i.imgur.com/8zOVrfH.gif)

## Future Implementations

 1. Code saving in LocalStorage
 2. Code sharing with permanent url (public/private).
 3. Live code monitoring - One can see changes done by other in realtime. (Useful for coding interviews).
 4. Keyboard Control
 5. Refactor
 6. Code annotation and an open chat for particular code. (Useful for a user to help debug other's code)
 
## Currently Supported Languages
 1. Python
 2. Java
 3. Javascript

## How to Contribute

 There are various ways you can contribute to this project.

  1. Star the repo and share it with others
  2. Try it out and report bugs.
  3. Help me squash these bugs by making neat PRs.

## Steps to Setup Locally

 1. Fork and clone the repo.
 2. In project directory, run `npm i`.
 3. Go to [glot.io](https://glot.io/account/token), sign in and copy the auth token.
 4. On terminal run `echo GLOT_TOKEN='your-token' > .env`.
 5. Now run `npm start` to start the server.
 6. Run `npm run client` to start webpack build task.

  Note - If you don't have webpack installed globally then run `npm i -g webpack`.
