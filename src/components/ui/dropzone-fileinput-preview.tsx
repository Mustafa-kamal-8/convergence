import { cn } from "@/lib/utils";
import { FileSpreadsheetIcon, XIcon } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
// import * as xlsx from "xlsx";
// import FilePreview from "../file-preview";

interface DropzoneFile extends File {}

interface DropzoneFileInputPreviewProps {
  setFileData?: React.Dispatch<any>;
  fileData?: any;
  processing?: boolean;
  setProcessing?: React.Dispatch<boolean>;
  file: any;
  setFile: React.Dispatch<any>;
  handleClearFile: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function DropzoneFileInputPreview({
  file,
  setFile,
  handleClearFile,
}: DropzoneFileInputPreviewProps) {
  const onDrop = useCallback((acceptedFiles: DropzoneFile[]) => {
    setFile(acceptedFiles[0]);

    // setProcessing(true);
    // const reader = new FileReader();
    // reader.readAsBinaryString(acceptedFiles[0]);
    // reader.onload = (ev: ProgressEvent<FileReader>) => {
    //   const data = ev.target?.result;
    //   const workbook = xlsx.read(data, { type: "binary" });
    //   const sheetName = workbook.SheetNames[0];
    //   const sheet = workbook.Sheets[sheetName];
    //   const parseData = xlsx.utils.sheet_to_json(sheet);

    //   setFileData(parseData);
    //   setProcessing(false);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
    });

  return (
    <div className="p-4 space-y-4 max-w-full">
      <div
        {...getRootProps()}
        className={cn(
          "border-dashed p-4 border border-gray-900 mx-auto max-w-xl rounded-md text-center cursor-pointer transition-all duration-300 flex justify-between",
          isDragAccept && "border-green-800 scale-105",
          isDragReject && "border-red-800"
        )}
      >
        <div className="text-center w-full">
          <input {...getInputProps()} id="uploadSheet" accept=".xlsx, .xls" />

          {!file && (
            <label htmlFor="uploadSheet">Drag & Drop Sheet or Click</label>
          )}

          {file && (
            <div className="flex w-full gap-4 items-center justify-center">
              <span>{file?.name}</span>
              <FileSpreadsheetIcon size={30} />

              <button onClick={handleClearFile}>
                <XIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* {file && (
        <div className="border rounded-md min-h-[15rem] max-h-60 max-w-2xl mx-auto overflow-scroll">
          <FilePreview data={fileData} processing={processing} />
        </div>
      )} */}
    </div>
  );
}
