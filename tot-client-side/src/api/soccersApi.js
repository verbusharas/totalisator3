import HTTP from "./"

export const fetchFifaFixtures = (date) => HTTP.get("/fixture?date=" + date);
export const saveAsMatches = (matches) => HTTP.post("/match", matches);
export const fetchMatches = () => HTTP.get("/match");
export const fetchManagerPendingMatches = () => HTTP.get("/match/pending");
export const fetchManagerFinishedMatches = () => HTTP.get("/match/finished");
export const saveAsMatch = (match) => HTTP.post("/match", match);
export const saveUser = (user) => HTTP.post("/user", user);
export const findUsersByPartialName = (partialName) => HTTP.get("/user/find?name=" + partialName);
export const findUserById = (id) => HTTP.get("/user/" + id);
export const findFriendshipsByUserId = (id) => HTTP.get("/user/" + id + "/friends");
export const createFriendRequest = (requesterId, receiverId) => HTTP.post("/user/" + requesterId + "/friends/request/" + receiverId);
export const acceptFriendRequest = (accepterId, requesterId) => HTTP.post("/user/" + accepterId + "/friends/request/" + requesterId);