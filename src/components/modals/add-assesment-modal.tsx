import { useModal } from "@/hooks/useModalStore";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { isAxiosError } from "axios";

import { API } from "@/utils/api";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import LoadingButton from "../ui/loading-button";
import { useEffect, useState } from "react";
import { formattedDate } from "@/lib/utils";
import DynamicSelect from "../ui/dynamic-select";
import AssessorNameAssessoridSelect from "../assessorname-assessorid-select";

const formSchema = z.object({
  batchId: z.string().optional(),
  sdmsBatchId: z.string().optional(),
  candidateId: z.string().optional(),
  assesed: z.boolean(),
  assesmentDate: z.string().optional(),
  assesmentAgency: z.string().optional(),
  assesmentAgencyMobile: z.string().optional(),
  assesmentAgencyEmail: z.string().optional(),
  result: z.string().optional(),
  resultDate: z.string().optional(),
  certificationStatus: z.string().optional(),
  totalMarks: z.string().optional(),
  obtainedMarks: z.string().optional(),
  marksheetUrl: z.string().optional(),
  certificateUrl: z.string().optional(),
});

export default function AddAssesmentModal() {
  const { isOpen, onClose, type, setKey, data, dataType } = useModal();
  const [accessorData, setAccessorData] = useState({
    accessorId: "",
    accessorName: "",
  });

  const isModalOpen = isOpen && type === "addAssesment";

  const handleClose = () => {
    onClose();
    form.reset({
      batchId: "",
      candidateId: "",
      sdmsBatchId: "",
      assesed: false,
      assesmentDate: "",
      assesmentAgency: "",
      assesmentAgencyMobile: "",
      assesmentAgencyEmail: "",
      result: "",
      resultDate: "",
      certificationStatus: "",
      totalMarks: "",
      obtainedMarks: "",
      certificateUrl: "",
      marksheetUrl: "",
    });
  };

  useEffect(() => {
    if (data?.pklAssesmentId && type === "addAssesment") {
      form.reset({
        batchId: data.batchId,
        candidateId: data.candidateId,
        sdmsBatchId: data.sdmsBatchId,
        assesed: data.assesed === 1,
        assesmentDate: data.assesmentDate
          ? formattedDate(data.assesmentDate)
          : "",
        assesmentAgency: data.assesmentAgency || "",
        assesmentAgencyMobile: data.assesmentAgencyMobile || "",
        assesmentAgencyEmail: data.assesmentAgency || "",
        result: data.result || "",
        resultDate: data.resultDate ? formattedDate(data.resultDate) : "",
        certificationStatus: data.certificateUrl || "",
        totalMarks: String(data.totalMarks) || "",
        obtainedMarks: String(data.obtainedMarks) || "",
        certificateUrl: data.certificateUrl || "",
        marksheetUrl: data.marksheetUrl || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      batchId: "",
      candidateId: "",
      sdmsBatchId: "",
      assesed: false,
      assesmentDate: "",
      assesmentAgency: "",
      assesmentAgencyMobile: "",
      assesmentAgencyEmail: "",
      result: "",
      resultDate: "",
      certificationStatus: "",
      totalMarks: "",
      obtainedMarks: "",
      certificateUrl: "",
      marksheetUrl: "",
    },
  });

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dataType === "new") {
      try {
        const { data } = await API.post("/sheet/manual/assesment", {
          ...values,
          ...accessorData,
        });

        if (data.success) {
          toast.success("Assesment Submitted Successfully");
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
          toast.error("Error in Submitting Assesment");
        }
      }
    } else {
      try {
        const { data: resData } = await API.patch(
          `/sheet/update/assesment/${data.pklAssesmentId}`,
          {
            ...values,
            ...accessorData,
          }
        );

        if (resData.success) {
          toast.success("Assesment Updated Successfully");
        }

        handleClose();
        setTimeout(() => {
          setKey(Math.random());
        }, 500);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(`Error while Updating \n${error.response?.data.message}`);
        } else {
          toast.error("Error in Updating");
        }
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 text-black bg-white md:max-w-2xl 2xl:max-w-3xl">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            {dataType === "new" ? "Add" : "Update"} Assesment
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
                  name="sdmsBatchId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="sdmsBatchId">SDMS Batch Id</Label>
                          <DynamicSelect
                            url="/sheet/get/batch/sdmsbatchids"
                            onChange={field.onChange}
                            value={field.value}
                            optionName="sdmsBatchId"
                            optionValue="sdmsBatchId"
                            placeholder="SDMS Batch Id"
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

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="assesed"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="space-y-2">
                          <Label htmlFor="assesed" className="w-full">
                            Assessed
                          </Label>
                          <div className="flex items-center justify-between w-full gap-2 p-2 py-3 border rounded-md">
                            <Label htmlFor="assesed" className="w-full">
                              Assessed
                            </Label>
                            <Checkbox
                              id="assesed"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assesmentDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="assesmentDate">Assesment Date</Label>

                          <Input
                            placeholder="Assesment Date"
                            id="assesmentDate"
                            type="date"
                            {...field}
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="assesmentAgency"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="assesmentAgency">Agency</Label>
                          <Input
                            placeholder="Assesment Agency"
                            id="assesmentAgency"
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
                  name="assesmentAgencyMobile"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="agencyMobile">Agency Mobile</Label>
                          <Input
                            id="agencyMobile"
                            placeholder="Assesment Agency Mobile"
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
                  name="assesmentAgencyEmail"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="agencyEmail">Agency Email</Label>
                          <Input
                            id="agencyEmail"
                            placeholder="Assesment Agency Email"
                            {...field}
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <AssessorNameAssessoridSelect
                accessorData={accessorData}
                setAccessorData={setAccessorData}
              />

              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="result"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="result">Result</Label>
                          <Input placeholder="Result" {...field} />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resultDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="resultDate">Result Date</Label>

                          <Input
                            placeholder="Result Date"
                            id="resultDate"
                            type="date"
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
                  name="certificationStatus"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="certificationStatus">
                            Certification Status
                          </Label>
                          <Input
                            placeholder="Certification Status"
                            {...field}
                            id="certificationStatus"
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="totalMarks"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="totalMarks">Total Marks</Label>
                          <Input
                            placeholder="Total Marks"
                            id="totalMarks"
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
                  name="obtainedMarks"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="obtainedMarks">Obtained Marks</Label>
                          <Input
                            placeholder="Obtained Marks"
                            {...field}
                            id="obtainedMarks"
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="marksheetUrl"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="marksheetUrl">Marksheet url</Label>
                          <Input placeholder="Marksheet URL" {...field} />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="certificateUrl"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="certificateUrl">
                            Certificate Url
                          </Label>
                          <Input placeholder="Certificate URL" {...field} />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
