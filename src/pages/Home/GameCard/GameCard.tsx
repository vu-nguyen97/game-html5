import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function GameCard(props) {
  const { gameData, className, onClickGame } = props;

  if (!gameData || !gameData?.game) return <></>;

  const { game, code } = gameData;
  const { Title, Asset } = game;

  return (
    <Link
      to={`/game/${code}/p`}
      className={`group gameItem ${className} aspect-square hvr-float`}
      onClick={onClickGame}
      aria-label={`Play ${Title} game`}
    >
      <div className="absolute inset-0">
        <LazyLoadImage
          alt={Title}
          className="object-cover rounded-2xl shadow-custom1 h-full w-full hover:shadow-custom3"
          src={Asset?.[0]}
          delayTime={1000}
        />
        {Title && (
          <>
            <div className="gameOverlay hidden group-hover:block rounded-2xl absolute inset-0" />
            <div className="gameName hidden group-hover:block">{Title}</div>
          </>
        )}
      </div>
    </Link>
  );
}

GameCard.propTypes = {
  gameData: PropTypes.object,
  className: PropTypes.string,
  onClickGame: PropTypes.func,
};

export default GameCard;
