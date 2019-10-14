[TOC]
# FireShare

A publish-subscribe real-tive file sharing system.

Live: https://austinph.me/FireShare/login

## Features

- Login, Register, Authentication using JWT Token.
- Database.
- Upload/Share/Unshare/Edit/Remove/Download file with other people - with Authentication
- Pub-sub model on file with real time update.

### What can user do?

1. User can create an account/register an account. To register, the email must not be used by any other user.
2. Owner can upload/share/delete his file with anyone who is in the system.
3. If owner shared with someone, owner can remove his file from sharing with that person, or choose not to share with anyone.
4. Owner can rename the file - **by clicking at the name of the file**.
5. User can see which file is shared with him, he can choose to unshare it if he wants.
6. User have real-time update on the file he subscribes (is shared/owned) to.
7. User can download if the file is shared to him or is owned by him. - Only user who has these privilege can download the file

## Technology used

- Backend: **NodeJS**, **Express**
- Database: **MongoDB Atlas** 
- FrontEnd: **ReactJS**
- Pub-Sub: **Socket.IO**
- Testing: 
  - Backend: **Mocha**, **Chai**, 
  - Frontend: **WebdriverIO**
- Cloud Hosting: **Heroku** (because I expired my other clouds credit),  **Github Page**.

## Approach

### Tech stack selection

- I seperated back/front end to make it easier for you guys to see the structure.
- Backend I used NodeJS, for frontend I use ReactJS (which I’m most familiar with) as they can share the same dependencies and same type of language. Later on, if i want to combine the 2 folders, I can reuse the dependencies easily.
- I chose MongoDB Atlas (cloud) as I expected to deploy on cloud. Thus, it’s easier.
- I chose Socket.IO as it’s really quick and easy for setting up
- I chose WebdriverIO as I want to stimulate real user interaction with the system.
- I chose Chai, Mocha as it is one of the most efficient testing framework.

### Coding Structure

- **Class structure**: I seperated both back-front end into different class/directories regarding to its functionalities

- **Variable name and Commenting**: I only comment if neccessary, instead I tried to name the variable the way to make it easier to read even without commenting.
- **Branching and use of git**: 
  - I used github issues as a todo list. Therefore, you will see all the branches with a number before which matches to my github issues.
  - I have `master-dev-feature` branches for my development. For `hotfix`, sometimes I just push to `dev_branch` which is bad practice but due to time constraint, I have to fast up the development.

## Challenge

- I exprienced most of the challenge with Routing for front-end. I had to use a work-around in order to pass the JWT token around, which I’m sure there will be much of an easier way to do.
- I got trouble in delivering the file name from back-end to front-end as my client doesn’t receive `content-disposition` header, which I then renamed based on front-end file, which is not really a good practice.
- Short time on development since I have assignments due during the development week. Thus, short time on writing unit tests as well.
- For “aesthetic”, I combined the traditional file input (choose file button) with the drag & drop zone (either drag and drop the file or click into the div to select file), which makes it harder for chromedriver to recognise as I’m not able to set value of the file if the driver can’t see the traditional file input. I haven’t found out the way to stimulate drag and drop for testing yet.
- Pub-Sub model does the work but not really well. It’s a bit slow especially on Heroku.

### What would I do differently if I had time to work on it

- I would write all test first - more scenarios, to get the overall of the project.
- Use Firebase Realtime Storage with Firebase Function instead of MongoDB and Socket for pub-sub models.
- Avoid using bootstrap for faster loading time.
- I have to keep the storage folder for some of the test to work. But later on if I have time, I will stimulate a different database just for testing.
- I will combine the 2 folders as it will reduce the load time by sharing some of the dependencies.

## How to run

Go to backend, install and start the server

```bash
cd backend/
npm install && npm start
```

Server should be in `localhost:5000`. Please reserve this port for the application, else you can modify it in `Constants.js`, `backend/test/basic.js`



Go to frontend, install and start the server

```bash
cd frontend/
npm install && npm start
```

You can access the website in `localhost:3000` by default



### For testing:

Please leave both front-back end application on.

Frontend

```bash
cd frontend/
npm run test
```

> Your chrome browser’s version has to be 77 and above for the test to run.

Backend

```
cd backend/
npm run test
```



That’s it. Now enjoy the application running (hopefully).