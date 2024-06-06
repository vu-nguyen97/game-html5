export function numberWithCommas(x) {
  if (!x) return 0;

  if (Number(x) < 1) {
    return x;
  }

  // https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
  // return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); Error in safari
  return Number(x).toLocaleString("en-US");
}

export const formatNumber = (number) => {
  // https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
  if (!number) return number;
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
};

export function capitalizeWord(str) {
  return !str ? str : str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getLabelFromCamelCaseStr(str, toUpper = true) {
  if (!str) return str;

  let results = "";
  let i = 0;
  while (i < str.length) {
    const character = str.charAt(i);
    if (!i) {
      results += character.toUpperCase();
    } else if ("0123456789".includes(character)) {
      results += character;
    } else if (character === character.toUpperCase()) {
      const newChar = toUpper ? character : character.toLowerCase();
      results = results + " " + newChar;
    } else {
      results += character;
    }
    i++;
  }
  return results;
}

export const getLabelFromStr = (str) => {
  if (typeof str !== "string") return str;

  let result = str;
  if (str.toUpperCase() === str) {
    result = capitalizeWord(str);

    if (result.includes("_")) {
      // @ts-ignore
      result = result.replaceAll("_", " ");
    }
  } else {
    result = getLabelFromCamelCaseStr(str, false);
  }

  return result;
};

export const getIphoneVersion = (major = true) => {
  const userAgent = navigator.userAgent;
  const iPhoneRegex = /iPhone\sOS\s([\d_]+)/;
  const match = userAgent.match(iPhoneRegex);

  if (match && match[1]) {
    const version = match[1].replace(/_/g, ".");
    if (major && version) {
      return version.split(".")[0];
    }
    return version;
  } else {
    return "";
  }
};

export const getRandomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
