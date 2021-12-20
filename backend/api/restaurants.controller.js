import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsCtrl {
    static async apiGetRestaurants(req, res, next){
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {};
        if(req.query.cusine) {
            filters.cuisine = req.query.cuisine;
        } else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode;
        } else if (req.query.name) {
            filters.name = req.query.name;
        }

        const { restaurantsList, totalNumberRestaurants } = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage
        });

        let response = {
            restaurants: restaurantsList,
            page : page,
            filters : filters,
            entries_per_page : restaurantsPerPage,
            total_resutls : totalNumberRestaurants
        };
        
        res.json(response);
    }


    static async apiGetRestaurantsById(req, res, next) {
        try {
            const id = req.params.id || {};

            let restaurant = await RestaurantsDAO.getRestaurantsById(id);

            if (!restaurant) {
                res.status(404).json({error : "Not Found"});
            } else {
                res.json(restaurant);
            }
        } catch(err) {
            console.log(`api, ${err}`);
            res.status(500).json({error : err.message});
        }
    }

    static async apiGetRestaurantsCuisines(req, res, next) {
        try {
            let cuisines = await RestaurantsDAO.getCuisines();
            res.json(cuisines);
        } catch(err) {
            res.status(500).json({error : err});
        }
    } 
}