const API_URL = import.meta.env.VITE_API_URL

export interface SearchFilter {
    name?: string;
    sku?: string;
    maxPrice?: number;
    minPrice?: number;
}

export interface Product {
    id: number;
    sku: string;
    name: string;
    price: number;
    quantity: number;
    sellerId: number;
    createdAt: string;
    updatedAt: string;
}

interface SearchResponse {
    products: Product[] | null;
    responseCode: number;
}

interface MinMaxPrice {
    smallestPrice: number;
    highestPrice: number;
}

export interface AddProduct {
    sku: string;
    name: string;
    price: number;
    quantity: number;
}

export async function searchProducts(filters: SearchFilter): Promise<SearchResponse> {
    // const sessionToken = sessionStorage.getItem('sessionToken');
    // if (!sessionToken) {
    //     throw new Error("No session token found")
    // }
    let queryString = '?';
    for (const [filterKey, filterValue] of Object.entries(filters)) {
        if (filterValue) {
            queryString += `${filterKey}=${filterValue}&`
        }
    }
    queryString = queryString.slice(0, -1);
    const response = await fetch(`${API_URL}/product/search${queryString}`, {
        method: 'GET', headers: {
            "Content-Type": "application/json",
            // "Authorization": sessionToken,
        }
    });
    if (!response.ok) {
        return { products: null, responseCode: response.status }
    }
    const result = await response.json() as Product[];
    return { products: result, responseCode: response.status };
}

export async function addProduct(product: AddProduct): Promise<number> {
    const sessionToken = sessionStorage.getItem('sessionToken');
    if (!sessionToken) {
        throw new Error("No session token found")
    }
    const response = await fetch(`${API_URL}/product`, {
        method: 'POST', headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionToken,
        },
        body: JSON.stringify(product)
    });
    return response.status
}

export async function getOnwProducts(): Promise<SearchResponse> {
    const sessionToken = sessionStorage.getItem('sessionToken');
    if (!sessionToken) {
        throw new Error("No session token found")
    }
    const response = await fetch(`${API_URL}/product/mine`, {
        method: 'GET', headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionToken,
        }
    });
    if (!response.ok) {
        return { products: null, responseCode: response.status }
    }
    const result = await response.json() as Product[];
    return { products: result, responseCode: response.status };
}

export async function getAllProducts(email?: string): Promise<SearchResponse> {
    const sessionToken = sessionStorage.getItem('sessionToken');
    if (!sessionToken) {
        throw new Error("No session token found")
    }
    const filter = email? '?email='+ email: '';
    const response = await fetch(`${API_URL}/product/all?${filter}`, {
        method: 'GET', headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionToken,
        }
    });
    if (!response.ok) {
        return { products: null, responseCode: response.status }
    }
    const result = await response.json() as Product[];
    return { products: result, responseCode: response.status };
}

export async function getMinMaxPrice(): Promise<MinMaxPrice> {
    const response = await fetch(`${API_URL}/product/minmax-price`, {
        method: 'GET', headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        throw new Error("Error obteniendo valores minimos y maximos")
    }
    return response.json() as Promise<MinMaxPrice>;
}
