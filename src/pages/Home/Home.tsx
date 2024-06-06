import React, { useEffect, useState } from "react";
import GameCard from "./GameCard/GameCard";
import Logo from "../../partials/common/logo/Logo";
import { LazyComponent } from "../../utils/hooks/CustomHooks";
import ColectionsAndCategories from "./ColectionsAndCategories/ColectionsAndCategories";
import { GET_GAMES } from "../../api/constants.api";
import { useQuery } from "@tanstack/react-query";
import { getGames } from "../../api/games/games.api";
import WebAbout from "./WebAbout/WebAbout";

export const maxGames = 145;
const params = {
  page: 0,
  size: maxGames,
};

function Home(props) {
  const [listData, setListData] = useState<any>({});
  const [inited, setInited] = useState(false);

  const { data: gameRes } = useQuery({
    queryKey: [GET_GAMES, params],
    queryFn: getGames,
    staleTime: 60 * 60000,
  });

  useEffect(() => {
    if (!gameRes) return;
    const gameData = gameRes?.results || {};
    const { content } = gameData;
    const newContent = content || [];
    const newData = { ...gameData, content: newContent };

    setListData(newData);
    setInited(true);
  }, [gameRes]);

  return (
    <div className="Home page">
      <div className="pageBg" />

      <div className="flex justify-center">
        <div className="gameGrid grid-flow-dense grid gap-3 xs:gap-4 min-h-screen">
          <Logo />
          {listData.content?.map((gameData, idx) => {
            return (
              <GameCard
                key={gameData.id}
                gameData={gameData}
                className={`game${idx}`}
              />
            );
          })}
        </div>
      </div>

      {inited && (
        <LazyComponent offset={500}>
          <ColectionsAndCategories />
        </LazyComponent>
      )}

      <WebAbout />
    </div>
  );
}

export default Home;
