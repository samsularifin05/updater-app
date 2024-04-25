/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getItem } from "../helpers";
import { useContextApp } from "../hook";
import Axios from "axios";
import { useEffect } from "react";
import { VITE_APP_REACT_URL } from "../helpers";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { SocketData } from "../interFace";

const DetailApp = () => {
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") || "";
  const namaBranchFe = searchParams.get("namaBranchFe") || "";
  const namaBranchBe = searchParams.get("namaBranchBe") || "";

  const navigate = useNavigate();
  const { fullScreen, isLoading, setFullScreen, setIsLoading } =
    useContextApp();

  useEffect(() => {
    const dataConsole: string[] = [];
    const socket = io((VITE_APP_REACT_URL as string).replace("/api/v1", ""));
    socket.connect();

    socket.on("connect", () => {
      socket.emit("join-room", id);
      socket.on("update-progress", (data: SocketData) => {
        const element = document.getElementById(
          "logConsole"
        ) as HTMLTextAreaElement;

        if (element) {
          if (data.status === "PROGRESS") {
            dataConsole.push(data.message);
            element.value = dataConsole.join("\n");
            element.scrollTop = element.scrollHeight + 400;
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
        }
      });
    });

    setTimeout(async () => {
      try {
        await Axios.post((VITE_APP_REACT_URL as string) + "/app/update", {
          name: id,
          branchBe: namaBranchBe || undefined,
          branchFe: namaBranchFe || undefined
        });
      } catch (error: any) {
        if (error.response.data.message?.includes("processed")) {
          toast("Sedang dalam proses update, silahkan tunggu!", {
            icon: "🧘🏾"
          });
          setIsLoading(true);
        } else {
          if (error.response.data.message?.includes("processed")) {
            toast("Sedang dalam proses update, silahkan tunggu!", {
              icon: "🧘🏾"
            });
            setIsLoading(true);
          } else {
            toast.error(error.response.data.message);
            setIsLoading(false);
          }
        }
      }
    }, 300);

    return () => {
      socket.disconnect();
    };
  }, [id, namaBranchBe, namaBranchFe, setIsLoading]);

  return (
    <div className="w-full h-full overflow-hidden border border-gray-700 rounded-lg terminal-container">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 terminal-header">
        <div
          className="flex items-center space-x-2"
          onClick={() => {
            navigate("/home");
            setFullScreen(false);
          }}
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
