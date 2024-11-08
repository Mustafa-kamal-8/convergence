import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { LoaderIcon } from "lucide-react";

import { API } from "@/utils/api";
import { placementTableColumns } from "@/utils/tableCloumns";

import { useModal } from "@/hooks/useModalStore";

import DataTable from "@/components/data-table";
import AddButton from "@/components/ui/add-button";
import ImportOptions from "@/components/import-options";
import DownloadButton from "@/components/ui/download-button";
import { BACKEND_URL } from "@/lib/utils";

export default function Assesment() {
  const [placementData, setPlacementData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { key } = useModal();

  useMemo(() => {
    const abortController = new AbortController();

    const getData = async (signal: AbortSignal) => {
      try {
        setLoading(true);
        const { data: resData } = await API.get("/sheet/get/placements", {
          signal,
        });

        if (resData.success) {
          setPlacementData(resData.data);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(
            `Error while getting Placement Data \n${error.response?.data.message}`
          );
        } else {
          toast.error("Error in getting Placement Data ");
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
          modalType="addPlacement"
          className="relative h-8 w-8 flex items-center justify-center p-0 right-0 top-0"
          iconSize={24}
        />

        <div className="flex items-center gap-4">
          <ImportOptions modalType={"placement"} />
          <DownloadButton
            link={`${BACKEND_URL}api/v1/sheet/template/placement`}
            title="Download Placement Template"
          />
        </div>
      </div>

      <div className="p-4 bg-white">
        {loading && placementData.length === 0 ? (
          <div className="flex items-center justify-center">
            <LoaderIcon className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <DataTable
            columns={placementTableColumns}
            data={placementData}
            edit
            editModalName="addPlacement"
          />
        )}
      </div>

      <AddButton modalType="addPlacement" />
    </div>
  );
}
