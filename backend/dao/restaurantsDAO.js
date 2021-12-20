import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let restaurants;

export default class RestaurantsDAO {
    static async injectDB(conn) {
        if (restaurants) {
            return ;
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants");
        } catch (err) {
            console.error(`Unable to establish a collection handle in restaurantsDAO: ${e}`);
        }
    }

    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 20,
    } = {}) {
        let query;
        if (filters) {
            if ("name" in filters) {
                query = {
                    $text : {$search : filters["name"]}
                };
            } else if ("cuisine" in filters) {
                query = {
                    "cuisine": {$eq: filters["cuisine"]}
                };
            } else if ("zipcode" in filters) {
                query = {
                    "address.zipcode" : {$eq : filters["zipcode"]}
                };
            }
        }

        let cursor;

        try {
            cursor = await restaurants.find(query);
        } catch(err) {
            console.error(`Unable to issue find command, ${err}`);
            return {
                restaurantsList:[],
                totalNumberRestaurants: 0
            };
        }
        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page);
        try{
            const restaurantsList = await displayCursor.toArray();
            const totalNumberRestaurants = await restaurants.countDocuments(query);
            return {
                restaurantsList:restaurantsList,
                totalNumberRestaurants: totalNumberRestaurants
            };
        } catch (err) {
            console.error(`Unable to convert cursor to array or occured a problem at counting documents, ${err}`);
            return {
                restaurantsList:[],
                totalNumberRestaurants: 0
            };
        }
    }

    static async getRestaurantsById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                      {
                          $lookup: {
                              from: "reviews",
                              let: {
                                  id: "$_id",
                              },
                              pipeline: [
                                  {
                                      $match: {
                                          $expr: {
                                              $eq: ["$restaurant_id", "$$id"],
                                          },
                                      },
                                  },
                                  {
                                      $sort: {
                                          date: -1,
                                      },
                                  },
                              ],
                              as: "reviews",
                          },
                      },
                      {
                          $addFields: {
                              reviews: "$reviews",
                          },
                      },
                  ]
            return await restaurants.aggregate(pipeline).next();
        } catch(err) {
            return {"error" : err};
        }
    }

    static async getCuisines() {
        try {
            let cuisines = await restaurants.distinct("cuisine");
            return cuisines;
        } catch(e){
            return [];
        }
    }
}