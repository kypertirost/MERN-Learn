# MERN-Learn
This is the simple restaurant review project using MERN stack. The orinal video is https://www.youtube.com/watch?v=mrHNSanmqQ4&list=WL&index=11&t=4s Any changes and reason for doing them will be noted in this README as a learning step to mark.

## Fix to the origin code
- In `index.js` file, `poolSize` and `useNewUrlParse` are no longer supported by MongoDB, replace with `maxPoolSize` and `useNewUrlParser` instead.

## Issues that I run into
1. When testing the db connection after set the DAO, sever doesn't respond with correct json output with corresponding data in the dataset, and nodemon doesn't log any error. If I add a log statement underneath the `cursor` object, it shows that the session is expired and can no longer access it.