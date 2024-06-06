import React, { useLayoutEffect, useRef, useState } from "react";
import {
  CATEGORY_MOBILE_WIDTH,
  MAX_CATEGORIES_ON_MOBILE,
} from "../../constants/constants";

export function useWindowSize() {
  // https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export const useCategory = ({
  categories,
  setCategories,
  storedCategories, // It is used for desktop screen
}) => {
  const [width] = useWindowSize();

  useLayoutEffect(() => {
    if (!width || storedCategories?.length < MAX_CATEGORIES_ON_MOBILE) return;
    if (width < CATEGORY_MOBILE_WIDTH) {
      if (categories?.length > MAX_CATEGORIES_ON_MOBILE) {
        setCategories(storedCategories.slice(0, MAX_CATEGORIES_ON_MOBILE));
      }
    }
    if (width > CATEGORY_MOBILE_WIDTH) {
      if (categories?.length < storedCategories?.length) {
        setCategories(storedCategories);
      }
    }
  }, [width]);
};

interface LazyProps {
  children: React.ReactNode;
  offset?: number;
  threshold?: number;
}

export function LazyComponent(props: LazyProps) {
  const { children, offset, threshold } = props;
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef<any>(null);

  useLayoutEffect(() => {
    // https://dev.to/producthackers/intersection-observer-using-react-49ko
    // https://github.com/thebuilder/react-intersection-observer
    const callbackFunction = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    };
    const options = {
      root: null,
      rootMargin: offset ? offset + "px" : undefined,
      threshold,
    };

    const observer = new IntersectionObserver(callbackFunction, options);
    observer.observe(componentRef.current);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return <div ref={componentRef}>{isVisible && children}</div>;
}
