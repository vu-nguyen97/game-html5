import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import service from "../../partials/services/axios.config";
import { Game } from "../../pages/Home/interface";

const PageNotFound = React.lazy(() => import("../../pages/404/PageNotFound"));

type GameContextType = { game: Game };

export function GameRoutes(props) {
  const [game, setGame] = useState<Game>();
  const urlParams = useParams();

  useEffect(() => {
    service.get(`/game/${urlParams?.gameCode}`).then(
      (res: any) => {
        setGame(res.results || null);
      },
      () => {}
    );
  }, [urlParams.gameCode]);

  if (game === null) return <PageNotFound />;

  // https://reactrouter.com/en/6.4.4/hooks/use-outlet-context
  return <Outlet context={{ game }} />;
}

export function useGame() {
  return useOutletContext<GameContextType>();
}
