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
  sanctionNo: z.string().optional(),
  sanctionDate: z.string().optional(),
  schemeCode: z.string().optional(),
  totalTarget: z.string().optional(),
});

export default function AddTargetModal() {
  const { isOpen, onClose, type, setKey, data, dataType } = useModal();

  const isModalOpen = isOpen && type === "addTarget";

  const handleClose = () => {
    onClose();
    form.reset({
      sanctionNo: "",
      sanctionDate: "",
      schemeCode: "",
      totalTarget: "",
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sanctionNo: "",
      sanctionDate: "",
      schemeCode: "",
      totalTarget: "",
    },
  });

  useEffect(() => {
    if (
      ((data?.sanctionNo && data?.sanctionDate) || data?.schemeCode) &&
      type === "addTarget"
    ) {
      form.reset({
        sanctionNo: data.sanctionNo,
        sanctionDate: formattedDate(data.sanctionDate),
        schemeCode: data.schemeCode,
        totalTarget: String(data.totalTarget),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dataType === "new") {
      try {
        const { data } = await API.post("/sheet/manual/target", { ...values });

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
          `/sheet/update/target/${data.pklTargetId}`,
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
            {dataType === "new" ? "Add" : "Update"} Target
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-scroll max-h-[40rem]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onFormSubmit)}
              className="flex flex-col w-full gap-4 p-8"
            >
              <FormField
                control={form.control}
                name="sanctionNo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <Label htmlFor="sanctionNo">Sanction Order No</Label>
                        <Input
                          placeholder="Sanction Order No"
                          id="sanctionNo"
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
                name="sanctionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <Label htmlFor="sanctionDate">Sanction Date</Label>
                        <Input
                          placeholder="Date of Sanction"
                          type="date"
                          id="sanctionDate"
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
                name="schemeCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <Label htmlFor="schemeCode">Scheme Code</Label>
                        <DynamicSelect
                          onChange={field.onChange}
                          url="/sheet/get/scheme/codes"
                          optionName="schemeCode"
                          optionValue="schemeCode"
                          placeholder="Scheme Code"
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalTarget"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <Label htmlFor="totalTarget">Total Target</Label>
                        <Input
                          id="totalTarget"
                          placeholder="Total Target"
                          {...field}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
