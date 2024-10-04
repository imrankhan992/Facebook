import dataURItoBlob from "@/helpers/dataURItoBlob";
import { encryptData } from "@/helpers/encryptionData";
import axiosInstance from "@/utils/axios";
import Cookies from "js-cookie";

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
        if (res?.data?.success === false) throw new Error(res.data.message);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to resend verification email");
    }
};

// find account for reset password

export const reset_password_find_account = async (email) => {
    try {
        const res = await axiosInstance.post(`/reset-password-find-account`, { email });
        if (res.status !== 200) throw new Error(res.data.message);
        // Handle redirection
        if (res.request.responseURL) {
            window.location.href = res.request.responseURL;
        }
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to find account");
    }
}
export const reset_password_send_code = async (email) => {
    try {
        const res = await axiosInstance.post(`/rest_Password/send-code`, { email });
        if (res.status !== 200) throw new Error(res.data.message);
        // Handle redirection
        if (res.request.responseURL) {
            window.location.href = res.request.responseURL;
        }
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to find account");
    }
}
export const reset_password_verify_code = async ({ resetCode, cuid }) => {
    try {

        const res = await axiosInstance.post(`/rest_Password/code/verify`, { resetCode, cuid });
        if (res.status !== 200) throw new Error(res.data.message);
        // Handle redirection
        if (res.request.responseURL) {
            window.location.href = res.request.responseURL;
        }
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to verify code");
    }
}
// send reset password token to backend to verify token valid or not
export const reset_password_check_token = async (token) => {
    try {
        const res = await axiosInstance.post(`/rest_Password/check_token`, { sec_Id: token });
        if (res.status !== 200) throw new Error(res.data.message);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to check token");
    }
}


// update password
export const update_password = async ({ password, sec_Id }) => {
    try {

        const res = await axiosInstance.post(`/rest_Password/update-password`, { password, sec_Id });
        if (res.status !== 200) throw new Error(res.data.message);

        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update password");
    }
}


// post apis

export const createPost = async ({ type, text, images, background, user, token }) => {
    try {
        const { data } = await axiosInstance.post("/create-post", { type, text, images, background, user }, { headers: { Authorization: token } })
        if (data.success === false) throw new Error(data.message);
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to create post")
    }
}

// upload images 
export const uploadImages = async ({ type, text, images, background, user, token, username }) => {
    try {


        const path = `${username}/post Images`;
        let formData = new FormData();
        formData.append("path", path);

        const files = images.map((image) => {
            return dataURItoBlob(image);
        })
        files.forEach((file) => {
            formData.append("file", file);
        })
        const { data: urls, status } = await axiosInstance.post("/uploadImage", formData, { headers: { Authorization: token, "content-type": "multipart/form-data", } });
        if (status !== 201) throw new Error(urls?.message)
        const { data } = await axiosInstance.post("/create-post", { type: null, text, images: urls, user }, { headers: { Authorization: token } })
        if (data.success === false) throw new Error(data.message);
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message)
    }
}


// get all posts 
export const getPosts = async ({ pageParam=1,token }) => {
    try {
        console.log("pageParams", pageParam)
        const { data } = await axiosInstance.get(`/get-posts?page=${pageParam}&limit=2`, { headers: { Authorization: token } });
        if (data.success === false) throw new Error(data.message);
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to get posts")
    }
}