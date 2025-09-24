import { createContext } from "react";
export const MainContext = createContext({
  user: null,
  users: [],
  setuser: () => {},
  setrandomword: () => {},
  randomword: "",
  numberguess: 0,
  setnumberguess: () => {},
  checkofferword: () => {},
  deletewordalert: () => {},
  wordsfourletter: [],
  wordsfiveletter: [],
  wordssixletter: [],
});
