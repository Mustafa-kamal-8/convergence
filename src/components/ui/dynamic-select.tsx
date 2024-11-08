import { API } from "@/utils/api";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface DynamicSelectProps {
  url: string;
  onChange: (...event: any[]) => void;
  placeholder: string;
  optionName: string;
  optionValue: string;
  value?: string;
}

export default function DynamicSelect({
  url,
  onChange,
  placeholder,
  optionName,
  optionValue,
  value,
}: DynamicSelectProps) {
  const [options, setOptions] = useState([]);

  useMemo(() => {
    const abortController = new AbortController();

    const getData = async (signal: AbortSignal) => {
      const { data: resData } = await API.get(url, { signal });

      if (resData.success) {
        setOptions(resData.data);
      }
    };

    getData(abortController.signal);

    return () => abortController.abort();
  }, [url]);

  return (
    <Select onValueChange={onChange} value={value || ""}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-w-60">
        <SelectGroup>
          {options.map((option: any, index) => (
            <SelectItem
              className="whitespace-nowrap"
              value={option?.[optionValue]}
              key={index}
            >
              {option?.[optionName]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
