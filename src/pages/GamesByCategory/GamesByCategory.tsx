import React, { useEffect, useState } from "react";
import service from "../../partials/services/axios.config";
import Logo from "../../partials/common/logo/Logo";
import GameCard from "../Home/GameCard/GameCard";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import {
  getLabelFromStr,
  getRandomNum,
  shuffleArray,
} from "../../utils/Helpers/Helpers";
import CategoriesCard, {
  getMaxCategoryCards,
} from "../../partials/common/cards/CategoriesCard";
import { GET_CATEGORY, GET_GAMES } from "../../api/constants.api";
import { getCategories } from "../../api/common/common.api";
import { useQuery } from "@tanstack/react-query";
import { useCategory, useWindowSize } from "../../utils/hooks/CustomHooks";
import { MAX_CATEGORIES } from "../../constants/constants";
import { Category } from "../../interfaces/Category";
import { getGames } from "../../api/games/games.api";
import { maxGames } from "../Home/Home";
import { Game } from "../Home/interface";
import MetaTags from "../../partials/common/MetaContent/MetaTags";

const params = {
  page: 0,
  size: maxGames,
};

function GamesByCategory(props) {
  const [width] = useWindowSize();
  const urlParams = useParams();
  const maxGames = 145;
  const [listData, setListData] = useState<any>();
  const [inited, setInited] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [storedCategories, setStoredCategories] = useState<Category[]>([]);
  const [suggestionGames, setSuggestionGames] = useState<Game[]>([]);
  const categoryCode = urlParams.categoryCode;

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
    const max =
      window.innerWidth < 600 ? getRandomNum(12, 24) : getRandomNum(30, 60);
    shuffleArray(newContent);
    const newData = newContent.slice(0, max);

    setSuggestionGames(newData);
  }, [gameRes]);

  const { data: categoryRes } = useQuery({
    queryKey: [GET_CATEGORY],
    queryFn: getCategories,
    staleTime: 60 * 60000,
  });

  useCategory({ categories, setCategories, storedCategories });
  useEffect(() => {
    const listCategories = categoryRes?.results?.slice(0, MAX_CATEGORIES) || [];
    setStoredCategories(listCategories);
    setCategories(listCategories.slice(0, getMaxCategoryCards(width)));
  }, [categoryRes]);

  useEffect(() => {
    const params = {
      page: 0,
      size: maxGames,
      categories: urlParams.categoryCode,
    };
    service.get("/game", { params }).then((res: any) => {
      const gameRes = res.results || {};
      const { content } = gameRes;
      const newContent = content || [];
      const newData = { ...gameRes, content: newContent };

      setListData(newData);
      setInited(true);
    });
  }, [categoryCode]);

  const metaTitle = categoryCode + ` - Play ${categoryCode} on funkigame`;

  return (
    <div className="GamesByCategory page">
      <MetaTags>
        <title>{metaTitle}</title>
        <meta name="title" content={metaTitle} />
        <meta name="og:title" content={metaTitle} />
        <meta name="description" content={metaTitle} />
        <meta name="og:description" content={metaTitle} />
      </MetaTags>

      <div className="pageBg" />

      <div className="flex flex-col items-center">
        <div className="ResponsiveGrid grid-flow-dense grid gap-3 xs:gap-4">
          <Logo />
          <div className="col-span-3 bg-white rounded-2xl">
            <div className="h-full w-full py-2 flex justify-center items-center text-base font-bold">
              {getLabelFromStr(urlParams.categoryCode)}
            </div>
          </div>
          {listData?.content?.map((gameData, idx) => {
            return (
              <GameCard
                key={gameData.id}
                gameData={gameData}
                className={classNames(
                  idx > 10 && idx < 24 && "row-span-2 col-span-2"
                )}
              />
            );
          })}
        </div>

        {inited && (
          <div className="ResponsiveGrid grid grid-flow-dense gap-3 xs:gap-4 mt-10 lg:mt-20">
            {suggestionGames?.length &&
              suggestionGames.map((gameData) => (
                <GameCard key={gameData.id} gameData={gameData} />
              ))}

            {listData && (
              <CategoriesCard categories={categories} classNames="h-[94px]" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GamesByCategory;
