import { useModal } from "@/hooks/useModalStore";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";

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
import DynamicSelect from "../ui/dynamic-select";

const formSchema = z.object({
  tpId: z.string().optional(),
  patnerCode: z.string().optional(),
  centerName: z.string().optional(),
  centerId: z.string().optional(),
  spocEmail: z.string().optional(),
  spocName: z.string().optional(),
  state: z.string().optional(),
  district: z.string().optional(),
  block: z.string().optional(),
  village: z.string().optional(),
  address: z.string().optional(),
  spocMobile: z.string().optional(),
  consituency: z.string().optional(),
  smartId: z.string().optional(),
});

export default function AddTcModal() {
  const { isOpen, onClose, type, setKey, data, dataType } = useModal();

  const isModalOpen = isOpen && type === "addTc";

  const handleClose = () => {
    onClose();
    form.reset({
      tpId: "",
      patnerCode: "",
      centerName: "",
      centerId: "",
      spocEmail: "",
      spocName: "",
      state: "",
      district: "",
      block: "",
      village: "",
      address: "",
      spocMobile: "",
      consituency: "",
      smartId: "",
    });
  };

  useEffect(() => {
    if (data?.pklTcId && data?.tcPatnerCode && type === "addTc") {
      form.reset({
        tpId: data.tpId,
        patnerCode: data.tcPatnerCode || "",
        centerName: data.tcCenterName || "",
        centerId: data.tcCenterId || "",
        spocEmail: data.tcSpocEmail || "",
        spocName: data.tcSpocName || "",
        state: data.tcState || "",
        district: data.tcDistrict || "",
        block: data.tcBlock || "",
        village: data.tcVillage || "",
        address: data.tcAddress || "",
        spocMobile: data.tcSpocMobile || "",
        consituency: data.tcConsituency || "",
        smartId: data.tcSmartId || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tpId: "",
      patnerCode: "",
      centerName: "",
      centerId: "",
      spocEmail: "",
      spocName: "",
      state: "",
      district: "",
      block: "",
      village: "",
      address: "",
      spocMobile: "",
      consituency: "",
      smartId: "",
    },
  });

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dataType === "new") {
      try {
        const { data } = await API.post("/sheet/manual/tc", { ...values });

        if (data.success) {
          toast.success("TC Form Submitted Successfully");
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
          toast.error("Error in Submitting TC Form");
        }
      }
    } else {
      try {
        const { data: resData } = await API.patch(
          `/sheet/update/tc/${data.pklTcId}`,
          { ...values }
        );

        if (resData.success) {
          toast.success("TC Updated Successfully");
        }

        handleClose();
        setTimeout(() => {
          setKey(Math.random());
        }, 500);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(`Error while Updating \n${error.response?.data.message}`);
        } else {
          toast.error("Error in Updating TC Detail");
        }
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden text-black bg-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            {dataType === "new" ? "Add" : "Update"} TC
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-scroll max-h-[40rem]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onFormSubmit)}
              className="flex flex-col gap-4 p-8"
            >
              <div className="flex flex-row items-center gap-4">
                <FormField
                  control={form.control}
                  name="tpId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tpId">TP ID</Label>
                          <DynamicSelect
                            url="/sheet/get/tp/ids"
                            onChange={field.onChange}
                            value={field.value}
                            optionName="tpId"
                            optionValue="tpId"
                            placeholder="TP ID"
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="patnerCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tcPartnerCode">Partner Code</Label>
                          <Input
                            id="tcPartnerCode"
                            placeholder="Tc Partner Code"
                            {...field}
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-row items-center gap-4">
                <FormField
                  control={form.control}
                  name="centerName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tcCenterName">Center Name</Label>
                          <Input
                            placeholder="Tc Center Name"
                            id="tcCenterName"
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
                  name="centerId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tcCenterId">Center Id</Label>
                          <Input
                            id="tcCenterId"
                            placeholder="Tc Center ID"
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
                  name="spocEmail"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tcSpocEmail">SPOC Email</Label>
                          <Input
                            id="tcSpocEmail"
                            placeholder="Tc Spoc Email"
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
                  name="spocName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tcSpocName">SPOC Name</Label>
                          <Input
                            placeholder="Tc Spoc Name"
                            id="tcSpocName"
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
                name="village"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <>
                        <Label htmlFor="tcVillage">Vilage</Label>
                        <Input
                          id="tcVillage"
                          placeholder="Tc Village"
                          {...field}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tcAddress">Address</Label>
                          <Input
                            placeholder="Tc Address"
                            id="tcAddress"
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
                  name="spocMobile"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tcSpocMobile">SPOC Mobile</Label>
                          <Input
                            id="tcSpocMobile"
                            placeholder="Tc Spoc Mobile"
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
                  name="consituency"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tcConstituency">Constituency</Label>
                          <Input
                            id="tcConstituency"
                            placeholder="Tc Constituency"
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
                  name="smartId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="tcSmartId">Smart Id</Label>
                          <Input
                            placeholder="Tc Smart ID"
                            id="tcSmartId"
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
