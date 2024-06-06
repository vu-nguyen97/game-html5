import React from "react";
import BackIcon from "./components/BackIcon";
import classNames from "classnames";
import { useWindowSize } from "../../utils/hooks/CustomHooks";

export default function FullScreenPlay(props) {
  const { show, game, setOpen } = props;
  const [width, height] = useWindowSize();

  const onExitFullScreen = () => {
    setOpen(false);
  };

  return (
    <div
      className={classNames(
        "fixed inset-0 w-screen bg-slate-400",
        !show && "hidden"
      )}
      style={{ height }}
    >
      <div className="relative w-full h-full">
        <iframe
          className="w-full h-full border-0"
          src={game?.url}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <BackIcon onClick={onExitFullScreen} />
      </div>
    </div>
  );
}
