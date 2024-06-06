import service from "../../partials/services/axios.config";
import { QueryFunc } from "../common/common.api";

export const getGames: QueryFunc = async ({ queryKey }) => {
  const params = queryKey[1];
  return await service.get("/game/priority", { params });
};

export const getSpecificalGames: QueryFunc = async ({ queryKey }) => {
  const params = queryKey[1];
  return await service.get("/game", { params });
};
