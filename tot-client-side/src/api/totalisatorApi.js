import HTTP from "./index";

export const createTotalisator = (totalisator) => HTTP.post("/totalisator", totalisator);
export const fetchTotalisators = () => HTTP.get("/totalisator");
export const fetchTotalisatorsByUserId = (userId) => HTTP.get("/totalisator/player?id="+userId);
export const fetchTotalisatorById = (id) => HTTP.get("/totalisator/"+id);
export const addPlayerToTotalisator = (totalisatorId, playerId) => HTTP.put(`/totalisator/${totalisatorId}/invite/${playerId}`)
export const kickPlayerFromTotalisator = (totalisatorId, playerId) => HTTP.delete(`/totalisator/${totalisatorId}/kick/${playerId}`)