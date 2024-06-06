import React from "react";
import { Link } from "react-router-dom";

export const HotCategories = [
  { name: "Battle Games", code: "Battle" },
  { name: "Strategy Games", code: "Strategy" },
  { name: "Racing & Driving Games", code: "Racing & Driving" },
  { name: "Puzzle Games", code: "Puzzle" },
  { name: "Casual Games", code: "Casual" },
];

export default function WebAbout() {
  const titleClass = "font-bold text-lg mb-4 text-teal-900";

  return (
    <div className="mt-12 max-w-[1854px] m-auto">
      <div className="shadow-custom1 bg-white p-4 md:p-6 lg:p-8 text-black rounded-lg">
        <div className="font-semibold text-sm mb-3 text-teal-900">
          About Funki
        </div>
        <div className={titleClass}>Free Online Games</div>
        <div>
          Welcome to Funki, your go-to destination for the finest selection of
          free online games! With a vast array of gaming experiences, there's
          something for everyone. Bid farewell to the hassle of downloads and
          account creation. At Funki, you can dive straight into the action, no
          strings attached.
        </div>
        <div className="mt-3 mb-6">
          Dive into our vast collection of top-notch games, spanning
          heart-pounding racing, thrilling shooting experiences, action-packed
          adventures, and more. Experience the thrill of instant gaming with
          Funki. Join us today to embark on your gaming adventure hassle-free.
          Fun awaits!
        </div>
        <div className={titleClass}>Start playing</div>
        <p>
          Feeling uncertain about your gaming choice? Kickstart your game
          exploration on our homepage or explore titles from our popular
          categories:
        </p>
        <ul className="list-disc -mt-1.5 ml-6">
          {HotCategories.map((el) => (
            <li key={el.code} className="underline decoration-antPrimary">
              <Link to={`/category/${el.code}/games`}>{el.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
