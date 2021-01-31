import HTTP from "./index";

export const savePrediction = (prediction) => HTTP.post(`/totalisator/predict`, prediction);

