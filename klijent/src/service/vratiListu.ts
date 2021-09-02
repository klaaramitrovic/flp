import axios from "axios";
import { SERVER } from "../constants";

export async function vratiListu<T>(putanja: string) {

    const res = await axios.get(SERVER + putanja);
    console.log(res.data)
    return res.data as T;
}