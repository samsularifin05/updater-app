import { useEffect, useState } from "react";
import { Logo } from "../assets";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../helpers";

interface FormInterFace {
  username: string;
  password: string;
  loading: boolean;
}
const Login = () => {
  const [data, setData] = useState<FormInterFace>({
    username: "",
    password: "",
    loading: false
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!data.username) {
      toast.error("Username is required");
      return false;
    }
    if (!data.password) {
      toast.error("Password is required");
      return false;
    }

    try {
      setData({ ...data, loading: true });
      await toast.promise(checkingData(data), {
        loading: "Checking...",
        success: <b>Login Success!</b>,
        error: <b>Username and Password wrong.</b>
      });

      setData({ ...data, loading: false });
      navigate("/home");
      setCookie("datalogin", data);
    } catch (error) {
      setData({ ...data, loading: false });
    }
  };

  const checkingData = (value: FormInterFace): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value.username === "nsi" && value.password === "developer") {
          resolve(true);
        } else {
          reject(false);
        }
      }, 2000);
    });
  };

  useEffect(() => {
    const data = getCookie("datalogin");
    if (data.username) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="flex items-center align-middle h-full p-5">
      <div className="flex flex-col w-full gap-2">
        <div className="flex justify-center mb-5">
          <img src={Logo} className="w-52" />
        </div>
        <input
          value={data.username}
          className="outline-none border-2 p-2  focus:border-[#178DF9]"
          placeholder="Please Input Username"
          onChange={(e) =>
            setData({
              ...data,
              username: e.target.value
            })
          }
        />
        <input
          value={data.password}
          type="password"
          className="outline-none border-2 p-2  focus:border-[#178DF9]"
          placeholder="Please Input Password"
          onChange={(e) =>
            setData({
              ...data,
              password: e.target.value
            })
          }
        />
        <button
          onClick={() => handleLogin()}
          className="bg-[#178DF9] w-full rounded text-white p-2 outline-none"
        >
          {" "}
          {data.loading ? (
            <div>
              <i className="fa-solid fa-spinner fa-spin mr-2"></i>
              Checking Data
            </div>
          ) : (
            "Login"
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;
