import { useModal } from "@/hooks/useModalStore";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";

import { API } from "@/utils/api";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import LoadingButton from "../ui/loading-button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect } from "react";
import DynamicSelect from "../ui/dynamic-select";

const formSchema = z.object({
  isCandidatePlaced: z.boolean().optional(),
  employerName: z.string().optional(),
  placementType: z.string().optional(),
  employerContactNo: z.string().optional(),
  placementDistrict: z.string().optional(),
  placementState: z.string().optional(),
  monthlySalary: z.string().optional(),
  batchId: z.string().optional(),
  candidateId: z.string().optional(),
});

export default function AddPlacementModal() {
  const { isOpen, onClose, type, setKey, data, dataType } = useModal();

  const isModalOpen = isOpen && type === "addPlacement";

  const handleClose = () => {
    onClose();
    form.reset({
      isCandidatePlaced: false,
      employerName: "",
      placementType: "",
      employerContactNo: "",
      placementDistrict: "",
      placementState: "",
      monthlySalary: "",
      batchId: "",
      candidateId: "",
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isCandidatePlaced: false,
      employerName: "",
      placementType: "",
      employerContactNo: "",
      placementDistrict: "",
      placementState: "",
      monthlySalary: "",
      batchId: "",
      candidateId: "",
    },
  });

  useEffect(() => {
    if (data?.pklPlacementId && type === "addPlacement") {
      form.reset({
        isCandidatePlaced: data.isCandidatePlaced === 1,
        employerName: data.employerName || "",
        placementType: data.placementType || "",
        employerContactNo: data.employerContactNo || "",
        placementDistrict: data.placementDistrict || "",
        placementState: data.placementState || "",
        monthlySalary: data.placementType || "",
        batchId: "",
        candidateId: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dataType === "new") {
      try {
        const { data } = await API.post("/sheet/manual/placement", {
          ...values,
        });

        if (data.success) {
          toast.success("Target Form Submitted Successfully");
        }

        handleClose();
        setTimeout(() => {
          setKey(Math.random());
        }, 500);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(
            `Error while Submitting Form \n${error.response?.data.message}`
          );
        } else {
          toast.error("Error in Submitting Target Form");
        }
      }
    } else {
      try {
        const { data: resData } = await API.patch(
          `/sheet/update/placement/${data.pklPlacementId}`,
          { ...values }
        );

        if (resData.success) {
          toast.success("Placement Detail Updated Successfully");
        }

        handleClose();
        setTimeout(() => {
          setKey(Math.random());
        }, 500);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(`Error while updating \n${error.response?.data.message}`);
        } else {
          toast.error("Error in updating");
        }
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 text-black bg-white md:max-w-2xl 2xl:max-w-7xl">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            {dataType === "new" ? "Add" : "Update"} Placement
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-scroll max-h-[40rem]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onFormSubmit)}
              className="flex flex-col gap-4 p-8"
            >
              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="batchId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="batchId">Batch Id</Label>
                          <DynamicSelect
                            url="/sheet/get/batch/ids"
                            onChange={field.onChange}
                            value={field.value}
                            optionName="batchId"
                            optionValue="batchId"
                            placeholder="Batch Id"
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="candidateId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateId">Candidate Id</Label>
                          <DynamicSelect
                            url="/sheet/get/candidate/ids"
                            onChange={field.onChange}
                            value={field.value}
                            optionName="candidateID"
                            optionValue="candidateID"
                            placeholder="Candidate Id"
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isCandidatePlaced"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex items-center justify-between w-full gap-2 p-2 py-3 border rounded-md">
                        <Label htmlFor="isCandidatePlaced" className="w-full">
                          Is Candidate Placed
                        </Label>
                        <Checkbox
                          id="isCandidatePlaced"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employerName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <>
                        <Label htmlFor="employeerName">Employeer Name</Label>
                        <Input
                          placeholder="Employer Name"
                          {...field}
                          id="employeerName"
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="placementType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <>
                        <Label htmlFor="placementType">Placement Type</Label>
                        <Select onValueChange={field.onChange} {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Placement Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="self_employment">
                                Self Employment
                              </SelectItem>
                              <SelectItem value="wage_employment">
                                Wage Employment
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employerContactNo"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <>
                        <Label htmlFor="employerContact">
                          Employeer Contact Number
                        </Label>
                        <Input
                          placeholder="Employer Contact Number"
                          {...field}
                          id="employeerContact"
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="placementDistrict"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <>
                        <Label htmlFor="placementDistrict">
                          Placement District
                        </Label>
                        <Input
                          placeholder="Placement District"
                          {...field}
                          id="placementDistrict"
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="placementState"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <>
                        <Label htmlFor="placementState">Placement State</Label>
                        <Input
                          placeholder="Placement State"
                          {...field}
                          id="placementState"
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthlySalary"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <>
                        <Label htmlFor="monthlySalary">Monthly Salary</Label>
                        <Input
                          placeholder="Monthly Salary"
                          {...field}
                          id="monthlySalary"
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton
                loading={form.formState.isSubmitting}
                loadingText="Submitting"
                type="submit"
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
                }
              >
                {dataType === "new" ? "Submit" : "Update"}
              </LoadingButton>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
