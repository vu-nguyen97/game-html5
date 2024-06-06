import service from "../../partials/services/axios.config";

export type ResponseAPI = {
  message?: string;
  results?: any;
};

export type QueryFunc = (queryKey) => Promise<ResponseAPI>;

export const getCategories: QueryFunc = async () => {
  return await service.get("/game/category");
};

export const getCollections: QueryFunc = async () => {
  return await service.get("/game/collection");
};
