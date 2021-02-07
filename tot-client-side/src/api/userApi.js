import HTTP from "./index";

export const saveUser = (user) => HTTP.post("/user/register", user);
export const loginUser = loginData => HTTP.post("/login", loginData);
export const deleteUser = (id) => HTTP.delete(`/user/${id}`);

export const findUsersByPartialName = (partialName) => HTTP.get("/user/find?name=" + partialName);
export const fetchUserById = (id) => HTTP.get("/user/" + id);

export const findFriendshipsByUserId = (id) => HTTP.get("/user/" + id + "/friends");
export const createFriendRequest = (requesterId, receiverId) => HTTP.post("/user/" + requesterId + "/friends/request/" + receiverId);
export const acceptFriendRequest = (accepterId, requesterId) => HTTP.post("/user/" + accepterId + "/friends/accept/" + requesterId);
export const dismissFriendRequest = (userId, deleteId) => HTTP.delete("/user/" + userId + "/friends/" + deleteId);

export const fetchAllUsers = () => HTTP.get("/user/");

