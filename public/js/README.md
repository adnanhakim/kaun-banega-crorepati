# whiteboard

### A Node.js/Express project for live teacher-student integrated session management using sockets, wherein the student can write, compile, run and post codes and the teacher can edit the codes live

---

## Features

-   Teachers can create rooms using sockets
-   Students can join rooms using a password _(For now it is 123456)_
-   Once student has joined a room, he/she can write code using an editor
-   The student can also compile the code in an online editor
-   Teacher can view the code of any student _live_
-   Teacher can also edit the code of any student _live_
-   The student can then post the code in a dashboard for all other students to see
-   Other students can also download the code and run it locally
-   Students can send messages to teachers if they are not online
-   Teachers can view these messages and reply to them
-   Student can also view all his codes in his profile
-   Dashboard also provides statistics to users such as
    -   No of posts of the day
    -   No of posts of that user

### **(For now only C is supported)**

---

## Technologies Used

-   [node.js](https://nodejs.org/en/ 'node.js')
-   [express](https://www.npmjs.com/package/express 'express') - Web framework
-   [socket.io](https://socket.io/ 'socket.io') - Creation of rooms
-   [ace.js](https://ace.c9.io/ 'ace.js') - Text Editor
-   [compilex](https://www.npmjs.com/package/compilex 'compilex') - Online code compilation
-   [passport.js](https://www.npmjs.com/package/passport, 'passport.js') - User Verification
-   [mongodb](https://www.mongodb.com/, 'MongoDb') - Database

---

## Screenshots

### Dashboard

#### Profile information and statistics on the left, posted codes in the middle and sending offline messages to the teachers on the right

![Dashboard](https://i.imgur.com/0KBAvEg.png?2)

### Room Selection

#### Only teachers can create rooms, and students get information about each room and can join the room by entering the password

![Room Selection](https://i.imgur.com/hQKdkbn.png)

### Room (For the student)

#### Student can edit, compile, run and post only their own code

![Room(Student)](https://i.imgur.com/Y9n73xH.png)

### Room (For the teacher)

#### Teacher can view the online students on the left and can view and edit their code live

![Room(Teacher)](https://i.imgur.com/pv8mLb3.png)
