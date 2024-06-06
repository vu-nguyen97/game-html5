import React, { useState } from "react";
import { Link } from "react-router-dom";
import DescriptionField from "./components/DescriptionField";
import { GameDetail } from "../Home/interface";
import Button from "antd/es/button/button";
import ShareAltOutlined from "@ant-design/icons/lib/icons/ShareAltOutlined";
import ShareModal from "./components/ShareModal";

function Description(props) {
  const { game } = props;
  const [shareGame, setShareGame] = useState(false);

  if (!game?.url) return;
  const { url } = game;
  const gameData: GameDetail = game.game || {};
  const {
    Description,
    Instructions,
    Asset,
    Title,
    Category,
    Type,
    Tag,
    SubType,
    Mobile,
    Company,
  } = gameData;

  return (
    <div className="GameDescription">
      {url && (
        <div className="2xl:px-3 pt-1 pb-4">
          <div className="h-full shadow-custom1 bg-slate-50/50 rounded-lg p-4 lg:p-6 !pr-3 text-black flex">
            <div className="w-full">
              <div className="font-bold text-gray-800 text-sm sm:text-lg">
                {Title}
              </div>
              <Button
                type="primary"
                icon={<ShareAltOutlined />}
                className="mt-2 mb-6"
                shape="round"
                onClick={() => setShareGame(true)}
              >
                Share
              </Button>
              <div className="text-sm2">{Description}</div>
              <div className="mt-4 mb-1 text-sm2 font-semibold">
                Instructions
              </div>
              <div className="text-sm2">{Instructions}</div>
              <DescriptionField
                fieldName="Game Publisher"
                classNames="mt-6"
                contentEl={<span className="font-semibold">{Company}</span>}
              />
              <DescriptionField
                fieldName="Types"
                show={!!Type}
                contentEl={
                  <div>
                    {Type}
                    {SubType && <>, {SubType}</>}
                  </div>
                }
              />
              <DescriptionField
                fieldName="Devices"
                contentEl={
                  <div>Browser (desktop, tablet{Mobile && <>, mobile</>})</div>
                }
              />
              <DescriptionField
                fieldName="Tags"
                showContent={Tag?.length > 0}
                contentEl={
                  <>
                    {Tag.map((el, idx) => (
                      <span key={idx} className="text-link ">
                        {el}
                        {idx !== Tag.length - 1 && (
                          <span className="mr-2">,</span>
                        )}
                      </span>
                    ))}
                  </>
                }
              />

              {Category?.length > 0 && (
                <div className="flex flex-wrap mt-5 -mx-1">
                  {Category.map((el) => (
                    <Link
                      to={`/category/${el}/games`}
                      className="mt-2 mx-1 inline-block align-middle text-xs !text-white space-x-1 bg-indigo-800/80 hover:bg-indigo-600/90 py-[5px] px-[14px] rounded-[22px]"
                      key={el}
                    >
                      <img
                        src={Asset?.[0]}
                        alt={Title}
                        className="h-6 w-6 inline-block object-cover rounded-full"
                      />
                      <span className="leading-6">{el}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* <div className="w-64 lg:w-72 2xl:w-80 shrink-0 ml-3 lg:ml-4 2xl:ml-6 hidden md:flex flex-col">
              <div className="text-ads mb-1">ADVERTISEMENT</div>
              <div className="h-[350px] bg-slate-50/40"></div>
            </div> */}
          </div>
        </div>
      )}

      <ShareModal open={shareGame} onClose={() => setShareGame(false)} />
    </div>
  );
}

export default Description;
