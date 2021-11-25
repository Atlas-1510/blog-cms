import { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PublicPage from "./PublicPage/PublicPage";
import SignIn from "./SignIn/SignIn";
import Article from "./Article/Article";
import ArticlesOverview from "./ArticlesOverview/ArticlesOverview";
import RequireAuth from "./RequireAuth/RequireAuth";
import useLocalStorage from "./hooks/useLocalStorage";
import unpackJWT from "./utils/unpackJWT";
import Layout from "./Layout/Layout";

export const AuthContext = createContext(null);

function App() {
  const { storedValue, setValue, clearValue } = useLocalStorage(
    "jwt-cms",
    null
  );
  const [auth, setAuth] = useState(() => {
    return storedValue ? unpackJWT(storedValue) : null;
  });

  useEffect(() => {
    storedValue ? setAuth(unpackJWT(storedValue)) : setAuth(null);
  }, [storedValue]);

  return (
    <AuthContext.Provider value={auth}>
      <Routes>
        <Route path="/signin" element={<SignIn setValue={setValue} />} />
        <Route element={<Layout clearValue={clearValue} />}>
          <Route path="/" element={<PublicPage />} />
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
