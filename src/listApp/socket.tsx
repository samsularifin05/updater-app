/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Axios from "axios";
import toast from "react-hot-toast";
import { VITE_APP_REACT_URL } from "../helpers";

interface SocketData {
  status: string;
  message: string;
}

const useSocket = (id: string, namaBranchBe: string, namaBranchFe: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dataConsole: string[] = [];

  useEffect(() => {
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
  }, [id, namaBranchBe, namaBranchFe]);

  return { isLoading };
};

export default useSocket;
