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
