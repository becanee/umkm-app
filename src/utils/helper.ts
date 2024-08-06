import { Response } from "express"
import { getCity, getProvince, getState } from "../controllers/location/location";

export const responseBuilder = (res: Response, data: any, httpCode: number) => {

    if (httpCode === 200 || httpCode === 201) {
        res.status(httpCode).send({
            status: true,
            httpCode: httpCode,
            message: "success",
            data: data.data,
        });
    } else {
        res.status(httpCode).send({
            status: false,
            httpCode: httpCode,
            message: data.error,
        });
    }
}

export const responseLocationBuilder = async (res: Response, data: any, httpCode: number) => {
    const province: any = await getProvince();
    const state: any = await getState(data.data?.province);
    const city: any = await getCity(data.data?.state);
    
    if (httpCode === 200 || httpCode === 201) {
        res.status(httpCode).send({
            status: true,
            httpCode: httpCode,
            message: "success",
            data: {
                ...data.data,
                province: province?.filter((el: any) => el.id === data.data?.province)[0]?.name,
                state: state?.filter((el: any) => el.id === data.data?.state)[0]?.name,
                city: city?.filter((el: any) => el.id === data.data?.city)[0]?.name,
            },
        });
    } else {
        res.status(httpCode).send({
            status: false,
            httpCode: httpCode,
            message: data.error,
        });
    }
}