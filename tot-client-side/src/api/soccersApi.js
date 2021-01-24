import HTTP from "./"

export const fetchFifaFixtures = (date) => HTTP.get("/fixture?date=" + date);
export const saveAsMatches = (matches) => HTTP.post("/match", matches);
export const fetchMatches = () => HTTP.get("/match");
export const fetchManagerPendingMatches = () => HTTP.get("/match/pending");
export const fetchManagerFinishedMatches = () => HTTP.get("/match/finished");
export const saveAsMatch = (match) => HTTP.post("/match", match);
export const saveUser = (user) => HTTP.post("/user", user);