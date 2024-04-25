import { useContextApp } from "../hook";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
}
const HeaderComponent = (props: Props) => {
  const { title } = props;
  const navigate = useNavigate();
  const { fullScreen, isLoading, setFullScreen } = useContextApp();
  return (
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
        {title}
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
  );
};

export default HeaderComponent;
