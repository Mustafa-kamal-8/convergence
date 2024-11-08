import { useMemo, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { API } from "@/utils/api";

interface AssessorNameAssessoridSelectProps {
  accessorData: {
    accessorId: string;
    accessorName: string;
  };
  setAccessorData: React.Dispatch<
    React.SetStateAction<{
      accessorId: string;
      accessorName: string;
    }>
  >;
}

export default function AssessorNameAssessoridSelect({
  accessorData,
  setAccessorData,
}: AssessorNameAssessoridSelectProps) {
  const [options, setOptions] = useState([]);

  useMemo(() => {
    const abortController = new AbortController();

    const getData = async (signal: AbortSignal) => {
      const { data: resData } = await API.get("/sheet/get/assessor/ids", {
        signal,
      });

      if (resData.success) {
        setOptions(resData.data);
      }
    };

    getData(abortController.signal);

    return () => abortController.abort();
  }, []);

  const handleAccessorIdChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOption = event.currentTarget.selectedOptions[0];
    // Get the value of the selected option
    const selectedValue = selectedOption.value;
    // Get the data attribute value of the selected option
    const accessorName = selectedOption.getAttribute("data-accessorname");

    setAccessorData({
      accessorName: accessorName || "",
      accessorId: selectedValue,
    });
  };

  return (
    <div className="flex items-center gap-4 flex-col sm:flex-row">
      <div className="w-full flex flex-col gap-2">
        <Label htmlFor="accessorId">Accessor Id</Label>

        <select
          name="accessorid"
          id="assessorId"
          onChange={handleAccessorIdChange}
          className="px-4 py-2 bg-white border rounded-md text-sm "
        >
          <option value="">Select Accessor Id</option>
          {options.map((option: any, index) => {
            return (
              <option
                value={option?.assessorId}
                key={index}
                data-accessorname={option?.assessorName}
              >
                {option?.assessorName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="w-full">
        <Label htmlFor="accessorName">Accessor Name</Label>
        <Input
          value={accessorData.accessorName}
          id="accessorName"
          placeholder="Assessor Name"
          readOnly
        />
      </div>
    </div>
  );
}
