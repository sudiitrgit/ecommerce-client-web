import { Product } from "@/types";
import axios from "axios";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string,
    sizeId?: string,
    isFeatured?: boolean
}

const getProducts = async (query: Query) : Promise<Product[]> => {
    
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            sizeId: query.sizeId,
            categoryId: query.categoryId,
            isFeatured: query.isFeatured,
        }
    })

    const res = await axios.get(url)

    return res.data
}

export default getProducts