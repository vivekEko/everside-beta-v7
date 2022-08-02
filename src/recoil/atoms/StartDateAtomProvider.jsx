import { atom } from "recoil";

const startDateValueProvider = atom({
  key: "startDateValueProvider", // unique ID (with respect to other atoms/selectors)
  default: new Date().getFullYear(),
});

export default startDateValueProvider;
