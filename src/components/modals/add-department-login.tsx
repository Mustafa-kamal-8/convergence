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

const formSchema = z.object({
    departmentName: z.string().optional(),
    loginName: z.string().optional(),
    password: z.string().optional(),
    phoneNumber: z.string().optional(),
});

export default function AddDepartmentLoginModal() {
    const { isOpen, onClose, type, setKey, data, dataType } = useModal();

    const isModalOpen = isOpen && type === "departmentLoginCreation";

    const handleClose = () => {
        onClose();
        form.reset({
            departmentName: "",
            loginName: "",
            password: "",
            phoneNumber: "",
        });
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            departmentName: "",
            loginName: "",
            password: "",
            phoneNumber: "",
        },
    });

    useEffect(() => {
        if (type === "addBatch" && data?.batchStartDate && data?.batchEndDate) {
            form.reset({
                departmentName: data?.batchId,
                loginName: data?.sdmsBatchId,
                phoneNumber: data?.sectorName,
                password: data?.qpnosCode,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { data } = await API.post("/department-creation/createDepartment", { ...values });

            if (data.success) {
                toast.success("Batch Form Submitted Successfully");
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
                toast.error("Error in Submitting Batch Form");
            }
        }
        // else {
        //     try {
        //         const { data: resData } = await API.patch(
        //             `/sheet/update/batch/${data.pklBatchId}`,
        //             { ...values }
        //         );

        //         if (resData.success) {
        //             toast.success("Updated Successfully");
        //         }

        //         handleClose();

        //         setTimeout(() => {
        //             setKey(Math.random());
        //         }, 500);
        //     } catch (error) {
        //         if (isAxiosError(error)) {
        //             toast.error(
        //                 `Error while Submitting Form \n${error.response?.data.message}`
        //             );
        //         } else {
        //             toast.error("Error in Submitting Batch Form");
        //         }
        //     }
        // }
    };

    return (
        <Dialog open={ isModalOpen } onOpenChange={ handleClose }>
            <DialogContent className="p-0 overflow-hidden text-black bg-white w-[60vw]">
                <DialogHeader className="px-6 pt-8">
                    <DialogTitle className="text-2xl font-bold text-center">
                        Department Login Creation
                    </DialogTitle>
                </DialogHeader>

                <div className="overflow-y-scroll max-h-[40rem]">
                    <Form { ...form }>
                        <form
                            onSubmit={ form.handleSubmit(onFormSubmit) }
                            className="flex flex-col w-full gap-4 p-8"
                        >
                            <div className="flex items-center gap-4">
                                <FormField
                                    control={ form.control }
                                    name="departmentName"
                                    render={ ({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <>
                                                    <Label htmlFor="departmentName">Department Name</Label>
                                                    <Input
                                                        id="departmentName"
                                                        placeholder="Department Name"
                                                        { ...field }
                                                    />
                                                </>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    ) }
                                />

                                <FormField
                                    control={ form.control }
                                    name="loginName"
                                    render={ ({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <>
                                                    <Label htmlFor="loginName">Username</Label>
                                                    <Input
                                                        id="loginName"
                                                        placeholder="Department Username"
                                                        { ...field }
                                                    />
                                                </>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    ) }
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <FormField
                                    control={ form.control }
                                    name="phoneNumber"
                                    render={ ({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <>
                                                    <Label htmlFor="phoneNumber">
                                                        Phone Number
                                                    </Label>
                                                    <Input
                                                        id="phoneNumber"
                                                        type="tel"
                                                        inputMode="numeric"
                                                        maxLength={ 10 }
                                                        placeholder="Department Phone Number"
                                                        { ...field }
                                                    />
                                                </>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    ) }
                                />

                                <FormField
                                    control={ form.control }
                                    name="password"
                                    render={ ({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <>
                                                    <Label htmlFor="password">Password</Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        placeholder="Enter Department Password"
                                                        { ...field }
                                                    />
                                                </>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    ) }
                                />
                            </div>

                            <LoadingButton
                                loading={ form.formState.isSubmitting }
                                type="submit"
                                loadingText={ "Submitting" }
                                disabled={
                                    form.formState.isSubmitting || !form.formState.isDirty
                                }
                            >
                                { dataType === "new" ? "Submit" : "Update" }
                            </LoadingButton>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
