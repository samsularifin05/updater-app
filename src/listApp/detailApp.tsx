/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { VITE_APP_REACT_URL, getItem } from "../helpers";
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

  useEffect(() => {
    const data = getItem("isLogin");
    // console.log(data);
    if (data) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [navigate]);

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
        if (error.response.data.message?.includes("processed")) {
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
    <div className="w-full h-full overflow-hidden border border-gray-700 rounded-lg terminal-container">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 terminal-header">
        <div
          className="flex items-center space-x-2"
          onClick={() => navigate("/home")}
        >
          <i className="text-white cursor-pointer fa-solid fa-chevron-left"></i>
        </div>
        <div className="justify-center text-sm text-white">
          Terminal App {param.id}{" "}
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
