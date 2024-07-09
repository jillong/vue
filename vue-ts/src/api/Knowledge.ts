import axios from "axios";
import {QueryFileDto} from "@/entity/chatDTO";

export const uploadFileApi = async (filesList: File[]): Promise<any> => {
    let formData = new FormData();
    filesList.forEach((file) => {
        formData.append("files", file);
    });

    return axios.post("http://localhost:8090/know", formData);
};

export const queryFileApi = async (params: QueryFileDto): Promise<any> => {
    return axios.get("http://localhost:8090/know", {params})
}

export const deleteFileApi = async (id: string): Promise<any> => {
    return axios.delete(`http://localhost:8090/know/${id}`)
}
