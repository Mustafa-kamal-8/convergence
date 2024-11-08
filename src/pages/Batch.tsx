import DataTable from "@/components/data-table";
import ImportOptions from "@/components/import-options";
import AddButton from "@/components/ui/add-button";
import DownloadButton from "@/components/ui/download-button";
import { useModal } from "@/hooks/useModalStore";
import { BACKEND_URL } from "@/lib/utils";
import { API } from "@/utils/api";
import { batchTableColumns } from "@/utils/tableCloumns";
import { isAxiosError } from "axios";
import { LoaderIcon } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function Batch() {
  const [batchData, setBatchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { key } = useModal();

  useMemo(() => {
    const abortController = new AbortController();
    const getData = async (signal: AbortSignal) => {
      try {
        setLoading(true);
        const { data: resData } = await API.get("/sheet/get/batch", {
          signal,
        });

        if (resData.success) {
          setBatchData(resData.data);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(
            `Error while getting batch data \n${error.response?.data.message}`
          );
        } else {
          toast.error("Error in getting batch data");
        }
      } finally {
        setLoading(false);
      }
    };

    getData(abortController.signal);

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <div className="h-full m-4 space-y-4">
      <div className="p-4 bg-white relative flex items-center justify-between">
        <AddButton
          modalType="addBatch"
          className="relative h-8 w-8 flex items-center justify-center p-0 right-0 top-0"
          iconSize={24}
        />
        <div className="flex items-center gap-4">
          <ImportOptions modalType={"batch"} />
          <DownloadButton
            link={`${BACKEND_URL}api/v1/sheet/template/batch`}
            title="Download Batch Template"
          />
        </div>
      </div>

      <div className="p-4 bg-white">
        {loading && batchData.length === 0 ? (
          <div className="flex items-center justify-center">
            <LoaderIcon className="animate-spin h-5 w-5" />
          </div>
        ) : (
          <DataTable
            columns={batchTableColumns}
            data={batchData}
            edit
            editModalName="addBatch"
          />
        )}
      </div>

      <AddButton modalType="addBatch" label="Add Batch" />
    </div>
  );
}
