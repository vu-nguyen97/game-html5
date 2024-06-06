import React, { useState } from "react";
// @ts-ignore
import logo from "../../../images/logos/logo.png";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";
import { Link } from "react-router-dom";
import SearchGame from "./SearchGame";
import { useWindowSize } from "../../../utils/hooks/CustomHooks";
import classNames from "classnames";
import PropTypes from "prop-types";

function Logo(props) {
  const { className } = props;
  const [width] = useWindowSize();
  const [openDrawer, setOpenDrawer] = useState(false);

  const onClickSearch = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div
      className={classNames(
        "bg-slate-50 rounded-2xl shadow-custom2 overflow-hidden sticky top-5 z-10",
        width > 640 && "logoEl col-span-2",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-center h-full min-h-[94px]">
        <Link
          to="/"
          className="flex-1 sm:h-full flex items-center justify-center"
        >
          <img
            className="w-10 h-10 sm:w-14 sm:h-14 hvr-grow p-px bg-[#081a1e] rounded-[56px]"
            src={logo}
            alt="logo"
          />
        </Link>
        <div className="border-t-2 sm:border-t-0 sm:border-l-2 border-blue-100/50 sm:h-full flex sm:flex-col text-xl">
          <Link
            to="/"
            className="flex-1 flex justify-center items-center hover:bg-blue-100/50 h-full border-r border-b-0 sm:border-r-0 sm:border-b border-blue-100/50"
          >
            <HomeOutlined className="font-extrabold px-3.5 py-2 sm:py-0" />
          </Link>
          <SearchOutlined
            className="flex-1 !flex justify-center items-center px-3.5 py-2 sm:py-0 cursor-pointer !text-antPrimary hover:bg-blue-100/50 border-l border-t-0 sm:border-l-0 sm:border-t border-blue-100/50"
            onClick={onClickSearch}
          />
        </div>
      </div>

      <SearchGame open={openDrawer} onClose={onClose} />
    </div>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
