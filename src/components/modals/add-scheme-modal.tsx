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

const formSchema = z.object({
  schemeFundingType: z.string().optional(),
  schemeFundingRatio: z.string().optional(),
  sanctionOrderNo: z.string().optional(),
  dateOfSanction: z.string().optional(),
  schemaType: z.string().optional(),
  fundName: z.string().optional(),
  scheme: z.string().optional(),
  schemeCode: z.string().optional(),
});

export default function AddSchemeModal() {
  const { isOpen, onClose, type, setKey, data, dataType } = useModal();

  const isModalOpen = isOpen && type === "addScheme";

  const handleClose = () => {
    onClose();
    form.reset({
      schemeFundingType: "",
      schemeFundingRatio: "",
      sanctionOrderNo: "",
      dateOfSanction: "",
      schemaType: "",
      fundName: "",
      scheme: "",
      schemeCode: "",
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schemeFundingType: "",
      schemeFundingRatio: "",
      sanctionOrderNo: "",
      dateOfSanction: "",
      schemaType: "",
      fundName: "",
      scheme: "",
      schemeCode: "",
    },
  });

  useEffect(() => {
    if (
      ((data?.schemeFundingType && data?.dateOfSanction) || data?.schemeCode) &&
      type === "addScheme"
    ) {
      console.log(data);
      form.reset({
        schemeFundingType: String(data.schemeFundingType),
        schemeFundingRatio: data.schemeFundingRatio,
        sanctionOrderNo: data.sanctionOrderNo,
        dateOfSanction: formattedDate(data.dateOfSanction),
        schemaType: data.schemeType,
        fundName: data.fundName,
        scheme: data.scheme,
        schemeCode: data.schemeCode,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dataType === "new") {
      try {
        const { data } = await API.post("/sheet/manual/scheme", { ...values });

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
          `/sheet/update/scheme/${data.pklSchemeId}`,
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
          toast.error("Error in Submitting Target Form");
        }
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden text-black bg-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            {dataType === "new" ? "Add" : "Update"} Scheme
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
                  name="schemeFundingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <Label htmlFor="schemeFundingType">
                            Scheme Funding Type
                          </Label>
                          <Input
                            placeholder="Scheme Funding Type"
                            id="schemeFundingType"
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
                  name="schemeFundingRatio"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <Label htmlFor="schemeFundingRatio">
                            Scheme Funding Ratio
                          </Label>
                          <Input
                            placeholder="Scheme Funding Ratio"
                            id="schemeFundingRatio"
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
                  name="sanctionOrderNo"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="sanctionOrderNo">
                            Sanction Order No
                          </Label>
                          <Input
                            id="sanctionOrderNo"
                            placeholder="Sanction Order No"
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
                  name="dateOfSanction"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="dateOfSanction">
                            Date of Sanction
                          </Label>
                          <Input
                            id="dateOfSanction"
                            type="date"
                            placeholder="Date of Sanction"
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
                  name="schemaType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <Label htmlFor="schemaType">Scheme Type</Label>
                          <Input
                            id="schemaType"
                            placeholder="Scheme Type"
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
                  name="fundName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <Label htmlFor="fundName">Fund Name</Label>
                          <Input
                            id="fundName"
                            placeholder="Fund Name"
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
                  name="scheme"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <Label htmlFor="scheme">Scheme</Label>
                          <Input id="scheme" placeholder="Scheme" {...field} />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schemeCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <Label htmlFor="schemeCode">Scheme Code</Label>
                          <Input
                            id="schemeCode"
                            placeholder="Scheme Code"
                            {...field}
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
