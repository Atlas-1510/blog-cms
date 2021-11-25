import { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PublicPage from "./PublicPage/PublicPage";
import SignIn from "./SignIn/SignIn";
import Article from "./Article/Article";
import ArticlesOverview from "./ArticlesOverview/ArticlesOverview";
import RequireAuth from "./RequireAuth/RequireAuth";
import useLocalStorage from "./hooks/useLocalStorage";
import { b64utoutf8, KJUR } from "jsrsasign";
import Layout from "./Layout/Layout";

export const AuthContext = createContext(null);

function App() {
  const [auth, setAuth] = useState(true); // change back to null
  // const { storedValue, clearValue } = useLocalStorage("jwt-cms", null);

  // useEffect(() => {
  //   if (storedValue) {
  //     const payload = KJUR.jws.JWS.readSafeJSONString(
  //       b64utoutf8(storedValue.split(".")[1])
  //     ).tokenPayload;
  //     setAuth(payload);
  //   } else {
  //     setAuth(null);
  //   }
  // }, [storedValue]);

  return (
    <AuthContext.Provider value={auth}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route element={<RequireAuth />}>
            <Route path="/articles">
              <Route path=":articleID" element={<Article />} />
              <Route index element={<ArticlesOverview />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
