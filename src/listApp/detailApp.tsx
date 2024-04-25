/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getItem } from "../helpers";
import { useContextApp } from "../hook";
import useSocket from "./socket";

const DetailApp = () => {
  // console.log(param);
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") || "";
  const namaBranchFe = searchParams.get("namaBranchFe") || "";
  const namaBranchBe = searchParams.get("namaBranchBe") || "";

  // let socket: Socket;

  const navigate = useNavigate();
  const { fullScreen, setFullScreen } = useContextApp();
  const { isLoading } = useSocket(id, namaBranchBe, namaBranchFe);

  return (
    <div className="w-full h-full overflow-hidden border border-gray-700 rounded-lg terminal-container">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 terminal-header">
        <div
          className="flex items-center space-x-2"
          onClick={() => navigate("/home")}
        >
          <i className="text-white cursor-pointer fa-solid fa-chevron-left"></i>
        </div>
        <div className="justify-center text-sm text-white">
          Terminal App {id}{" "}
          {isLoading && (
            <i className="absolute ml-2 text-white fa-solid fa-spinner fa-spin"></i>
          )}
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setFullScreen(!fullScreen)}
        >
          <i className="text-white fa-solid fa-maximize"></i>
        </div>
      </div>
      <div className="terminal-body">
        <div className="terminal-line">
          <textarea
            readOnly
            id="logConsole"
            className="w-full h-screen p-2 overflow-y-auto text-white bg-black resize-none terminal-input focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailApp;
