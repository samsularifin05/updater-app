import { useNavigate } from "react-router-dom";
import { ModalOption } from "../interFace";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface ModalInterFace {
  modal: ModalOption;
  setModal: (value: ModalOption) => void;
}
const Modalkonfirmasi = (Props: ModalInterFace) => {
  const { modal, setModal } = Props;
  const navigate = useNavigate();
  const [isBranch, setBranch] = useState(false);
  const [namaBranch, setNamaBranch] = useState({
    fe: "",
    be: ""
  });
  const gotoDetail = () => {
    if (namaBranch.fe === "") {
      toast.error("Nama Branch Fe Harus Diisi");
      return false;
    }
    if (namaBranch.be === "") {
      toast.error("Nama Branch Be Harus Diisi");
      return false;
    }

    const queryString = `?id=${modal.title}&namaBranchFe=${namaBranch.fe}&namaBranchBe=${namaBranch.be}`;
    navigate(`/detail${queryString}`);

    // navigate(`/detail/${modal.title}/${namaBranch.fe}/${namaBranch.be}`);
  };
  return (
    <React.Fragment>
      <div
        className={`fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex justify-center items-center ${
          modal.isOpen ? "" : "hidden"
        }`}
      >
        <div className="relative max-w-md p-8 m-4 bg-white rounded-md w-80">
          <div className="mb-4 text-xl font-bold">
            Apakah anda yakin ingin update {modal.title} ?
          </div>
          <div className="flex justify-end">
            <button
              onClick={() =>
                setModal({
                  title: "",
                  isOpen: false,
                  is_branch_avail: false
                })
              }
              className="px-4 py-2 mr-2 font-bold text-white bg-[#ee6e6e] rounded hover:bg-[#a53636]"
            >
              No
            </button>
            <button
              onClick={() => {
                {
                  modal.is_branch_avail
                    ? setBranch(true)
                    : navigate("/detail?id=" + modal.title);
                }
              }}
              className="px-4 py-2 font-bold text-white bg-[#78b7f1] rounded hover:bg-[#178DF9]"
            >
              Yes
            </button>
          </div>
        </div>
        {/* Tombol untuk menutup modal */}
        <button
          onClick={() => {
            setModal({
              title: "",
              isOpen: false,
              is_branch_avail: false
            });
          }}
          className="absolute top-0 right-0 p-2"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {isBranch && (
          <div
            className={`fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex justify-center items-center ${
              isBranch ? "" : "hidden"
            }`}
          >
            <div className="flex flex-col gap-4 p-8 m-4 bg-white rounded-md w-80">
              <div className="mb-4 text-xl font-bold">Masukan Nama Branch</div>
              <div className="flex flex-col gap-2">
                <label>Branch Fe</label>
                <input
                  placeholder="Masukan Nama Branch Fe"
                  value={namaBranch.fe}
                  onChange={(e) =>
                    setNamaBranch({
                      ...namaBranch,
                      fe: e.target.value
                    })
                  }
                  className="flex w-full p-2 rounded outline-none outline-slate-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Branch Be</label>
                <input
                  placeholder="Masukan Nama Branch Be"
                  value={namaBranch.be}
                  onChange={(e) =>
                    setNamaBranch({
                      ...namaBranch,
                      be: e.target.value
                    })
                  }
                  className="flex w-full p-2 rounded outline-none outline-slate-400"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setBranch(false)}
                  className="px-4 py-2 mr-2 font-bold text-white bg-[#ee6e6e] rounded hover:bg-[#a53636]"
                >
                  No
                </button>
                <button
                  onClick={() => gotoDetail()}
                  className="px-4 py-2 font-bold text-white bg-[#78b7f1] rounded hover:bg-[#178DF9]"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Modalkonfirmasi;
