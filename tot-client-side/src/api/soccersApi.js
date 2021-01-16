import HTTP from "./"

export const fetchFifaFixtures = (date) => HTTP.get("/fixture/fifa?date=" + date);
export const saveFixtures = (fixtures) => HTTP.post("/fixture", fixtures);
export const fetchRegisteredFixtures = (fixtures) => HTTP.get("/fixture", fixtures);