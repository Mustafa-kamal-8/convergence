import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

import { API } from "@/utils/api";

import DataTable from "@/components/data-table";
import AddButton from "@/components/ui/add-button";
import { useModal } from "@/hooks/useModalStore";
import { tpTableColumns } from "@/utils/tableCloumns";
import { LoaderIcon } from "lucide-react";
import ImportOptions from "@/components/import-options";
import DownloadButton from "@/components/ui/download-button";
import { BACKEND_URL } from "@/lib/utils";

export default function TP() {
  const [tpData, setTpData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { key } = useModal();

  
  const tp = "TP"

  useMemo(() => {
    const abortController = new AbortController();

    const getData = async (signal: AbortSignal) => {
      try {
        setLoading(true);
        const { data: resData } = await API.post("/get-department", {
          signal,
          queryType: tp
        });

        if (resData.success) {
          setTpData(resData.data);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(
            `Error while getting TP Data \n${error.response?.data.message}`
          );
        } else {
          toast.error("Error in getting TP Data ");
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
          modalType="addTp"
          className="relative h-8 w-8 flex items-center justify-center p-0 right-0 top-0"
          iconSize={24}
        />

        <div className="flex items-center gap-4">
          <ImportOptions modalType={"tp"} />
          <DownloadButton
            link={`${BACKEND_URL}api/v1/sheet/template/tp`}
            title="Download TP Template"
          />
        </div>
      </div>

      <div className="p-4 bg-white">
        {loading && tpData.length === 0 ? (
          <div className="flex items-center justify-center">
            <LoaderIcon className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <DataTable
            columns={tpTableColumns}
            data={tpData}
            edit
            editModalName="addTp"
          />
        )}
      </div>

      <AddButton modalType="addTp" label="Add TP" />
    </div>
  );
}
