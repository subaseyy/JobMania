import {
  companiesData,
  staticIndustryLabels,
  staticCompanySizeLabels,
  staticLocationLabels,
} from "./constants";

const getCountMap = (key, labels) => {
  const countMap = {};

  labels.forEach((label) => {
    countMap[label] = 0;
  });

  companiesData.forEach((item) => {
    const value = item[key];
    if (value && countMap.hasOwnProperty(value)) {
      countMap[value]++;
    }
  });

  return countMap;
};

export const getIndustryOptions = () => {
  const countMap = getCountMap("industry", staticIndustryLabels);
  return staticIndustryLabels.map((label) => ({
    label,
    count: countMap[label] || 0,
  }));
};

export const getCompanySizeOptions = () => {
  const countMap = getCountMap("companySize", staticCompanySizeLabels);
  return staticCompanySizeLabels.map((label) => ({
    label,
    count: countMap[label] || 0,
  }));
};

export const getLocationOptions = () => {
  const countMap = getCountMap("location", staticLocationLabels);
  return staticLocationLabels.map((label) => ({
    label,
    count: countMap[label] || 0,
  }));
};
