import classNames from "classnames";
import React, { useState } from "react";
import service from "../../partials/services/axios.config";
import LikeOutlined from "@ant-design/icons/lib/icons/LikeOutlined";
import { formatNumber } from "../../utils/Helpers/Helpers";
import DislikeOutlined from "@ant-design/icons/lib/icons/DislikeOutlined";
import FlagOutlined from "@ant-design/icons/lib/icons/FlagOutlined";
import Tooltip from "antd/lib/tooltip";
import FullscreenOutlined from "@ant-design/icons/lib/icons/FullscreenOutlined";
import Divider from "antd/lib/divider";
import FullscreenExitOutlined from "@ant-design/icons/lib/icons/FullscreenExitOutlined";

export default function GameActions(props) {
  const [canFullscreen, setCanFullscreen] = useState(true);
  const { game, isLiked, setIsLiked, isDisLiked, setIsDisLiked, handleZoom } =
    props;

  const onExitFullScreen = () => {
    document.exitFullscreen();
    setCanFullscreen(true);
  };

  const onZoom = () => {
    setCanFullscreen(false);
    handleZoom();
  };

  const handleLike = () => {
    service
      .put(`/activity/${game.code}/reaction?isLike=true&isDisable=${isLiked}`)
      .then((res) => {
        setIsLiked(!isLiked);
        isDisLiked && setIsDisLiked(false);
      });
  };

  const handleDislike = () => {
    service
      .put(
        `/activity/${game.code}/reaction?isLike=false&isDisable=${isDisLiked}`
      )
      .then((res) => {
        setIsDisLiked(!isDisLiked);
        isLiked && setIsLiked(false);
      });
  };

  const wrapperClass = "flex space-x-1 items-center";
  const getIconWpClass = (actived = false) =>
    classNames(
      "flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full cursor-pointer",
      actived ? "bg-sky-400 text-white" : "hover:bg-sky-100"
    );
  const numberClass =
    "hidden md:block text-xs font-semibold text-gray-700 tracking-tight h-4";

  return (
    <div
      className="flex items-center justify-between bg-white px-2 sm:px-4"
      id="GameActions"
    >
      <div className="flex items-center space-x-3 py-3">
        <img
          src={game.game?.Asset?.[0]}
          alt={game.game?.Title}
          className="h-10 w-10 object-cover rounded"
        />

        <div className="">
          <div className="font-bold text-gray-800 text-sm sm:text-lg line-clamp-2">
            {game.game?.Title}
          </div>
          {game.game?.Company && (
            <div className="text-xxs sm:text-xs">by {game.game?.Company}</div>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center text-sky-600 text-lg space-x-1 md:space-x-2 lg:space-x-5 sm:mr-2">
          <div className={wrapperClass}>
            <Tooltip
              title="Like"
              color="#0ea5e9"
              overlayClassName="custom-tooltip"
            >
              <div className={getIconWpClass(isLiked)} onClick={handleLike}>
                <LikeOutlined className={classNames(isLiked && "text-white")} />
              </div>
            </Tooltip>
            <div className={numberClass}>{formatNumber(game.like)}</div>
          </div>
          <div className={wrapperClass}>
            <Tooltip
              title="Dislike"
              color="#0ea5e9"
              overlayClassName="custom-tooltip"
            >
              <div
                className={getIconWpClass(isDisLiked)}
                onClick={handleDislike}
              >
                <DislikeOutlined
                  className={classNames(isDisLiked && "text-white")}
                />
              </div>
            </Tooltip>
            <div className={numberClass}>{formatNumber(game.disLike)}</div>
          </div>
          {/* <div className={`${wrapperClass} hidden sm:flex`}>
            <Tooltip
              title="Report a bug"
              color="#0ea5e9"
              overlayClassName="custom-tooltip"
            >
              <div className={getIconWpClass()}>
                <FlagOutlined />
              </div>
            </Tooltip>
          </div> */}
        </div>
        <Divider
          type="vertical"
          className="!hidden sm:!block !h-6 !border-sky-600/70 lg:!mx-4"
        />
        <div className={`${wrapperClass} hidden sm:flex`}>
          <Tooltip
            title="Full screen"
            color="#0ea5e9"
            overlayClassName="custom-tooltip"
          >
            {canFullscreen ? (
              <div className={getIconWpClass()} onClick={onZoom}>
                <FullscreenOutlined className="!text-sky-600 text-lg" />
              </div>
            ) : (
              <div className={getIconWpClass()} onClick={onExitFullScreen}>
                <FullscreenExitOutlined className="!text-sky-600 text-lg" />
              </div>
            )}
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
