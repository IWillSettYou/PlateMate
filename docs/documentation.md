# Plate Mate Documentation
#### *Taste the difference*
## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Development Environment](#Development-Environment)
4. [User Documentation](#User-Documentation)
5. [Recap](#Recap)
6. [References](#References)

## Introduction
#### The purpose of the software
PlateMate is an innovative solution to help restaurants modernise and digitally transform their customer and order management system. The system is designed to simplify and optimise restaurant operations while providing a convenient and seamless experience for guests. The software enables faster and more efficient service, reducing wait times and increasing customer satisfaction. It enables restaurants to keep pace with modern consumer demands and provide a hassle-free, enjoyable experience for guests. It also provides an easy-to-use interface, even from your phone, to report and track changes at any time of the day. Once installed, the software is up and running as soon as the necessary changes have been made.
#### For whom and why?
It is recommended for all restaurants without a digital solution and with an outdated system. For restaurant owners it offers the possibility to optimise operations, automate reservations and orders, saving time and resources. Employees can track orders more easily, resulting in faster and more accurate service, thus reducing the potential for errors. The system also makes dining smoother and more convenient, increasing satisfaction and the likelihood of vendors returning to the restaurant.

## Installation

To install the project to your machine, you first need to import the database to your pc. To do this, just import the project's .sql file into your database. The file is located in the 'db' folder.

To start a database server, we decided to use MySql, which you can comfortably run by installing [xampp control panel](https://www.apachefriends.org/download.html). After you installed xampp, just start it on your computer, run the apache and mysql servers and go to [localhost/phpmyadmin](http://localhost/phpmyadmin) to log in to your database. To log in, just use the default credentials if you haven't changed them, aka(user: root; pwd:;) and you can import the .sql file here.


After you are done with this, then you should do an 
```shell
    npm install
```
in both the /client/, and the /server/ folders.

After that you just need to start the backend, then the frontend by running:

```shell
    node .
```
or
```shell
    node app.js
```
in the /server/ folder, and:

```shell
    npmr run dev
```
in the /client/ folder.

You need to have both instances running at the same time, 3 with the database running as well.

If you've done everything correctly, the project should be up and running at [localhost:5173](http://localhost:5173). 
If the project is not running there, please double-check the vite.config.js, the .env, the app.js, to see if the appropriate configuration is applied or not.

