import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getLabelFromStr } from "../../../utils/Helpers/Helpers";
import CategoriesCard from "../../../partials/common/cards/CategoriesCard";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../api/common/common.api";
import { GET_CATEGORY } from "../../../api/constants.api";
import { HotCategories } from "../WebAbout/WebAbout";
import { Category } from "../../../interfaces/Category";

function ColectionsAndCategories(props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Category[]>([]);

  const { data: categoryRes } = useQuery({
    queryKey: [GET_CATEGORY],
    queryFn: getCategories,
    staleTime: 60 * 60000,
  });

  useEffect(() => {
    const newData = categoryRes?.results || [];
    setCategories(
      newData.filter(
        (el) => !HotCategories.some((data) => data.code === el.category)
      )
    );
    setCollections(
      newData.filter((el) =>
        HotCategories.some((data) => data.code === el.category)
      )
    );
  }, [categoryRes]);

  return (
    <div className="mt-6">
      <div className="flex justify-center">
        <div className="CategoriesGrid grid gap-3 xs:gap-4 grid-flow-dense">
          {collections?.length > 0 &&
            collections.map((el, idx) => {
              return (
                <Link
                  to={`/category/${el.category}/games`}
                  key={idx}
                  className="col-span-2 row-span-2 bg-white rounded-2xl overflow-hidden hvr-float !shadow-custom1"
                >
                  <div className="flex flex-col h-full">
                    <img
                      src={el.imageUrl}
                      alt=" "
                      className="w-full h-3/4 object-cover"
                    />
                    <div className="categoryName px-4 !font-bold !tracking-wider line-clamp-2 justify-center">
                      {getLabelFromStr(el.category)}
                    </div>
                  </div>
                </Link>
              );
            })}

          <CategoriesCard categories={categories} />
        </div>
      </div>
    </div>
  );
}

ColectionsAndCategories.propTypes = {
  img: PropTypes.string,
};

export default ColectionsAndCategories;
