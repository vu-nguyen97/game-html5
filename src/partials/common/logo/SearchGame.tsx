import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Input from "antd/es/input/Input";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import { HOT, STORED_GAMES } from "../../../constants/constants";
import { Game } from "../../../pages/Home/interface";
import GameCard from "../../../pages/Home/GameCard/GameCard";
import service from "../../services/axios.config";
import { numberWithCommas } from "../../../utils/Helpers/Helpers";
import Drawer from "antd/es/drawer";

function SearchGame(props) {
  const inputRef = useRef<any>(null);
  const { onClose, open } = props;

  const maxGames = 12;
  const minText = 2;
  const [value, setValue] = useState("");
  const [storedGames, setStoredGames] = useState<Game[]>([]);
  const [gameHot, setGameHot] = useState<Game[]>([]);
  const [searchedGames, setSearchedGames] = useState<Game[]>([]);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    if (!open) return;

    const listStoredGames = JSON.parse(
      localStorage.getItem(STORED_GAMES) || "[]"
    );
    const games =
      listStoredGames?.length > maxGames
        ? listStoredGames.slice(0, maxGames)
        : listStoredGames;
    setStoredGames(games);
    getHotGame();

    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 300);
  }, [open]);

  const getHotGame = () => {
    const params = {
      page: 0,
      // Todo: responsive and re-calculate
      size: 6,
      collections: HOT,
    };
    service.get("/game", { params }).then((res: any) => {
      setGameHot(res.results?.content || []);
    });
  };

  useEffect(() => {
    if (value.length >= minText) {
      const params = {
        page: 0,
        size: 30,
        searchName: value,
      };
      service.get("/game", { params }).then((res: any) => {
        setSearchedGames(res.results?.content || []);
        setTotalData(res.results?.totalElements);
      });
    }
  }, [value]);

  const onSearchGame = (e) => {
    const text = e.target.value;
    setValue(text);
    if (!text && searchedGames?.length) {
      setSearchedGames([]);
    }
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <Drawer
      width={Math.min(700, window.innerWidth - 40)}
      onClose={onClose}
      open={open}
      closable={false}
      className="custom-bg"
    >
      <Input
        value={value}
        onChange={onSearchGame}
        ref={inputRef}
        className="custom-lg-input shadow-lg pb-3 !px-4 text-lg font-bold !leading-6 !ring-0"
        style={{ height: "56px" }}
        placeholder="What are you playing today?"
        suffix={
          !value && <SearchOutlined className="text-2xl mb-1 text-blue-900" />
        }
        size="large"
        allowClear
      />

      {value?.length > 0 && searchedGames?.length > 0 ? (
        <>
          <div className="mt-4 text-lg font-bold text-gray-700">
            Total {numberWithCommas(totalData)} results
          </div>
          <div className="SearchGame grid gap-3 xs:gap-4 mt-3">
            {searchedGames.map((gameData, idx) => {
              const { id, game } = gameData;
              return (
                <GameCard key={id} gameData={gameData} onClickGame={onClose} />
              );
            })}
          </div>
        </>
      ) : (
        <>
          {value?.length > minText && searchedGames?.length === 0 && (
            <div className="mt-4 bg-white pt-5 p-6">
              <div className="font-bold text-xl">
                Hmm, nothing's coming up for that.
              </div>
              <div className="text-base">Try searching for something else?</div>
            </div>
          )}

          {storedGames?.length > 0 && (
            <div className="mt-6">
              <div className="font-bold text-[1.3rem] text-gray-700">
                Recently played
              </div>
              <div className="SearchGame grid gap-3 xs:gap-4 mt-4">
                {storedGames.map((gameData, idx) => {
                  const { id, game } = gameData;
                  return (
                    <GameCard
                      key={id}
                      gameData={gameData}
                      onClickGame={onClose}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {gameHot?.length > 0 && (
            <div className="mt-6">
              <div className="font-bold text-[1.3rem] text-gray-700">
                Popular games
              </div>
              <div className="SearchGame grid gap-3 xs:gap-4 mt-4">
                {gameHot.map((gameData, idx) => {
                  const { id, game } = gameData;
                  return (
                    <GameCard
                      key={id}
                      gameData={gameData}
                      onClickGame={onClose}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* {gameHot?.length > 0 && (
            <div className="mt-7">
              <div className="font-bold text-[1.3rem] text-gray-700">
                Popular games
              </div>
              <Carousel
                afterChange={onChange}
                className="SearchGame grid gap-3 xs:gap-4 mt-4"
                slidesToShow={5}
                autoplay
                swipeToSlide
                draggable
              >
                {gameHot.map((gameData, idx) => {
                  const { id, game } = gameData;
                  const { Title, Asset } = game;
                  return (
                    <div className="px-1 pb-10">
                      <img
                        alt={Title}
                        src={Asset?.[0]}
                        className="aspect-square object-cover rounded-2xl shadow-custom1"
                      />
                      <div className="text-center mt-1 font-semibold text-sm">
                        {Title}
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          )} */}
        </>
      )}
    </Drawer>
  );
}

SearchGame.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SearchGame;
