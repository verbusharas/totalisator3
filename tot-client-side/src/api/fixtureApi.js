import HTTP from "./"

export const fetchFifaFixtures = (date) => HTTP.get("/fixture?date=" + date);