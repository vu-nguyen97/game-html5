import React, { useEffect, useState } from "react";
import service from "../../partials/services/axios.config";
import GameCard from "../Home/GameCard/GameCard";
import classNames from "classnames";
import Logo from "../../partials/common/logo/Logo";
import { useGame } from "../../utils/ProtectedRoutes/ProtectedRoutes";
import {
  DEFAULT_TITLE,
  DISLIKE,
  LIKE,
  MAX_CATEGORIES,
  STORED_GAMES,
} from "../../constants/constants";
import { useCategory, useWindowSize } from "../../utils/hooks/CustomHooks";
import Description from "./Description";
import GameActions from "./GameActions";
import CategoriesCard, {
  getMaxCategoryCards,
} from "../../partials/common/cards/CategoriesCard";
import {
  GET_CATEGORY,
  GET_GAMES,
  GET_SPECIFICAL_GAMES,
} from "../../api/constants.api";
import { getCategories } from "../../api/common/common.api";
import { useQuery } from "@tanstack/react-query";
import { getGames, getSpecificalGames } from "../../api/games/games.api";
import { Category } from "../../interfaces/Category";
import { getIphoneVersion } from "../../utils/Helpers/Helpers";
import FullScreenPlay from "./FullScreenPlay";
import BackIcon from "./components/BackIcon";
import AdsComponent from "../../partials/common/AdsComponent/AdsComponent";
import MetaTags from "../../partials/common/MetaContent/MetaTags";

const minGames = 43;
// Square, Vertical, Horizontal
const ADS_IDS = ["6721330792", "6529759105", "1469004110"];

const iphoneVersion = Number(getIphoneVersion());
const NotSupportFullscreen = iphoneVersion > 0;
const mobileWidth = 800;
const isMobile = window.innerWidth < mobileWidth;
const limitedWidth = isMobile
  ? Math.max(window.innerWidth, window.innerHeight, mobileWidth) + 1
  : mobileWidth;

function GamePlay(props) {
  const [width] = useWindowSize();
  const { game } = useGame();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);

  const [listData, setListData] = useState<any>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [storedCategories, setStoredCategories] = useState<Category[]>([]);
  const [getDataAgain, setGetDataAgain] = useState(false);
  const [showModalPlay, setShowModalPlay] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(false);

  const gameCategory = game?.game?.Category || [];
  const category =
    gameCategory?.length && Array.isArray(gameCategory)
      ? gameCategory.join(",")
      : "";

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

  const { data: gameRes } = useQuery({
    queryKey: [GET_GAMES, { page: 0, size: minGames }],
    queryFn: getGames,
    staleTime: 60 * 60000,
    enabled: getDataAgain,
  });

  const { data: gameByCategoryRes } = useQuery({
    queryKey: [
      GET_SPECIFICAL_GAMES,
      {
        page: 0,
        size: minGames,
        categories: category,
      },
    ],
    queryFn: getSpecificalGames,
    staleTime: 60 * 60000,
  });

  useEffect(() => {
    if (!gameByCategoryRes || !game?.id) return;
    const newList = getData(gameByCategoryRes);

    setListData(newList.filter((el) => el.id !== game.id));
    if (newList?.length < minGames) {
      setGetDataAgain(true);
    }
  }, [gameByCategoryRes, game?.id]);

  const getData = (response) => {
    return response?.results?.content || [];
  };

  useEffect(() => {
    if (!gameRes) return;
    setGetDataAgain(false);
    onSetListData(getData(gameRes));
  }, [gameRes]);

  // useEffect(() => {
  //   if (!game) return;

  //   const scriptEl = document.querySelector(
  //     'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
  //   );
  //   if (!scriptEl) {
  //     const script = document.createElement("script");
  //     script.async = true;
  //     script.src =
  //       "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
  //     script.crossOrigin = "anonymous";
  //     document.head.appendChild(script);
  //     console.log("Add scriptEl");
  //   }

  //   return () => {
  //     const scriptToRemove = document.querySelector(
  //       'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
  //     );
  //     if (scriptToRemove) {
  //       scriptToRemove.parentNode!.removeChild(scriptToRemove);
  //     }
  //   };
  // }, [game]);

  useEffect(() => {
    setTimeout(() => {
      const frameEl = document.getElementsByTagName("iframe")?.[0];
      if (!frameEl) return;
      // console.log(
      //   "??????? frameEl: ",
      //   frameEl,
      //   frameEl.contentDocument,
      //   frameEl.contentWindow
      // );

      let iframeDocument = frameEl.contentDocument;
      try {
        if (!iframeDocument && frameEl.contentWindow?.document) {
          // frameEl.contentWindow?.document có thể gây lỗi và ko console.log được
          iframeDocument = frameEl.contentWindow?.document;
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
      // console.log("iframeDocument :>> ", iframeDocument);

      try {
        const frameEl2 = document.getElementById("FramePlay");
        const iframeDocument2 = frameEl2 as any;

        // console.log("aaaaaa", iframeDocument2, iframeDocument2?.ownerDocument);
        // console.log(
        //   "bbbb",
        //   iframeDocument2?.ownerDocument?.getElementById("pluto-splash-button")
        // );
        // console.log(
        //   "cccc",
        //   iframeDocument2.getElementById("pluto-splash-button")
        // );
      } catch (error) {
        console.log("err2: ", error);
      }

      if (!iframeDocument) return;
      const playBtn = iframeDocument.getElementById("pluto-splash-button");
      // console.log("??????? playBtn", playBtn);
    }, 6000);
  }, []);

  useEffect(() => {
    if (!width) return;
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setShowFullScreen(true);
      } else if (width < limitedWidth) {
        document.exitFullscreen();
        setShowFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [width]);

  const handleZoom = () => {
    if (NotSupportFullscreen) {
      return setShowModalPlay(true);
    }

    const el = document.getElementById("FramePlay") as any;
    if (!el) return;

    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }

    // const gameDetail = game?.game || {};
    // const { Height, Width } = gameDetail;
    // if (!Height || !Width || width >= limitedWidth) {
    //   return;
    // }
    // if (Height > Width && screen.orientation) {
    //   screen.orientation.lock("portrait");
    // } else {
    //   screen.orientation.lock("landscape");
    // }
  };

  const onExitFullScreen = () => {
    document.exitFullscreen();
  };

  const onSetListData = (list) => {
    if (!listData?.length && list?.length) {
      return setListData(list);
    }
    const filteredList = list.filter(
      (el) => !listData.some((game) => game.id === el.id)
    );
    const newList = [...listData, ...filteredList].slice(0, minGames);
    setListData(newList);
  };

  useEffect(() => {
    if (!game?.id) return;
    const listStoredGames = JSON.parse(
      localStorage.getItem(STORED_GAMES) || "[]"
    );
    const index = listStoredGames.findIndex((el) => el.id === game.id);
    let newList: any = listStoredGames;

    if (index === 0) return;
    if (index > -1) {
      newList = newList.filter((el, idx) => idx !== index);
      newList.unshift(game);
    } else {
      newList.unshift(game);
    }
    localStorage.setItem(STORED_GAMES, JSON.stringify(newList));
  }, [game]);

  useEffect(() => {
    if (!game?.id) return;
    const getReaction = service.get(`/activity/${game.code}/reaction`);

    Promise.all([getReaction]).then((res: any) => {
      const activityType = res[0].results?.activity;
      setIsLiked(activityType === LIKE);
      setIsDisLiked(activityType === DISLIKE);
    });
  }, [game]);

  const gameImg = game?.game?.Asset?.[0];
  const gameName = game?.game?.Title;
  const gameDes = game?.game?.Description;
  const metaTitle = gameName
    ? gameName + ` - Play ${gameName} on funkigame`
    : DEFAULT_TITLE;
  const metaDescription = `Want to play ${gameName} on funkigame ? ` + gameDes;

  return (
    <div className="GamePlay page">
      <MetaTags>
        <title>{metaTitle}</title>
        <meta name="title" content={metaTitle} />
        <meta name="og:title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
        <meta name="og:description" content={metaDescription} />
        <meta name="og:image" content={gameImg} />
      </MetaTags>

      <div className="pageBg" />

      <div
        className={classNames(
          "flex justify-center",
          // Hiện trên safari (version 14.1) scroll cả phần phía dưới. Có thể dùng modal sẽ giải quyết được
          // https://ishadeed.com/article/prevent-scroll-chaining-overscroll-behavior/#:~:text=The%20overscroll%2Dbehavior%20property%20sets,behavior%20will%20set%20both%20axes.
          showModalPlay && "!hidden"
        )}
      >
        <div className="GameplayGrid grid-flow-dense grid gap-3 xs:gap-4">
          <Logo
            className={classNames(
              width > 630 && width < 1330 && "!relative !top-0"
            )}
          />
          <div className="GamePlayWrapper 2xl:px-3 sm:py-1">
            {game?.url && (
              <div className="flex flex-col h-full relative" id="FramePlay">
                {(showFullScreen || width >= limitedWidth) && (
                  <iframe
                    className="flex-1"
                    src={game.url}
                    title="Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}

                {width < limitedWidth && (
                  <>
                    {showFullScreen ? (
                      <BackIcon onClick={onExitFullScreen} />
                    ) : (
                      <div
                        className="relative flex-1 bg-slate-50/40 rounded-t-lg overflow-hidden"
                        id="GameImg"
                      >
                        <img
                          src={gameImg}
                          alt={game.code}
                          className="w-full h-full object-cover"
                        />
                        <div
                          className="absolute bg-gray-700/40 text-white inset-0 cursor-pointer h-full"
                          onClick={handleZoom}
                        >
                          <div className="flex flex-col justify-center items-center h-full">
                            <div className="w-12 h-12 flex justify-center items-center bg-white rounded-full shadow-custom2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#0ea5e9"
                                viewBox="0 0 37 37"
                                height="30"
                                width="30"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M15.9827 22.8299L23.2833 18.1768L15.9827 13.5236V22.8299ZM12.9827 10.3035V26.05C12.9827 26.9768 14.2278 27.5059 15.1003 26.9498L27.4533 19.0766C28.1591 18.6267 28.1591 17.7269 27.4533 17.277L15.1003 9.40375C14.2278 8.84764 12.9827 9.3767 12.9827 10.3035Z"
                                ></path>
                              </svg>
                            </div>
                            <div className="mt-1 font-bold text-lg">
                              Play now
                              {/* {iphoneVersion} */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {!showFullScreen && (
                  <GameActions
                    game={game}
                    isLiked={isLiked}
                    setIsLiked={setIsLiked}
                    isDisLiked={isDisLiked}
                    setIsDisLiked={setIsDisLiked}
                    handleZoom={handleZoom}
                  />
                )}
              </div>
            )}
          </div>

          <Description game={game} />

          {ADS_IDS.map((adsId, idx) => {
            const isVertical = idx !== 2;
            if (width < 1440 && idx === 1) {
              return <React.Fragment key={idx} />;
            }
            if (width < 1330 && idx === 0) {
              return <React.Fragment key={idx} />;
            }

            return (
              <div
                key={idx}
                className={classNames(
                  `group gameItem a${idx} overflow-hidden flex`,
                  idx === 3 ? "2xl:mx-4 my-3" : "2xl:mx-2",
                  isVertical && "flex-col"
                )}
              >
                <AdsComponent dataAdSlot={adsId} />
                <div
                  className={classNames(
                    "text-ads",
                    !isVertical ? "verticalText ml-0.5 text-[0.56rem]" : "mt-1"
                  )}
                >
                  ADVERTISEMENT
                </div>
              </div>
            );
          })}

          {listData?.map((gameData, idx) => {
            return (
              <GameCard
                key={gameData.id}
                gameData={gameData}
                className={classNames(`game${idx}`)}
              />
            );
          })}

          {listData && (
            <CategoriesCard categories={categories} classNames="h-[94px]" />
          )}
        </div>
      </div>

      <FullScreenPlay
        show={showModalPlay}
        setOpen={setShowModalPlay}
        game={game}
      />
    </div>
  );
}

export default GamePlay;
