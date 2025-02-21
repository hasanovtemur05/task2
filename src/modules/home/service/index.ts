import axiosInstance from "../../../api";
import { PostsDataType } from "../types";

// =================================  GET DATA  =============================================
export const getData = async () => {
    const response = await axiosInstance.get("posts");
    return response.data
};


// =================================  CREATE DATA  =============================================
export const createData = async (data:PostsDataType) => {
    const response = await axiosInstance.post("posts", data);
    return response.data;
};


// =================================  UPDATE DATA  =============================================
export const updateData = async (id:number, data:PostsDataType) => {
    const response = await axiosInstance.put(`posts/${id}`, data);
    return response.data;
};


// =================================  DELETE DATA  =============================================
export const deleteData = async (id:number) => {
    const response = await axiosInstance.delete(`posts/${id}`);
    return response.data;
};
