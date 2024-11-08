import { useState, useMemo } from "react";

import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { API } from "@/utils/api";
import { Label } from "./ui/label";

interface StatesDataType {
  states?: null | any[];
  districts?: null | any[];
  blocks?: null | any[];
}
interface FinalDataType {
  state?: null | string;
  district?: null | string;
  block?: null | string;
}

interface StateDistrictBlockProps {
  form: any;
}

export default function StateDistrictBlock({ form }: StateDistrictBlockProps) {
  const [loading, setLoading] = useState(false);

  const [statesData, setStatesData] = useState<StatesDataType>({
    states: null,
    districts: null,
    blocks: null,
  });

  const [finalData, setFinalData] = useState<FinalDataType>({
    state: "",
    district: "",
    block: "",
  });

  useMemo(() => {
    (async () => {
      try {
        setLoading(true);
        const { data: resData } = await API.get("/general/states");

        if (resData.success) {
          setStatesData({
            states: resData.data,
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
    if (finalData.state && !finalData.district) {
      (async () => {
        try {
          setLoading(true);

          const { data: resData } = await API.get(
            `/general/districts?stateId=${finalData.state}`
          );

          if (resData.success) {
            setStatesData({ ...statesData, districts: resData.data });
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

    if (finalData.district && !finalData.block) {
      (async () => {
        try {
          setLoading(true);

          const { data: resData } = await API.get(
            `/general/blocks?districtId=${finalData.district}`
          );

          if (resData.success) {
            setStatesData({ ...statesData, blocks: resData.data });
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
  }, [finalData.state, finalData.district]);

  return (
    <>
      <div className="w-full">
        <Label htmlFor="state">State</Label>
        <select
          name="state"
          id="state"
          value={finalData.state || ""}
          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const selectedStateName =
              selectedOption.getAttribute("data-statename");
            setFinalData({
              state: e.target.value,
              district: null,
              block: null,
            });

            form && form.setValue("state", selectedStateName);
          }}
          className="w-full p-2 text-sm bg-white border rounded-md"
          disabled={loading}
        >
          <option value="">Select</option>
          {statesData.states &&
            statesData.states.map((state) => (
              <option
                key={state.pklStateId}
                value={state.pklStateId}
                data-statename={state.vsStateName}
              >
                {state.vsStateName}
              </option>
            ))}
        </select>
      </div>

      <div className="w-full">
        <Label htmlFor="district">District</Label>
        <select
          name="district"
          id="district"
          value={finalData.district || ""}
          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const selectedDistrictName =
              selectedOption.getAttribute("data-districtname");
            setFinalData({
              ...finalData,
              district: e.target.value,
              block: null,
            });
            form && form.setValue("district", selectedDistrictName);
          }}
          className="w-full p-2 text-sm bg-white border rounded-md"
          disabled={loading}
        >
          <option value="">Select</option>
          {statesData.districts &&
            statesData.districts.map((district) => (
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
          value={finalData.block || ""}
          onChange={(e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const selectedBlockName =
              selectedOption.getAttribute("data-blockname");

            setFinalData({ ...finalData, block: e.target.value });
            form && form.setValue("block", selectedBlockName);
          }}
          className="w-full p-2 text-sm bg-white border rounded-md"
          disabled={loading}
        >
          <option value="">Select</option>

          {statesData.blocks &&
            statesData.blocks.map((block) => (
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
