import axios from "axios";
import { SERVER } from "../constants";


export async function kreiraj<T>(putanja: string, telo: Partial<T>) {
    const res = await axios.post(SERVER + putanja, telo);
    const data = res.data;
    return data;
}