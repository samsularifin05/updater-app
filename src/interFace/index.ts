export interface DataAppInterFace {
  is_branch_avail: boolean;
  link_qc: string;
  name: string;
}

export interface ModalOption {
  title: string;
  isOpen: boolean;
  is_branch_avail: boolean;
}
export interface SocketData {
  status: string;
  message: string;
}
