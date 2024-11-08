import { useModal } from "@/hooks/useModalStore";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
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
import { Label } from "../ui/label";
import LoadingButton from "../ui/loading-button";
import { useEffect } from "react";
import { formattedDate } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DynamicSelect from "../ui/dynamic-select";

const formSchema = z.object({
  batchId: z.string().optional(),
  invoiceType: z.string().optional(),
  invoiceTranche: z.string().optional(),
  date: z.string().optional(),
  invoiceNumber: z.string().optional(),
  amount: z.string().optional(),
  rate: z.string().optional(),
  noOfCandidates: z.string().optional(),
});

export default function AddInvoiceModal() {
  const { isOpen, onClose, type, setKey, data, dataType } = useModal();

  const isModalOpen = isOpen && type === "addInvoice";

  const handleClose = () => {
    onClose();
    form.reset({
      batchId: "",
      invoiceType: "",
      invoiceTranche: "",
      date: "",
      invoiceNumber: "",
      rate: "",
      noOfCandidates: "",
      amount: "",
    });
  };

  useEffect(() => {
    if (data?.pklInvoiceId && type === "addInvoice") {
      form.reset({
        batchId: data?.batchId,
        invoiceType: data?.invoiceType,
        invoiceTranche: data?.invoiceTranche,
        date: formattedDate(data?.date),
        invoiceNumber: data?.invoiceNumber,
        rate: String(data?.rate),
        amount: String(data?.amount),
        noOfCandidates: String(data?.noOfCandidates),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      batchId: "",
      invoiceType: "",
      invoiceTranche: "",
      date: "",
      invoiceNumber: "",
      rate: "",
      noOfCandidates: "",
      amount: "",
    },
  });

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dataType === "new") {
      try {
        const { data } = await API.post("/sheet/manual/invoice", {
          ...values,
        });

        if (data.success) {
          toast.success("Invoice Added Successfully");
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
          toast.error("Error in Adding Invoice");
        }
      }
    } else {
      try {
        const { data: resData } = await API.patch(
          `/sheet/update/invoice/${data.pklInvoiceId}`,
          {
            ...values,
          }
        );

        if (resData.success) {
          toast.success("Invoice Updated Successfully");
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
      <DialogContent className="p-0 text-black bg-white md:max-w-2xl 2xl:max-w-7xl">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            {dataType === "new" ? "Add" : "Update"} Invoice
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-scroll max-h-[40rem]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onFormSubmit)}
              className="flex flex-col gap-4 p-8"
            >
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="batchId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="batchId">Batch</Label>
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
                  name="invoiceType"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="invoiceType">Invoice Type</Label>
                          <Select
                            {...field}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select invoice type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="assesment">
                                  Assesment
                                </SelectItem>
                                <SelectItem value="training">
                                  Training
                                </SelectItem>
                                <SelectItem value="placement">
                                  Placement
                                </SelectItem>
                                <SelectItem value="hostel">Hostel</SelectItem>
                                <SelectItem value="others">Others</SelectItem>
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
                  name="invoiceTranche"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="invoiceTranche">
                            Invoice Tranche
                          </Label>
                          <Input placeholder="Invoice Tranche" {...field} />
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
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="date">Date</Label>
                          <Input placeholder="Date" type="date" {...field} />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="invoiceNumber">Invoice Number</Label>
                          <Input placeholder="Invoice Number" {...field} />
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
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="amount">Amount</Label>
                          <Input placeholder="Amount" {...field} />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="rate">Rate</Label>
                          <Input placeholder="Rate" {...field} />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="noOfCandidates"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="noOfCandidates">
                            No Of Candidates
                          </Label>
                          <Input placeholder="No Of Candidates" {...field} />
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
