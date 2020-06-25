# Kaun Banega Crorepati

## About

A replication of the popular Indian general knowledge TV game show _Kaun Banega Crorepati (based on Who Wants to be a Millionaire?)_

This web application is developed using node.js/express, trying to best replicate the traditional design to the web. This was developed as a college project. All the lifelines used and its logic is given below.

All the questions used in this application is manually added into MongoDb Atlas using `/addquestion` which is a form created to add the questions. No user data is required.

## Technology Stack

1. Developed using node.js/express
1. Questions stored in MongoDb Atlas

## Libraries Used

-   [node.js](https://nodejs.org/en/)
-   [express](https://www.npmjs.com/package/express)
-   [mongoose](https://www.npmjs.com/package/mongoose)
-   [ejs](https://www.npmjs.com/package/ejs)
-   [nodemon](https://www.npmjs.com/package/nodemon)
-   [cors](https://www.npmjs.com/package/cors)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [body-parser](https://www.npmjs.com/package/body-parser)

## List of APIs

-   `/questions` - Get all questions

-   `/questions/:slot` - Get all questions per slot

-   `/check/:questionId` - Get a specific question

-   `/checkanswer/:questionId` - Get answer of specific question

-   `/lifelines/audiencepoll/:questionId` - Get audience poll results

-   `/lifelines/50-50-to-audiencepoll/:questionId/:removedOption1/:removedOption2` - Get audience poll results after 50-50

-   `/lifelines/fiftyfifty/:questionId` - Get 50-50 results

-   `/lifelines/flipthequestion/:questionId/:slot` - Get flipped question

-   `/lifelines/asktheexpert/:questionId` - Get ask the experts results

-   `/lifelines/50-50-to-asktheexpert/:questionId/:removedOption1/:removedOption2` - Get ask the experts results after 50-50

-   `/add` - Post to add a new question from `/addquestion`

## Lifeline Logic

-   Audience Poll

    > Less than 40,000 - Correct answer will have atleast 50% votes
    >
    > Less than 3,20,000 - Correct answer will have atleast 30% votes
    >
    > Above 3,20,000 - Correct answer will have atleast 10% votes

-   50-50

    > Removes two wrong answers

-   Flip the Question

    > Replaces current question with a new question of the same slot

-   Ask the Expert
    > 80% chance of telling the correct answer

## Build

```bash
npm install
npm start
```

## Screenshots

###  General UI
![General UI](https://i.imgur.com/JvhPmbN.png)

### Audience Poll
![Audience Poll](https://i.imgur.com/RdZk6eu.png)

### 50-50
![50-50](https://i.imgur.com/gyOTHjo.png)

### Wrong Answer
![Wrong Answer](https://i.imgur.com/gAH9gaU.png)

### Game End
![Game End](https://i.imgur.com/zlOkU7R.png)

## Developers

> Adnan Hakim
> [github.com/adnanhakim](https://github.com/adnanhakim)

> Arsh Shaikh
> [github.com/arshshaikh06](https://github.com/arshshaikh06)

## MIT LICENSE

> Copyright (c) 2019 Adnan Hakim
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
