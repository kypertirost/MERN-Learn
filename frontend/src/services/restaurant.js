import http from "../http-common";

class RestaurantDataService {
    static getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    static get(id){
        return http.get(`/id/${id}`);
    }

    static find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    }

    static createReview(data) {
        return http.post("/review", data);
    }

    static updateReview(data){
        return http.put("/review", data);
    }

    static deleteReview(id, userId){
        return http.delete(`/review?id=${id}`, {data: {user_id : userId}});
    }

    static getCuisines(){
        return http.get(`/cuisines`);
    }
}


export default RestaurantDataService;