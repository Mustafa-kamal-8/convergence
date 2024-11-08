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

const formSchema = z.object({
  trainerId: z.string().optional(),
  trainerName: z.string().optional(),
  trainerEmail: z.string().optional(),
  mobile: z.string().optional(),
  pancard: z.string().optional(),
});

export default function AddTrainerModal() {
  const { isOpen, onClose, type, setKey, data, dataType } = useModal();

  const isModalOpen = isOpen && type === "addTrainer";

  const handleClose = () => {
    onClose();
    form.reset({
      trainerId: "",
      trainerName: "",
      trainerEmail: "",
      mobile: "",
      pancard: "",
    });
  };

  useEffect(() => {
    if (data?.pklTrainerId && type === "addTrainer") {
      form.reset({
        trainerId: data?.trainerId,
        trainerName: data?.trainerName,
        trainerEmail: data?.trainerEmail,
        mobile: data?.trainerMobile,
        pancard: data?.pancard,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trainerId: "",
      trainerName: "",
      trainerEmail: "",
      mobile: "",
      pancard: "",
    },
  });

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dataType === "new") {
      try {
        const { data } = await API.post("/sheet/manual/trainer", {
          ...values,
        });

        if (data.success) {
          toast.success("Trainer Added Successfully");
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
          toast.error("Error in Adding Trainer");
        }
      }
    } else {
      try {
        const { data: resData } = await API.patch(
          `/sheet/update/trainer/${data.pklTrainerId}`,
          {
            ...values,
          }
        );

        if (resData.success) {
          toast.success("Trainer Updated Successfully");
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
            {dataType === "new" ? "Add" : "Update"} Trainer
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
                  name="trainerId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="trainerId">Trainer Id</Label>
                          <Input placeholder="Trainer Id" {...field} />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trainerName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="trainerName">Trainer Name</Label>
                          <Input placeholder="Trainer Name" {...field} />
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
                  name="trainerEmail"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="trainerEmail">Trainer Email</Label>
                          <Input placeholder="Trainer Email" {...field} />
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

                <FormField
                  control={form.control}
                  name="pancard"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="pancard">Pancard</Label>
                          <Input placeholder="Pancard" {...field} />
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
