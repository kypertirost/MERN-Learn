import RestaurantsDAO from "../backend/dao/restaurantsDAO";

test("RestaurantsDAO tests", ()=> {
    const getRestaurants = RestaurantsDAO.getRestaurants;
    //Default query tests
    let x = getRestaurants();
    console.log(typeof(x));
    expect(x).toBe(25359)
})