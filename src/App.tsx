import { Route, Routes } from "react-router-dom";
import ListApp from "./listApp";
import Login from "./login";
import { Toaster } from "react-hot-toast";
import DetailApp from "./listApp/detailApp";
import { useContextApp } from "./hook";

const App = () => {
  const { fullScreen } = useContextApp();

  // console.log(fullScreen);
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
          <Route path="detail/:id" element={<DetailApp />} />
        </Routes>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
