import React from "react";
import { Link } from "react-router-dom";
import {
  CATEGORY_MOBILE_WIDTH,
  MAX_CATEGORIES,
  MAX_CATEGORIES_ON_MOBILE,
} from "../../../constants/constants";
import { Category } from "../../../interfaces/Category";

export const getMaxCategoryCards = (width) => {
  return width < CATEGORY_MOBILE_WIDTH && width > 0
    ? MAX_CATEGORIES_ON_MOBILE
    : MAX_CATEGORIES;
};

export default function CategoriesCard({ categories, classNames = "" }) {
  return (
    <>
      {categories?.length > 0 &&
        categories.map((el: Category, idx) => {
          return (
            <Link
              to={`/category/${el.category}/games`}
              key={idx}
              className={`col-span-2 bg-white rounded-2xl overflow-hidden hvr-float !shadow-custom1 ${classNames}`}
            >
              <div className="flex w-full h-full">
                <img
                  src={el.imageUrl}
                  alt=" "
                  className="w-[94px] object-cover"
                />
                <div className="categoryName p-2">{el.category}</div>
              </div>
            </Link>
          );
        })}
    </>
  );
}
