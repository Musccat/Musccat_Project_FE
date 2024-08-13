import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";

function ProtectedPage() {
  const [res, setRes] = useState("");
  const api = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/test/");
        setRes(response.data.response);
      } catch {
        setRes("Something went wrong");
      }
    };
    fetchData();

  }, []);

  return (
    <div>
      <h1>Projected Page</h1>
      <p>{res}</p>
    </div>
  );
}

export default ProtectedPage;