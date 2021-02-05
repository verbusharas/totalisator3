import HTTP from "./index";

export const createTotalisator = (totalisator) => HTTP.post("/totalisator", totalisator);
export const fetchTotalisatorById = (id) => HTTP.get("/totalisator/"+id);

export const fetchPlayers = (totalisatorId) => HTTP.get(`/totalisator/${totalisatorId}/players`)
export const addPlayerToTotalisator = (totalisatorId, playerId) => HTTP.put(`/totalisator/${totalisatorId}/invite/${playerId}`)
export const kickPlayerFromTotalisator = (totalisatorId, playerId) => HTTP.delete(`/totalisator/${totalisatorId}/kick/${playerId}`)