import { create } from "zustand";

export type ModalType =
  | "addTarget"
  | "addTp"
  | "addTc"
  | "addCourse"
  | "addScheme"
  | "addBatch"
  | "addProfile"
  | "addAssesment"
  | "addPlacement"
  | "addAssessor"
  | "addTrainer"
  | "addInvoice"
  | "uploadSheet"
  | "uploadScheme"
  | "departmentLoginCreation"
  | "uploadBatch";

export type SheetType =
  | "legacy"
  | "target"
  | "tp"
  | "tc"
  | "course"
  | "profile"
  | "assesment"
  | "placement"
  | "scheme"
  | "batch"
  | "assessor"
  | "trainer"
  | "invoice"
  | "null";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: any;
  dataType: "update" | "new";
  onOpen: (
    type: ModalType,
    sheetType?: SheetType,
    data?: any,
    dataType?: "update" | "new"
  ) => void;
  onClose: () => void;
  key: number;
  setKey: () => void;
  sheetType?: SheetType;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  dataType: "new",
  onOpen: (type, sheetType = "null", data = null, dataType = "new") => {
    set({ isOpen: true, type, sheetType, data, dataType });
  },
  onClose: () =>
    set({
      type: null,
      isOpen: false,
      data: null,
      dataType: "new",
      sheetType: "null",
    }),
  key: 0,
  setKey: () => {
    set((state) => ({ key: state.key + 1 }));
  },
}));
