import axios from "axios";
import { SERVER } from "../constants";


export async function obrisiSaServera(putanja: string, id: number) {
    const res = await axios.delete(SERVER + putanja + '/' + id);

}