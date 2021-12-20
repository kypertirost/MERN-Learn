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

4. When writing the front-end function, it constantly throws `_services_restaurant_js__WEBPACK_IMPORTED_MODULE_1__.default.getCuisines is not a function` and similiar for `getAll` functions. 

    **Solution**: For the methods in `RestaurantDataService`, they are all instance method which requires initilize the object to operates. I couldn't believe I made this mistake and debuging it for almost an hour! It doesn't need to create such object but make all methods static make best sense for me. 

5. In `react-dom-route` v6 model, `props.history` is `undefined` so cannot use this to redirect to the last page. 

    **Solution**: Again, follow the [documentation](https://reactrouter.com/docs/en/v6/upgrading/v5). `useHistory` is replaced with `useNavigate` instead. Not passing through props but call this function to `navigate(<path>)` to desired location.

6. For editing reviews, function uses `state` variable to store the current review information. But `props` or `location` no longer use that since we don't call render function in the `App.js` as using `element` option. 

    **Solution**: Create another handler and pass the review id to the uri to get the necessary information. This is not an optimal fix. But with limited knowledge of v6 `react-dom-router`, it is the appropriate temp fix.
