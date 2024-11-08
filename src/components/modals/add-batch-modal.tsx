import { useModal } from "@/hooks/useModalStore";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { API } from "@/utils/api";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import LoadingButton from "../ui/loading-button";
import { Label } from "../ui/label";
import { useEffect } from "react";
import { formattedDate } from "@/lib/utils";
import DynamicSelect from "../ui/dynamic-select";

const formSchema = z.object({
  batchId: z.string().optional(),
  sdmsBatchId: z.string().optional(),
  batchStartDate: z.string().optional(),
  batchEndDate: z.string().optional(),
  sectorName: z.string().optional(),
  qpnosCode: z.string().optional(),
  jobRoleName: z.string().optional(),
  tpName: z.string().optional(),
  tcPartnerCode: z.string().optional(),
  trainerId: z.string().optional(),
});

export default function AddBatchModal() {
  const { isOpen, onClose, type, setKey, data, dataType } = useModal();

  const isModalOpen = isOpen && type === "addBatch";

  const handleClose = () => {
    onClose();
    form.reset({
      batchId: "",
      sdmsBatchId: "",
      batchStartDate: "",
      batchEndDate: "",
      sectorName: "",
      qpnosCode: "",
      jobRoleName: "",
      tpName: "",
      tcPartnerCode: "",
      trainerId: "",
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      batchId: "",
      sdmsBatchId: "",
      batchStartDate: "",
      batchEndDate: "",
      sectorName: "",
      qpnosCode: "",
      jobRoleName: "",
      tpName: "",
      tcPartnerCode: "",
      trainerId: "",
    },
  });

  useEffect(() => {
    if (type === "addBatch" && data?.batchStartDate && data?.batchEndDate) {
      form.reset({
        batchId: data?.batchId,
        sdmsBatchId: data?.sdmsBatchId,
        batchStartDate: formattedDate(data?.batchStartDate),
        batchEndDate: formattedDate(data?.batchEndDate),
        sectorName: data?.sectorName,
        qpnosCode: data?.qpnosCode,
        jobRoleName: data?.jobRoleName,
        tpName: data?.tpName,
        tcPartnerCode: data?.tcPartnerCode,
        trainerId: data?.trainerId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dataType === "new") {
      try {
        const { data } = await API.post("/sheet/manual/batch", { ...values });

        if (data.success) {
          toast.success("Batch Form Submitted Successfully");
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
          toast.error("Error in Submitting Batch Form");
        }
      }
    } else {
      try {
        const { data: resData } = await API.patch(
          `/sheet/update/batch/${data.pklBatchId}`,
          { ...values }
        );

        if (resData.success) {
          toast.success("Updated Successfully");
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
          toast.error("Error in Submitting Batch Form");
        }
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden text-black bg-white w-[60vw]">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            {dataType === "new" ? "Add" : "Update"} Batch
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-scroll max-h-[40rem]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onFormSubmit)}
              className="flex flex-col w-full gap-4 p-8"
            >
              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="batchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <Label htmlFor="batchId">Batch Id</Label>
                          <Input
                            id="batchId"
                            placeholder="Batch Id"
                            {...field}
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sdmsBatchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <Label htmlFor="sdmsBatchId">SDMS Batch Id</Label>
                          <Input
                            id="sdmsBatchId"
                            placeholder="SDMS Batch Id"
                            {...field}
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="batchStartDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="batchStartDate">
                            Batch Start Date
                          </Label>
                          <Input
                            id="batchStartDate"
                            type="date"
                            placeholder="Batch Start Date"
                            {...field}
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="batchEndDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="batchEndDate">Batch End Date</Label>
                          <Input
                            id="batchEndDate"
                            type="date"
                            placeholder="Batch End Date"
                            {...field}
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="sectorName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="sectorName">Sector Name</Label>
                          <DynamicSelect
                            url="/sheet/get/course/sectors"
                            onChange={field.onChange}
                            value={field.value}
                            optionName="sectorName"
                            optionValue="sectorName"
                            placeholder="Sector Name"
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qpnosCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="qpnosCode">QPNOS Code</Label>
                          <DynamicSelect
                            url="/sheet/get/course/qpnos"
                            onChange={field.onChange}
                            value={field.value}
                            optionName="qpnosCode"
                            optionValue="qpnosCode"
                            placeholder="QPNOS Code"
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jobRoleName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="jobRoleName">Job Role Name</Label>
                          <DynamicSelect
                            url="/sheet/get/course/jobroles"
                            onChange={field.onChange}
                            value={field.value}
                            optionName="jobRoleName"
                            optionValue="jobRoleName"
                            placeholder="Job Role"
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="tpName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tpName">TP Name</Label>
                          <DynamicSelect
                            url="/sheet/get/tp/ids"
                            onChange={field.onChange}
                            value={field.value}
                            optionName="tpName"
                            optionValue="tpId"
                            placeholder="Tp Name"
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tcPartnerCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tcPartnerCode">TC Partner Code</Label>
                          <DynamicSelect
                            url="/sheet/get/tc/partnerCode"
                            onChange={field.onChange}
                            value={field.value}
                            optionName="tcPatnerCode"
                            optionValue="tcPatnerCode"
                            placeholder="TC Partner Code"
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trainerId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="sectorName">Trainer Id</Label>
                          <DynamicSelect
                            url="/sheet/get/trainer/ids"
                            onChange={field.onChange}
                            value={field.value}
                            optionName="trainerName"
                            optionValue="trainerId"
                            placeholder="Trainer Id"
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <LoadingButton
                loading={form.formState.isSubmitting}
                type="submit"
                loadingText={"Submitting"}
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
