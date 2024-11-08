import { FileSpreadsheetIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetType, useModal } from "@/hooks/useModalStore";

interface ImportOptionsProps {
  modalType: SheetType;
}

export default function ImportOptions({ modalType }: ImportOptionsProps) {
  const { onOpen } = useModal();

  return (
    <Button
      variant={"outline"}
      onClick={() => onOpen("uploadSheet", modalType)}
      title="Upload Bulk Data"
    >
      <FileSpreadsheetIcon />
    </Button>
  );
}
