import ErrorToast from "@/components/ui/ErrorToast";
import { encryptData } from "@/helpers/encryptionData";
import axiosInstance from "@/utils/axios";
import { useRouter } from "@tanstack/react-router";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const registerHook = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const registerUser = async (
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender
    ) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.post("/register", {
                first_name,
                last_name,
                email,
                password,
                bYear,
                bMonth,
                bDay,
                gender,
            });
            if (data?.success) {
                toast.success(data.message);
                delete data.message;
                delete data.success;
                const encryptedData = encryptData(data);
                Cookies.set('user', encryptedData, {
                    expires: 7,
                });
                dispatch({ type: "LOGIN", payload: data });
                router.navigate({
                    to:"/"
                })
            }
        } catch (error) {
            
            ErrorToast(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, registerUser };
};

export default registerHook;



