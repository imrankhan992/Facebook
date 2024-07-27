import ErrorToast from '@/components/ui/ErrorToast';
import { encryptData } from '@/helpers/encryptionData';
import axiosInstance from '@/utils/axios';
import Cookies from 'js-cookie';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const loginHook = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const loginUser = async (email, password) => {
        setLoading(true)
        try {
            const { data } = await axiosInstance.post("/login", {
                email,
                password,
            });
            if (data?.success) {
                const encryptedData = encryptData(data);
                Cookies.set('user', encryptedData, {
                    expires: 7,
                });
                dispatch({ type: "LOGIN", payload: data });
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            ErrorToast(error?.response?.data?.message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, loginUser }
}

export default loginHook
