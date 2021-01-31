import HTTP from "./"

export const fetchFifaFixtures = (date) => HTTP.get("/fixture?date=" + date);
export const fetchFakeFixtures = () => HTTP.get("/fixture/fake");