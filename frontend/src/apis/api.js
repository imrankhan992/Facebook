import axiosInstance from "@/utils/axios";

export const activateEmail = async (token, user) => {
    try {
        const res = await axiosInstance.post(`/activate`, { token }, { headers: { Authorization: user?.token } });
        if (res.status !== 200) throw new Error(res.data.message);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to activate email");
    }
};

export const resendVerificationEmail = async (user) => {
    try {
        const res = await axiosInstance.post(`/resendEmail`, {}, { headers: { Authorization: user?.token } });
        if (res?.data?.success===false) throw new Error(res.data.message);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to resend verification email");
    }
};

// find account for reset password

export const reset_password_find_account = async(email) => {
    try {
        const res = await axiosInstance.post(`/reset-password-find-account`, { email });
        if (res.status !== 200) throw new Error(res.data.message);
         // Handle redirection
         if(res.request.responseURL){
            window.location.href = res.request.responseURL;
        }
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to find account");
    }
}
