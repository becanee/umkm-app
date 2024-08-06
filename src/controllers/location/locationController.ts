import { Request, Response } from "express";
import { getCity, getProvince, getState } from "../location/location";


export const getAllProvince = async (req: Request, res: Response) => {
    const province = await getProvince();

    res.status(200).json({ province: province });
};

export const getAllState = async (req: Request, res: Response) => {
    const state = await getState(req.params.province_id);

    res.status(200).json({
        state: state.map(function (item: any) {
            delete item.id_provinsi;
            return item;
        })
    });
};

export const getAllCity = async (req: Request, res: Response) => {
    const city = await getCity(req.params.state_id);

    res.status(200).json({
        city: city.map(function (item: any) {
            delete item.id_kabupaten;
            return item;
        })
    });
};