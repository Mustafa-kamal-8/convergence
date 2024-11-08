import { ModalType, useModal } from "@/hooks/useModalStore";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

interface AddButtonProps {
  modalType: ModalType;
  label?: string;
  className?: string;
  iconSize?: number;
}

export default function AddButton({
  modalType,
  label,
  className,
  iconSize,
}: AddButtonProps) {
  const { onOpen } = useModal();

  const handleModalOpen = () => {
    onOpen(modalType, "null");
  };

  return (
    <div
      className={cn(
        "fixed inline-flex items-center p-4 transition-all duration-500 rounded-full cursor-pointer hover:scale-105 bottom-10 right-10 bg-primary text-secondary group ",
        className
      )}
      onClick={handleModalOpen}
      title="Add manually"
    >
      <PlusIcon size={iconSize || 40} />
      <span className="text-xl font-semibold">{label}</span>
    </div>
  );
}
