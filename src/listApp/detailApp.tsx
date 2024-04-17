/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { VITE_APP_REACT_URL } from "../helpers";
import Axios from "axios";
import toast from "react-hot-toast";
import { useContextApp } from "../hook";

const DetailApp = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { fullScreen, setFullScreen, setIsLoading, isLoading } =
    useContextApp();

  useEffect(() => {
    getDataWithSocket();
  }, []);

  const getDataWithSocket = () => {
    const socket = io(VITE_APP_REACT_URL.replace("/api/v1", ""));
    socket.connect();
    socket.on("connect", async () => {
      //   console.log(socket.id);
      socket.emit("join-room", param.id);
      const dataConsole: string[] = [];
      socket.on("update-progress", (data) => {
        // console.log(data);
        const element = document.getElementById(
          "logConsole"
        ) as HTMLTextAreaElement;
        if (data.status === "PROGRESS") {
          dataConsole.push(data.message);
          element.value = dataConsole.join("\n");
          element.scrollTop = element.scrollHeight;
          setIsLoading(true);
        } else if (data.status === "FINISH") {
          setIsLoading(false);
          toast.success("Update Finish");
          dataConsole.push("\n");
          dataConsole.push("Update Finish");
          dataConsole.push("\n");
          element.value = dataConsole.join("\n");
          element.scrollTop = element.scrollHeight + 400;
        }
      });
      try {
        await Axios.post(VITE_APP_REACT_URL + "/app/update", {
          name: param.id,
          socketId: socket.id
        });
        // console.log(response);
      } catch (error: any) {
        if (error.response.data.message.includes("processed")) {
          toast("Sedang dalam proses update, silahkan tunggu!", {
            icon: "🧘🏾"
          });
          setIsLoading(true);
        }
        // console.log(error);
      }
    });
  };

  return (
    <div className="terminal-container w-full h-full rounded-lg border border-gray-700 overflow-hidden">
      <div className="terminal-header bg-gray-800 flex items-center justify-between px-4 py-2">
        <div
          className="flex items-center space-x-2"
          onClick={() => navigate("/home")}
        >
          <i className="fa-solid fa-chevron-left text-white cursor-pointer"></i>
        </div>
        <div className="text-sm text-white justify-center">
          Terminal App {param.id}{" "}
          {isLoading && (
            <i className="fa-solid fa-spinner fa-spin text-white absolute ml-2"></i>
          )}
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setFullScreen(!fullScreen)}
        >
          <i className="fa-solid fa-maximize text-white"></i>
        </div>
      </div>
      <div className="terminal-body">
        <div className="terminal-line">
          <textarea
            readOnly
            id="logConsole"
            className="p-2 terminal-input bg-black text-white focus:outline-none resize-none w-full h-screen overflow-y-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailApp;
