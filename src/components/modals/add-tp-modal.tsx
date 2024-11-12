import { useModal } from "@/hooks/useModalStore";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
import StateDistrictBlock from "../state-district-block";
import { Label } from "../ui/label";
import { useEffect } from "react";

const formSchema = z.object({
  tpId: z.string().optional(),
  vsTpName: z.string().optional(),
  vsSpocEmail: z.string().optional(),
  iSpocContactNum: z.string().optional(),
  vsState: z.string().optional(),
  vsDistrict: z.string().optional(),
  vsBlock: z.string().optional(),
  vsVillage: z.string().optional(),
  vsSpocName: z.string().optional(),
  vsTpCode: z.string().optional(),
  vsAddress: z.string().optional(),
});

export default function AddTpModal() {
  const { isOpen, onClose, type, setKey, data, dataType } = useModal();

  const fklDepartmentId = localStorage.getItem("fklDepartmentId")
   const queryType = "TP"

  const isModalOpen = isOpen && type === "addTp";

  const handleClose = () => {
    onClose();
    form.reset({
      tpId: "",
      vsTpName: "",
      vsSpocEmail: "",
      iSpocContactNum: "",
      vsState: "",
      vsDistrict: "",
      vsBlock: "",
      vsVillage: "",
      vsSpocName: "",
      vsTpCode: "",
      vsAddress: "",
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tpId: "",
      vsTpName: "",
      vsSpocEmail: "",
      iSpocContactNum: "",
      vsState: "",
      vsDistrict: "",
      vsBlock: "",
      vsVillage: "",
      vsSpocName: "",
      vsTpCode: "",
      vsAddress: "",
    },
  });

  useEffect(() => {
    if (data?.tpId && data?.tpName && type === "addTp") {
      form.reset({
        tpId: data.tpId,
        vsTpName: data.vsTpName,
        vsSpocEmail: data.vsSpocEmail || "",
        iSpocContactNum: data.iSpocContactNum || "",
        vsState: data.vsState || "",
        vsDistrict: data.vsDistrict || "",
        vsBlock: data.vsBlock || "",
        vsVillage: data.vsVillage || "",
        vsSpocName: data.vsSpocName || "",
        vsTpCode: data.vsTpCode || "",
        vsAddress: data.vsAddress || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dataType === "new") {
      try {
        const { data } = await API.post("/manual-file-upload", { ...values,fklDepartmentId,queryType  });

        if (data.success) {
          toast.success("Tp Form Submitted Successfully");
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
          toast.error("Error in Submitting TP Form");
        }
      }
    } else {
      try {
        const { data: resData } = await API.patch(
          `/sheet/update/tp/${data.pklTpId}`,
          { ...values }
        );

        if (resData.success) {
          toast.success("TP Updated Submitted Successfully");
        }

        handleClose();
        setTimeout(() => {
          setKey(Math.random());
        }, 500);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(`Error while Updating \n${error.response?.data.message}`);
        } else {
          toast.error("Error in Updating TP");
        }
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden text-black bg-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            {dataType === "new" ? "Add" : "Update"} TP
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
                  name="tpId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tp_id">TP ID</Label>
                          <Input placeholder="Tp ID" id="tp_id" {...field} />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vsTpName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tp_name">TP Name</Label>
                          <Input
                            placeholder="Tp Name"
                            id="tp_name"
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
                  name="vsSpocEmail"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tp_spoc_email">TP SPOC Email</Label>
                          <Input
                            placeholder="Tp Spoc Email"
                            id="tp_spoc_email"
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
                  name="iSpocContactNum"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tp_spoc_mobile">TP SPOC Mobile</Label>
                          <Input
                            placeholder="Tp Spoc Mobile"
                            id="tp_spoc_mobile"
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
                  name="vsSpocName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tp_spoc_name">TP SPOC Name</Label>
                          <Input
                            placeholder="Tp Spoc Name"
                            id="tp_spoc_name"
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
                  name="vsTpCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tp_smart_id">TP Smart ID</Label>
                          <Input
                            placeholder="Tp Smart ID"
                            id="tp_smart_id"
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
                <StateDistrictBlock form={form} />
              </div>

              <FormField
                control={form.control}
                name="vsVillage"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <>
                        <Label htmlFor="tp_village">TP Village</Label>
                        <Input
                          placeholder="Tp Village"
                          id="tp_village"
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
                name="vsAddress"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <>
                        <Label htmlFor="tp_address">TP Address</Label>
                        <Input
                          placeholder="Tp Address"
                          id="tp_address"
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
