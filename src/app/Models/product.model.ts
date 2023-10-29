export interface ProductModelServer{
    ProductID: number;
    ProductName: string;
    Price: number;
    Description: string;
    ImageURL: string;
    Rating: number;
    CategoryID: number;
}

export interface ServerResponse{
    count: number;
    products: ProductModelServer[];
}