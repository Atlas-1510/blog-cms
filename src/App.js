import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import { b64utoutf8, KJUR } from "jsrsasign";
import Main from "./Main/Main";
import SignIn from "./SignIn/SignIn";
import Footer from "./Footer/Footer";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const { storedValue, clearValue } = useLocalStorage("jwt-cms", null);

  useEffect(() => {
    if (storedValue) {
      const payload = KJUR.jws.JWS.readSafeJSONString(
        b64utoutf8(storedValue.split(".")[1])
      ).tokenPayload;
      setUser(payload);
    } else {
      setUser(null);
    }
  }, [storedValue]);

  return (
    <UserContext.Provider value={user}>
      <div className="font-roboto min-h-[90vh] bg-blueGray-100 flex">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <Main /> : <SignIn />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
