import HTTP from "./"

export const fetchMatches = (date) => HTTP.get("/fixture?date="+date);