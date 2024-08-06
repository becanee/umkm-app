import { NextFunction, Request, Response } from "express";
import { supabase } from "../../config/supabase";
import { getCity, getProvince, getState } from "../location/location";
import { responseBuilder } from "../../utils/helper";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const response: any = await supabase.from('users').select('id, username, is_approve, email, phone_number, profile_pict, address, role, description, created_at').order('id', { ascending: true });

        responseBuilder(res, { ...response, data: response.data }, response.status);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const getUserByID = async (req: Request, res: Response) => {
    try {
        if (req.params.id) {
            const response: any = await supabase.from('users').select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at').eq('id', req.params.id).order('id', { ascending: true });
            const province: any = await getProvince();
            const state: any = await getState(response.data[0]?.province);
            const city: any = await getCity(response.data[0]?.state);

            responseBuilder(res, {
                ...response,
                data: {
                    ...response.data[0],
                    province: province?.filter((el: any) => el.id === response.data[0]?.province)[0]?.name,
                    state: state?.filter((el: any) => el.id === response.data[0]?.state)[0]?.name,
                    city: city?.filter((el: any) => el.id === response.data[0]?.city)[0]?.name,
                }
            }, response.status);
        } else {
            res.status(500).send({
                message: "Params Required"
            });
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const getUserByRole = async (req: Request, res: Response) => {
    try {
        if (req.params.role) {
            const response: any = await supabase.from('users').select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at').eq('role', req.params.role).order('id', { ascending: true });

            responseBuilder(res, response, response.status);
        } else {
            res.status(500).send({
                message: "Params Required"
            });
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const updateUserProfile = async (req: any, res: Response) => {
    try {
        if (req.params.id) {
            const response: any = await supabase.from('users').update({ username: req.body.username, description: req.body.description, address: req.body.address, phone_number: req.body.phone_number, is_approve: req.body.is_approve }).eq('id', req.params.id).select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at')

            responseBuilder(res, { ...response, data: response.data[0] }, response.status);
        } else {
            res.status(500).send({
                message: "Params Required"
            });
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};