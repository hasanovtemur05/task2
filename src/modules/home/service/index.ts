import axiosInstance from "../../../api";

export const getData = async()=>{
    const response = await axiosInstance.get("posts")
    return response?.data
}