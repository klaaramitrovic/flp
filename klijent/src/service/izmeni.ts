import axios from "axios";
import { SERVER } from "../constants";


export async function izmeni<T>(putanja: string, id: number, telo: Partial<T>) {

    const res = await axios.patch(SERVER + putanja + '/' + id, telo);
    return res.data;
}