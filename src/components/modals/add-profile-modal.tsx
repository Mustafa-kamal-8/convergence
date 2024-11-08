import { useModal } from "@/hooks/useModalStore";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import LoadingButton from "../ui/loading-button";
import { Label } from "../ui/label";
import DynamicSelect from "../ui/dynamic-select";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { useEffect } from "react";
import { formattedDate } from "@/lib/utils";

const formSchema = z.object({
  batchId: z.string().optional(),
  candidateId: z.string().optional(),
  candidateName: z.string().optional(),
  candidateDOB: z.string().optional(),
  candidateAge: z.string().optional(),
  fatherName: z.string().optional(),
  idType: z.string().optional(),
  idNumber: z.string().optional(),
  religion: z.string().optional(),
  category: z.string().optional(),
  gender: z.string().optional(),
  mobileNo: z.string().optional(),
  email: z.string().optional(),
  education: z.string().optional(),
  disability: z.string().optional(),
  teaTribe: z.string().optional(),
  bpl: z.string().optional(),
  minority: z.string().optional(),
  candidateResidentialAddress: z.string().optional(),
  candidateResidentialDistrict: z.string().optional(),
  candidateResidentialBlock: z.string().optional(),
  candidateResidentialULB: z.string().optional(),
  candidateResidentialVillageCity: z.string().optional(),
  candidateResidentialPostOffice: z.string().optional(),
  candidateResidentialPoliceStation: z.string().optional(),
  candidateResidentialPINCode: z.string().optional(),
  candidateResidentialCouncilContituency: z.string().optional(),
  candidateResidentialAssemblyContituency: z.string().optional(),
  candidatePermanentAddress: z.string().optional(),
  candidatePermanentDistrict: z.string().optional(),
  candidatePermanentBlock: z.string().optional(),
  candidatePermanentULB: z.string().optional(),
  candidatePermanentVillageCity: z.string().optional(),
  candidatePermanentPostOffice: z.string().optional(),
  candidatePermanentPoliceStation: z.string().optional(),
  candidatePermanentPINCode: z.string().optional(),
  candidatePermanentCouncilContituency: z.string().optional(),
  candidatePermanentAssemblyContituency: z.string().optional(),
  candidateBankAccountHolderName: z.string().optional(),
  candidateBankAccountNumber: z.string().optional(),
  candidateBankName: z.string().optional(),
  candidateBankIFSC: z.string().optional(),
});

export default function AddProfileModal() {
  const { isOpen, onClose, type, setKey, data, dataType } = useModal();

  const isModalOpen = isOpen && type === "addProfile";

  const handleClose = () => {
    onClose();
    form.reset({
      batchId: "",
      candidateId: "",
      candidateName: "",
      candidateDOB: "",
      candidateAge: "",
      fatherName: "",
      idType: "",
      idNumber: "",
      religion: "",
      category: "",
      gender: "",
      mobileNo: "",
      email: "",
      education: "",
      disability: "",
      teaTribe: "",
      bpl: "",
      minority: "",
      candidateResidentialAddress: "",
      candidateResidentialDistrict: "",
      candidateResidentialBlock: "",
      candidateResidentialULB: "",
      candidateResidentialVillageCity: "",
      candidateResidentialPostOffice: "",
      candidateResidentialPoliceStation: "",
      candidateResidentialPINCode: "",
      candidateResidentialCouncilContituency: "",
      candidateResidentialAssemblyContituency: "",
      candidatePermanentAddress: "",
      candidatePermanentDistrict: "",
      candidatePermanentBlock: "",
      candidatePermanentULB: "",
      candidatePermanentVillageCity: "",
      candidatePermanentPostOffice: "",
      candidatePermanentPoliceStation: "",
      candidatePermanentPINCode: "",
      candidatePermanentCouncilContituency: "",
      candidatePermanentAssemblyContituency: "",
      candidateBankAccountHolderName: "",
      candidateBankAccountNumber: "",
      candidateBankName: "",
      candidateBankIFSC: "",
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      batchId: "",
      candidateId: "",
      candidateName: "",
      candidateDOB: "",
      candidateAge: "",
      fatherName: "",
      idType: "",
      idNumber: "",
      religion: "",
      category: "",
      gender: "",
      mobileNo: "",
      email: "",
      education: "",
      disability: "",
      teaTribe: "",
      bpl: "",
      minority: "",
      candidateResidentialAddress: "",
      candidateResidentialDistrict: "",
      candidateResidentialBlock: "",
      candidateResidentialULB: "",
      candidateResidentialVillageCity: "",
      candidateResidentialPostOffice: "",
      candidateResidentialPoliceStation: "",
      candidateResidentialPINCode: "",
      candidateResidentialCouncilContituency: "",
      candidateResidentialAssemblyContituency: "",
      candidatePermanentAddress: "",
      candidatePermanentDistrict: "",
      candidatePermanentBlock: "",
      candidatePermanentULB: "",
      candidatePermanentVillageCity: "",
      candidatePermanentPostOffice: "",
      candidatePermanentPoliceStation: "",
      candidatePermanentPINCode: "",
      candidatePermanentCouncilContituency: "",
      candidatePermanentAssemblyContituency: "",
      candidateBankAccountHolderName: "",
      candidateBankAccountNumber: "",
      candidateBankName: "",
      candidateBankIFSC: "",
    },
  });

  useEffect(() => {
    if (data?.pklProfileId && data.candidateDOB && type === "addProfile") {
      form.reset({
        batchId: data.batchId,
        candidateId: data.candidateID,
        candidateName: data.candidateName,
        candidateDOB: formattedDate(data.candidateDOB),
        candidateAge: String(data.age),
        fatherName: data.fatherName,
        idType: data.IDType,
        idNumber: data.IDNumber,
        religion: data.religion,
        category: data.category,
        gender: data.IDNumber,
        mobileNo: data.mobileNo,
        email: data.emailAddress,
        education: data.educationAttained,
        disability: data.ilsDisability ? "Yes" : "No",
        teaTribe: data.iIsTeaTribe ? "Yes" : "No",
        bpl: data.iIsBPLCardHolder ? "Yes" : "No",
        minority: data.iIsMinority ? "Yes" : "No",
        candidateResidentialAddress: data.candidateResidentialAddress || "",
        candidateResidentialDistrict: data.candidateResidentialDistrict || "",
        candidateResidentialBlock: data.candidateResidentialBlock || "",
        candidateResidentialULB: data.candidateResidentialULB || "",
        candidateResidentialVillageCity:
          data.candidateResidentialVillageCity || "",
        candidateResidentialPostOffice:
          data.candidateResidentialPostOffice || "",
        candidateResidentialPoliceStation:
          data.candidateResidentialPoliceStation || "",
        candidateResidentialPINCode: data.candidateResidentialPINCode || "",
        candidateResidentialCouncilContituency:
          data.candidateResidentialCouncilContituency || "",
        candidateResidentialAssemblyContituency:
          data.candidateResidentialAssemblyContituency || "",
        candidatePermanentAddress: data.candidatePermanentAddress || "",
        candidatePermanentDistrict: data.candidatePermanentDistrict || "",
        candidatePermanentBlock: data.candidatePermanentBlock || "",
        candidatePermanentULB: data.candidatePermanentULB || "",
        candidatePermanentVillageCity: data.candidatePermanentVillageCity || "",
        candidatePermanentPostOffice: data.candidatePermanentPostOffice || "",
        candidatePermanentPoliceStation:
          data.candidatePermanentPoliceStation || "",
        candidatePermanentPINCode: data.candidatePermanentPINCode || "",
        candidatePermanentCouncilContituency:
          data.candidatePermanentCouncilContituency || "",
        candidatePermanentAssemblyContituency:
          data.candidatePermanentAssemblyContituency || "",
        candidateBankAccountHolderName:
          data.candidateBankAccountHolderName || "",
        candidateBankAccountNumber: data.candidateBankAccountNumber || "",
        candidateBankName: data.candidateBankName || "",
        candidateBankIFSC: data.candidateBankIFSC || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dataType === "new") {
      try {
        const { data } = await API.post("/sheet/manual/profile", { ...values });

        if (data.success) {
          toast.success("Profile Submitted Successfully");
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
          toast.error("Error in Submitting Profile Form");
        }
      }
    } else {
      try {
        const { data: resData } = await API.patch(
          `/sheet/update/profile/${data.pklProfileId}`,
          { ...values }
        );

        if (resData.success) {
          toast.success("Profile Updated Successfully");
        }

        handleClose();
        setTimeout(() => {
          setKey(Math.random());
        }, 500);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(`Error while Updating \n${error.response?.data.message}`);
        } else {
          toast.error("Error in Updating Profile");
        }
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 text-black bg-white md:max-w-2xl 2xl:max-w-7xl">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            {dataType === "new" ? "Add" : "Update"} Profile
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
                          <Label htmlFor="batchId">Batch ID</Label>
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
                  name="candidateId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateId">Candidate ID</Label>
                          <Input
                            id="candidateId"
                            placeholder="Candidate ID"
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
                  name="candidateName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateName">Candidate Name</Label>
                          <Input
                            id="candidateName"
                            placeholder="Candidate Name"
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
                  name="candidateDOB"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateDOB">Candidate DOB</Label>
                          <Input
                            id="candidateDOB"
                            type="date"
                            placeholder="Candidate DOB"
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
                  name="candidateAge"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateAge">Candidate Age</Label>
                          <Input
                            id="candidateAge"
                            placeholder="Candidate Age"
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
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="fatherName">Father Name</Label>
                          <Input
                            id="fatherName"
                            placeholder="Father Name"
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
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="idType">Gender</Label>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
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
                  name="idType"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="idType">ID Type</Label>
                          <DynamicSelect
                            onChange={field.onChange}
                            url="/general/id_type"
                            optionName="vsIdTypeDisplayName"
                            optionValue="vsIdTypeDisplayName"
                            placeholder="Id Type"
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="idNumber">ID Number</Label>
                          <Input
                            id="idNumber"
                            placeholder="ID Number"
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
                  name="religion"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="idType">Religion</Label>
                          <DynamicSelect
                            onChange={field.onChange}
                            url="/general/religions"
                            optionName="vsReligionName"
                            optionValue="vsReligionName"
                            placeholder="Religion"
                          />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="idType">Category</Label>
                          <DynamicSelect
                            onChange={field.onChange}
                            url="/general/caste"
                            optionName="vsCasteName"
                            optionValue="vsCasteName"
                            placeholder="Category"
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
                  name="mobileNo"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="mobile">Mobile No</Label>
                          <Input
                            placeholder="Mobile No"
                            id="mobile"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            placeholder="Email Address"
                            id="email"
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
                  name="education"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="education">Education Attained</Label>
                          <Input
                            placeholder="Education Attained"
                            id="education"
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
                  name="disability"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="disability">Disability</Label>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger id="disability">
                              <SelectValue placeholder="Disability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="YES">YES</SelectItem>
                                <SelectItem value="NO">NO</SelectItem>
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
                  name="teaTribe"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="teaTribe">Tea Tribe</Label>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger id="teaTribe">
                              <SelectValue placeholder="Tea Tribe" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="YES">YES</SelectItem>
                                <SelectItem value="NO">NO</SelectItem>
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
                  name="bpl"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="idType" className="whitespace-nowrap">
                            BPL Card Holer
                          </Label>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="BPL Card Holder" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="YES">YES</SelectItem>
                                <SelectItem value="NO">NO</SelectItem>
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
                  name="minority"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="idType">Minority</Label>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Minority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="YES">YES</SelectItem>
                                <SelectItem value="NO">NO</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
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
                  name="candidateResidentialAddress"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="residentialAddress">
                            Candidate Residential Address{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Residential Address"
                            id="residentialAddress"
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
                  name="candidateResidentialDistrict"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateResidentialDistrict">
                            Candidate Residential District{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Residential District"
                            id="candidateResidentialDistrict"
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
                  name="candidateResidentialBlock"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateResidentialBlock">
                            Candidate Residential Block{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Residential Block"
                            id="candidateResidentialBlock"
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
                  name="candidateResidentialULB"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateResidentialULB">
                            Candidate Residential ULB{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Residential ULB"
                            id="candidateResidentialULB"
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
                  name="candidateResidentialVillageCity"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateResidentialVillageCity">
                            Candidate Residential Village/City{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Residential Village/City"
                            id="candidateResidentialVillageCity"
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
                  name="candidateResidentialPostOffice"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateResidentialPostOffice">
                            Candidate Residential Post Office{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Residential Post Office"
                            id="candidateResidentialPostOffice"
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
                  name="candidateResidentialPoliceStation"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateResidentialPoliceStation">
                            Candidate Residential Police Station{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Residential Police Station"
                            id="candidateResidentialPoliceStation"
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
                  name="candidateResidentialPINCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateResidentialPINCode">
                            Candidate Residential Pin Code{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Residential Pin Code"
                            id="candidateResidentialPINCode"
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
                  name="candidateResidentialCouncilContituency"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateResidentialCouncilContituency">
                            Candidate Residential Council Contituency{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Residential Council Contituency"
                            id="candidateResidentialCouncilContituency"
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
                  name="candidateResidentialAssemblyContituency"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateResidentialAssemblyContituency">
                            Candidate Residential Assembly Contituency{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Residential Assembly Contituency"
                            id="candidateResidentialAssemblyContituency"
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
                  name="candidatePermanentAddress"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidatePermanentAddress">
                            Candidate Permanent Address{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Permanent Address"
                            id="candidatePermanentAddress"
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
                  name="candidatePermanentDistrict"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidatePermanentDistrict">
                            Candidate Permanent District{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Permanent District"
                            id="candidatePermanentDistrict"
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
                  name="candidatePermanentBlock"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidatePermanentBlock">
                            Candidate Permanent Block{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Permanent Block"
                            id="candidatePermanentBlock"
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
                  name="candidatePermanentULB"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidatePermanentULB">
                            Candidate Permanent ULB{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Permanent ULB"
                            id="candidatePermanentULB"
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
                  name="candidatePermanentVillageCity"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidatePermanentVillageCity">
                            Candidate Permanent Village/City{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Permanent Village/City"
                            id="candidatePermanentVillageCity"
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
                  name="candidatePermanentPostOffice"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidatePermanentPostOffice">
                            Candidate Permanent Post Office{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Permanent Post Office"
                            id="candidatePermanentPostOffice"
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
                  name="candidatePermanentPoliceStation"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidatePermanentPoliceStation">
                            Candidate Permanent Police station{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Permanent Police station"
                            id="candidatePermanentPoliceStation"
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
                  name="candidatePermanentPINCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidatePermanentPINCode">
                            Candidate Permanent Pin Code{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Permanent Pin Code"
                            id="candidatePermanentPINCode"
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
                  name="candidatePermanentCouncilContituency"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidatePermanentCouncilContituency">
                            Candidate Permanent Council Contituency{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Permanent Council Contituency"
                            id="candidatePermanentCouncilContituency"
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
                  name="candidatePermanentAssemblyContituency"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidatePermanentAssemblyContituency">
                            Candidate Permanent Assembly Contituency{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Permanent Assembly Contituency"
                            id="candidatePermanentAssemblyContituency"
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
                  name="candidateBankAccountHolderName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateBankAccountHolderName">
                            Bank Holder Name{" "}
                          </Label>
                          <Input
                            placeholder="Bank Holder Name"
                            id="candidateBankAccountHolderName"
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
                  name="candidateBankAccountNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateBankAccountNumber">
                            Bank Account Number{" "}
                          </Label>
                          <Input
                            placeholder="Bank Account Number"
                            id="candidateBankAccountNumber"
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
                  name="candidateBankName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateBankName">
                            Candidate Bank Name{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Bank Name"
                            id="candidateBankName"
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
                  name="candidateBankIFSC"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <>
                          <Label htmlFor="candidateBankIFSC">
                            Candidate Bank IFSC{" "}
                          </Label>
                          <Input
                            placeholder="Candidate Bank IFSC"
                            id="candidateBankIFSC"
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
