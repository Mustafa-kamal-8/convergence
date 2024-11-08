import { useModal } from "@/hooks/useModalStore";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { API } from "@/utils/api";
import { isAxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import LoadingButton from "../ui/loading-button";
import { useEffect } from "react";
import { formattedDate } from "@/lib/utils";

const formSchema = z.object({
  dateValidFrom: z.string().optional(),
  dateValidUpto: z.string().optional(),
  sectorName: z.string().optional(),
  qpnosCode: z.string().optional(),
  jobRoleName: z.string().optional(),
  totalTheoryHours: z.string().optional(),
  totalPraticalHours: z.string().optional(),
});

export default function AddCourseModal() {
  const { isOpen, onClose, type, setKey, data, dataType } = useModal();

  const isModalOpen = isOpen && type === "addCourse";

  const handleClose = () => {
    onClose();
    form.reset({
      dateValidUpto: "",
      dateValidFrom: "",
      jobRoleName: "",
      qpnosCode: "",
      sectorName: "",
      totalTheoryHours: "",
      totalPraticalHours: "",
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateValidUpto: "",
      dateValidFrom: "",
      jobRoleName: "",
      qpnosCode: "",
      sectorName: "",
      totalTheoryHours: "",
      totalPraticalHours: "",
    },
  });

  useEffect(() => {
    if (data?.dateValidFrom && data?.dateValidUpto && type === "addCourse") {
      form.reset({
        dateValidFrom: formattedDate(data.dateValidFrom),
        dateValidUpto: formattedDate(data.dateValidUpto),
        jobRoleName: data.jobRoleName,
        qpnosCode: data.qpnosCode,
        sectorName: data.sectorName,
        totalTheoryHours: String(data.totalTheoryHours),
        totalPraticalHours: String(data.totalPraticalHours),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dataType === "new") {
      try {
        const { data } = await API.post("/sheet/manual/course", { ...values });

        if (data.success) {
          toast.success("Course Form Submitted Successfully");
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
          `/sheet/update/course/${data.pklCourseId}`,
          { ...values }
        );

        if (resData.success) {
          toast.success("Course Updated Successfully");
        }

        handleClose();
        setTimeout(() => {
          setKey(Math.random());
        }, 500);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(`Error while Updating \n${error.response?.data.message}`);
        } else {
          toast.error("Error in Updating Course");
        }
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden text-black bg-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            {dataType === "new" ? "Add" : "Update"} Course
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
                  name="dateValidFrom"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="batchStart">Date Valid From</Label>
                          <Input
                            placeholder="Date Valid From"
                            type="date"
                            id="batchStart"
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
                  name="dateValidUpto"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="batchEnd">Date Valid Upto</Label>
                          <Input
                            placeholder="Date Valid Upto"
                            id="batchEnd"
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

              <FormField
                control={form.control}
                name="sectorName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <>
                        <Label htmlFor="sectorName">Sector Name</Label>
                        <Input
                          placeholder="Sector Name"
                          id="sectorName"
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
                name="qpnosCode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <>
                        <Label htmlFor="qpnosCode">QPNOS Code</Label>
                        <Input
                          placeholder="QPNOS Code"
                          id="qpnosCode"
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
                name="jobRoleName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <>
                        <Label htmlFor="jobRole">Job Role Name</Label>
                        <Input
                          placeholder="Job Role Name"
                          id="jobRole"
                          {...field}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="totalTheoryHours"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="totalTheoryHours">
                            Total Theory Hours
                          </Label>
                          <Input
                            id="totalTheoryHours"
                            placeholder="Total Theory Hours"
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
                  name="totalPraticalHours"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="totalPraticalHours">
                            Total Pratical Hours
                          </Label>
                          <Input
                            id="totalPraticalHours"
                            placeholder="Total Pratical Hours"
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
