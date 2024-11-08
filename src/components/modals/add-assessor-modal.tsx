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

const formSchema = z.object({
  assessorId: z.string().optional(),
  assessorName: z.string().optional(),
  email: z.string().optional(),
  mobile: z.string().optional(),
  assesmentAgency: z.string().optional(),
  validUpTo: z.string().optional(),
});

export default function AddAssessorModal() {
  const { isOpen, onClose, type, setKey, data, dataType } = useModal();

  const isModalOpen = isOpen && type === "addAssessor";

  const handleClose = () => {
    onClose();
    form.reset({
      assessorId: "",
      assessorName: "",
      email: "",
      mobile: "",
      assesmentAgency: "",
      validUpTo: "",
    });
  };

  useEffect(() => {
    if (data?.pklAssessorId && type === "addAssessor") {
      form.reset({
        assessorId: data?.assessorId,
        assessorName: data?.assessorName,
        email: data?.assessorEmail,
        mobile: data?.assessorMobile,
        assesmentAgency: data?.assesmentAgency,
        validUpTo: formattedDate(data?.validUpTo),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assessorId: "",
      assessorName: "",
      email: "",
      mobile: "",
      assesmentAgency: "",
      validUpTo: "",
    },
  });

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dataType === "new") {
      try {
        const { data } = await API.post("/sheet/manual/assessor", {
          ...values,
        });

        if (data.success) {
          toast.success("Assessor Added Successfully");
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
          toast.error("Error in Submitting Assessor");
        }
      }
    } else {
      try {
        const { data: resData } = await API.patch(
          `/sheet/update/assessor/${data.pklAssessorId}`,
          {
            ...values,
          }
        );

        if (resData.success) {
          toast.success("Assessor Updated Successfully");
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
            {dataType === "new" ? "Add" : "Update"} Assessor
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
                  name="assessorId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="assessorId">Assessor Id</Label>
                          <Input placeholder="Assessor Id" {...field} />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assessorName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="assessorName">Assessor Name</Label>
                          <Input placeholder="Assessor Name" {...field} />
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="email">Email</Label>
                          <Input placeholder="Email" {...field} />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="mobile">Mobile</Label>
                          <Input placeholder="Mobile" {...field} />
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
                          <Label htmlFor="assesmentAgency">
                            Assesment Agency
                          </Label>
                          <Input placeholder="Assesment Agency" {...field} />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="validUpTo"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="validUpTo">Valid Up To</Label>
                          <Input
                            placeholder="Valid Up To"
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
