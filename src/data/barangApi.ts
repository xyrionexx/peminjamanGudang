import api from "@/config/axiosConfig";
import { AxiosResponse } from "axios";

export async function getAllBarang() {
	try {
		const response: AxiosResponse = await api.get("/barang/");
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function getUserSession() {
	try {
		const response: AxiosResponse = await api.get('/user');
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}