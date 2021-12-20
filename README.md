# MERN-Learn
This is the simple restaurant review project using MERN stack. The orinal video is https://www.youtube.com/watch?v=mrHNSanmqQ4&list=WL&index=11&t=4s Any changes and reason for doing them will be noted in this README as a learning step to mark.

## Fix to the origin code
- In `index.js` file, `poolSize` and `useNewUrlParse` are no longer supported by MongoDB, replace with `maxPoolSize` and `useNewUrlParser` instead.

## Issues that I run into
1. When testing the db connection after set the DAO, sever doesn't respond with correct json output with corresponding data in the dataset, and nodemon doesn't log any error. If I add a log statement underneath the `cursor` object, it shows that the session is expired and can no longer access it.

**Solution**: It because when injectDB, the collection name is wrong. I typed `resaurants` by accident.

2. When writing the reviews to the remote collections, even Postman returns a 200 success status, but the data is not reflected on the MongoDB atlas.

**Solution**: It beacasue the lower layer logic in DAO just returns a normal json object as `{error : message}`. Indeed the lower layer noticed that if connection is not live or something wrong goes here, it need to catch such error. However, they have the different error status, that for the db it should gives a 400 error as the connection is not alive. So in the controller layer, it need to add additional 400 error handling instead of just gives a 500.

3. The original [video](https://youtu.be/mrHNSanmqQ4?t=4753) author uses `react-router-dom@5.x` to illustrate. But in the newest version(`react-router-dom@6.x`). It no longer support `Switch`, but providing a new interface `Routes`.

**Solution**: Follow the [documentation](https://reactrouter.com/docs/en/v6/upgrading/v5) to upgrade v6. Couple things need to be taken care of
    1. Need to replace all `Switch` to `Routes`.
    2. Need to replace `component` to `element` with appropriate content changes.
    3. Need to split multiple paths into different `Route`. 
    4. Need to delete all `exact` option.