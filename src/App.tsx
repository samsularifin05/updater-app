import { Route, Routes, useNavigate } from "react-router-dom";
import ListApp from "./listApp";
import Login from "./login";
import { Toaster } from "react-hot-toast";
import DetailApp from "./listApp/detailApp";
import { useContextApp } from "./hook";
import { useEffect, useState } from "react";
import GitLog from "./listApp/gitLog";

const App = () => {
  const { fullScreen } = useContextApp();
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  useEffect(() => {
    const activityTimer = setTimeout(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - lastActivityTime;
      if (elapsedTime > 20 * 60 * 1000) {
        localStorage.clear(); // Membersihkan localStorage jika tidak ada aktivitas dalam 20 menit
      }
    }, 1000); // Cek aktivitas setiap 1 detik

    const activityListener = () => {
      setLastActivityTime(Date.now());
    };

    window.addEventListener("mousemove", activityListener);
    window.addEventListener("keydown", activityListener);

    return () => {
      clearTimeout(activityTimer);
      window.removeEventListener("mousemove", activityListener);
      window.removeEventListener("keydown", activityListener);
    };
  }, [lastActivityTime]);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <div
        className={`${
          fullScreen
            ? "w-full"
            : "xxl:w-[25rem] w-full overflow-y-auto no-scrollbar h-screen rounded-md shadow-md md:w-[60%] lg:w-1/3 xl:w-[30%]"
        } `}
      >
        <Routes>
          <Route index element={<Login />} />
          <Route path="home" element={<ListApp />} />
          <Route path="detail" element={<DetailApp />} />
          <Route path="log" element={<GitLog />} />
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center h-screen gap-2">
                Halaman Tidak Di Teumakan <br />
                <button
                  onClick={() => navigate("/home")}
                  className="bg-[#41B06E] p-1 rounded text-white text-[10px]"
                >
                  {" "}
                  Kembali{" "}
                </button>
              </div>
            }
          />
        </Routes>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default App;
