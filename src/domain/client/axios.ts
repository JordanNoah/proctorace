import axios, {AxiosInstance,AxiosRequestConfig} from "axios";

class Axios {
    private static instance: Axios;
    private axiosInstance: AxiosInstance;

    private constructor(
        baseUrl: string
    ) {
        this.axiosInstance = axios.create({
            baseURL:baseUrl,
            timeout:5000,
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            },

        })
    }

    public static getInstance(baseURL: string): Axios{
        if(!this.instance) {
            this.instance = new Axios(baseURL);
        }
        return this.instance;
    }

    public getAxiosInstance(): AxiosInstance {
        return this.axiosInstance;
    }

    public async get<T>(url:string, config?: AxiosRequestConfig): Promise<T>{
        return this.axiosInstance.get(url,config)
    }

    public async post<T>(data?: object, config?: AxiosRequestConfig): Promise<T> {
        console.log(this.axiosInstance.getUri());
        
        const response = await this.axiosInstance.post('', data, config)        
    
        if (response && response.data) {
            return response.data as T;
        } else {
            throw new Error("No data in response");  // Handle the case where there's no data
        }
    }
}


export default Axios;