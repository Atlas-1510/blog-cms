import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = function (url, config) {
  const [result, setResult] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        setError(false);
        const result = config ? await axios(url, config) : await axios(url);
        setResult(result.data);
      } catch (err) {
        setError(true);
      }
    }
    fetch();
  }, [url, config]);

  return { result, error };
};

export default useAxios;
