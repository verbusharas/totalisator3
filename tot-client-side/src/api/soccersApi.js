import HTTP from "./"

export const fetchFifaFixtures = (date) => HTTP.get("/fixture?date=" + date);
export const saveAsMatches = (matches) => HTTP.post("/match", matches);
export const fetchMatches = () => HTTP.get("/match");
export const saveAsMatch = (match) => HTTP.post("/match", match);