import { useMemo, useState } from "react";
import { isAxiosError } from "axios";
import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";

import { API } from "@/utils/api";

import DataTable from "@/components/data-table";
import AddButton from "@/components/ui/add-button";
import { useModal } from "@/hooks/useModalStore";
import { tcTableColumns } from "@/utils/tableCloumns";
import ImportOptions from "@/components/import-options";
import DownloadButton from "@/components/ui/download-button";
import { BACKEND_URL } from "@/lib/utils";

export default function TC() {
  const [tcData, setTcData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { key } = useModal();

  useMemo(() => {
    const abortController = new AbortController();

    const getData = async (signal: AbortSignal) => {
      try {
        setLoading(true);
        const { data: resData } = await API.get("/sheet/get/tc", { signal });

        if (resData.success) {
          setTcData(resData.data);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(
            `Error while Getting Tc Data \n${error.response?.data.message}`
          );
        } else {
          toast.error("Error in getting TC Data");
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
          modalType="addTc"
          className="relative h-8 w-8 flex items-center justify-center p-0 right-0 top-0"
          iconSize={24}
        />

        <div className="flex items-center gap-4">
          <ImportOptions modalType={"tc"} />
          <DownloadButton
            link={`${BACKEND_URL}api/v1/sheet/template/tc`}
            title="Download TC Template"
          />
        </div>
      </div>

      <div className="p-4 bg-white">
        {loading && tcData.length === 0 ? (
          <div className="flex items-center justify-center">
            <LoaderIcon className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <DataTable
            columns={tcTableColumns}
            data={tcData}
            edit
            editModalName="addTc"
          />
        )}
      </div>

      <AddButton modalType="addTc" label="Add Tc" />
    </div>
  );
}
