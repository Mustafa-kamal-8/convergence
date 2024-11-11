import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { LoaderIcon } from "lucide-react";

import { API } from "@/utils/api";
import { courseTableColumns } from "@/utils/tableCloumns";

import { useModal } from "@/hooks/useModalStore";

import DataTable from "@/components/data-table";
import AddButton from "@/components/ui/add-button";
import ImportOptions from "@/components/import-options";
import DownloadButton from "@/components/ui/download-button";
import { BACKEND_URL } from "@/lib/utils";

export default function Course() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { key } = useModal();

  const course = "Course"

  useMemo(() => {
    const abortController = new AbortController();

    const getData = async (signal: AbortSignal) => {
      try {
        setLoading(true);
        const { data: resData } = await API.post("/get-department", {
          signal,
          queryType: course
        });

        if (resData.success) {
          setCourseData(resData.data);
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
          modalType="addCourse"
          className="relative h-8 w-8 flex items-center justify-center p-0 right-0 top-0"
          iconSize={24}
        />

        <div className="flex items-center gap-4">
          <ImportOptions modalType={"course"} />
          <DownloadButton
            link={`${BACKEND_URL}api/v1/sheet/template/course`}
            title="Download Course Template"
          />
        </div>
      </div>

      <div className="p-4 bg-white">
        {loading && courseData.length === 0 ? (
          <div className="flex items-center justify-center">
            <LoaderIcon className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <DataTable
            columns={courseTableColumns}
            data={courseData}
            edit
            editModalName="addCourse"
          />
        )}
      </div>

      <AddButton modalType="addCourse" label="Add Course" />
    </div>
  );
}
