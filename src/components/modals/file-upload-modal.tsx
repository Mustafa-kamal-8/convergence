import { useModal } from "@/hooks/useModalStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import DropzoneFileInputPreview from "../ui/dropzone-fileinput-preview";
import { useState } from "react";
import { Button } from "../ui/button";
import { API } from "@/utils/api";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

export default function FileUploadAndPreviewModal() {
  const { isOpen, onClose, type, sheetType, setKey } = useModal();

  // const [fileData, setFileData] = useState<null | any[]>(null);
  // const [processing, setProcessing] = useState(false);
  const [file, setFile] = useState<null | File>();
  const [errors, setErrors] = useState<null | any[]>(null);

  const [uploading, setUploading] = useState(false);

  const isModalOpen = isOpen && type === "uploadSheet";

  const handleClose = () => {
    onClose();
    setFile(null);
    setErrors(null);
  };

  const handleUpload = async () => {
    setUploading(true);
    if (!file) return;
    if (
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const { data: resData } = await API.post(
          `/sheet/bulk/${sheetType}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (resData.success) {
          setUploading(false);
          setTimeout(() => {
            setKey(Math.random());
          }, 500);
          handleClose();
        }
      } catch (error: any) {
        if (isAxiosError(error)) {
          setErrors(error?.response?.data.errors);
        }
        toast.error(
          "Error while uploading sheet: ",
          error?.response?.data?.message || ""
        );
      } finally {
        setUploading(false);
        setTimeout(() => {
          setKey(Math.random());
        }, 500);
      }
    } else {
      setUploading(false);
      return toast.error(`File type: ${file.type} not allowed`);
    }
  };

  const handleClearFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setFile(null);
    setErrors(null);
    // setFileData(null);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden text-black bg-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            Upload Sheet
          </DialogTitle>
        </DialogHeader>

        <DropzoneFileInputPreview
          file={file}
          setFile={setFile}
          handleClearFile={handleClearFile}
        />

        {errors && errors.length > 0 && (
          <div className="m-4 border p-4 border-black rounded-md max-h-60 overflow-y-auto">
            <ol className="list-decimal pl-4 text-red-500">
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ol>
          </div>
        )}

        <div className="w-full flex items-center justify-center gap-4 mb-8">
          <Button
            variant={"outline"}
            className="cursor-pointer"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            disabled={uploading || !file}
            onClick={handleUpload}
            className="cursor-pointer"
          >
            {/* {processing ? "Processing" : uploading ? "Uploading" : "Upload"} */}
            {!file
              ? "Please select a file to upload"
              : uploading
              ? "Uploading"
              : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
