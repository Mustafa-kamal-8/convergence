import { useState, useMemo } from "react";

import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { API } from "@/utils/api";
import { Label } from "./ui/label";

interface StatesDataType {
  vsState?: null | any[];
  vsDistrict?: null | any[];
  vsBlock?: null | any[];
}
interface FinalDataType {
  vsState?: null | string;
  vsDistrict?: null | string;
  vsBlock?: null | string;
}

interface StateDistrictBlockProps {
  form: any;
}

export default function StateDistrictBlock({ form }: StateDistrictBlockProps) {
  const [loading, setLoading] = useState(false);

  const [statesData, setStatesData] = useState<StatesDataType>({
    vsState: null,
    vsDistrict: null,
    vsBlock: null,
  });

  const [finalData, setFinalData] = useState<FinalDataType>({
    vsState: "",
    vsDistrict: "",
    vsBlock: "",
  });

  useMemo(() => {
    (async () => {
      try {
        setLoading(true);
        const { data: resData } = await API.get("/general/states");

        if (resData.success) {
          setStatesData({
            vsState: resData.data,
          });
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(
            `Error while getting states \n${error.response?.data.message}`
          );
        } else {
          toast.error("Error while getting states");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useMemo(() => {
    if (finalData.vsState && !finalData.vsDistrict) {
      (async () => {
        try {
          setLoading(true);

          const { data: resData } = await API.get(
            `/general/districts?stateId=${finalData.vsState}`
          );

          if (resData.success) {
            setStatesData({ ...statesData, vsDistrict: resData.data });
          }
        } catch (error) {
          if (isAxiosError(error)) {
            toast.error(
              `Error while getting districts \n${error.response?.data.message}`
            );
          } else {
            toast.error("Error while getting districts");
          }
        } finally {
          setLoading(false);
        }
      })();
    }

    if (finalData.vsDistrict && !finalData.vsBlock) {
      (async () => {
        try {
          setLoading(true);

          const { data: resData } = await API.get(
            `/general/blocks?districtId=${finalData.vsDistrict}`
          );

          if (resData.success) {
            setStatesData({ ...statesData, vsBlock: resData.data });
          }
        } catch (error) {
          if (isAxiosError(error)) {
            toast.error(
              `Error while getting blocks \n${error.response?.data.message}`
            );
          } else {
            toast.error("Error while getting blocks");
          }
        } finally {
          setLoading(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalData.vsState, finalData.vsDistrict]);

  return (
    <>
      <div className="w-full">
        <Label htmlFor="state">State</Label>
        <select
          name="state"
          id="state"
          value={finalData.vsState || ""}
          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const selectedStateName =
              selectedOption.getAttribute("data-statename");
            setFinalData({
              vsState: e.target.value,
              vsDistrict: null,
              vsBlock: null,
            });

            form && form.setValue("state", selectedStateName);
          }}
          className="w-full p-2 text-sm bg-white border rounded-md"
          disabled={loading}
        >
          <option value="">Select</option>
          {statesData.vsState &&
            statesData.vsState.map((vsState) => (
              <option
                key={vsState.pklStateId}
                value={vsState.pklStateId}
                data-statename={vsState.vsStateName}
              >
                {vsState.vsStateName}
              </option>
            ))}
        </select>
      </div>

      <div className="w-full">
        <Label htmlFor="district">District</Label>
        <select
          name="district"
          id="district"
          value={finalData.vsDistrict || ""}
          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const selectedDistrictName =
              selectedOption.getAttribute("data-districtname");
            setFinalData({
              ...finalData,
              vsDistrict: e.target.value,
              vsBlock: null,
            });
            form && form.setValue("district", selectedDistrictName);
          }}
          className="w-full p-2 text-sm bg-white border rounded-md"
          disabled={loading}
        >
          <option value="">Select</option>
          {statesData.vsDistrict &&
            statesData.vsDistrict.map((district) => (
              <option
                key={district.pklDistrictId}
                value={district.pklDistrictId}
                data-districtname={district.vsDistrictName}
              >
                {district.vsDistrictName}
              </option>
            ))}
        </select>
      </div>

      <div className="w-full">
        <Label htmlFor="block">Block</Label>
        <select
          name="block"
          id="block"
          value={finalData.vsBlock || ""}
          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const selectedBlockName =
              selectedOption.getAttribute("data-blockname");

            setFinalData({ ...finalData, vsBlock: e.target.value });
            form && form.setValue("block", selectedBlockName);
          }}
          className="w-full p-2 text-sm bg-white border rounded-md"
          disabled={loading}
        >
          <option value="">Select</option>

          {statesData.vsBlock &&
            statesData.vsBlock.map((block) => (
              <option
                key={block.pklTalukaId}
                value={block.pklTalukaId}
                data-blockname={block.vsTalukaName}
              >
                {block.vsTalukaName}
              </option>
            ))}
        </select>
      </div>
    </>
  );
}
