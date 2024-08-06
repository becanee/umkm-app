import { NextFunction, Request, Response } from "express";
import { supabase } from "../../config/supabase";
import { getCity, getProvince, getState } from "../location/location";
import { responseBuilder } from "../../utils/helper";
import { decode } from "base64-arraybuffer";

export const getAllService = async (req: Request, res: Response) => {
    try {
        const response: any = await supabase.from('services').select('id, user_id, name, price_start, desc, category, picture, created_at, users (id, username, role, description, address, phone_number, profile_pict)').order('id', { ascending: true });

        responseBuilder(res, { ...response, data: response.data }, response.status);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const getServiceByCategory = async (req: Request, res: Response) => {
    try {
        if (req.params.category) {
            const response: any = await supabase.from('services').select('id, user_id, name, price_start, desc, category, picture, created_at').eq('category', req.params.category).order('id', { ascending: true });

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

export const getServiceByMerchant = async (req: Request, res: Response) => {
    try {
        if (req.params.merchant) {
            const user: any = await supabase.from('users').select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at').eq('username', req.params.merchant).order('id', { ascending: true });
            const response: any = await supabase.from('services').select('id, user_id, name, price_start, desc, category, picture, created_at').eq('user_id', user.data[0].id).order('id', { ascending: true });

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

export const getServiceByID = async (req: Request, res: Response) => {
    try {
        if (req.params.id) {
            const response: any = await supabase.from('services').select('id, user_id, name, price_start, desc, category, picture, created_at, users (id, username, role, description, address, phone_number, profile_pict)').order('id', { ascending: true });

            responseBuilder(res, { data: response.data.filter((e: any) => e.id === +req.params.id)[0] }, response.status);
        } else {
            res.status(500).send({
                message: "Params Required"
            });
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const addService = async (req: any, res: Response) => {
    try {
        const fileBase64 = decode(req.file.buffer.toString("base64"));

        const { data, error }: any = await supabase.storage.from("services")
            .upload(`service-${Date.now()}`, fileBase64, {
                contentType: req.file.mimetype
            });

        const { data: image } = supabase.storage
            .from("services")
            .getPublicUrl(data.path);

        if (image.publicUrl) {
            const response: any = await supabase.from('services').insert([{
                user_id: req.body.user_id,
                name: req.body.name,
                price_start: req.body.price_start,
                desc: req.body.desc,
                category: req.body.category,
                picture: image.publicUrl,
            }]).select('id, user_id, name, price_start, desc, category, picture, created_at');
            responseBuilder(res, { ...response, data: response.data[0] }, response.status);
        } else {
            res.status(500).send({
                message: "Upload Picture Failed"
            });
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const updateService = async (req: Request, res: Response) => {
    try {
        if (req.params.id) {
            const response: any = await supabase.from('services').update({ name: req.body.name, category: req.body.category, price_start: parseInt(req.body.price_start), desc: req.body.desc }).eq('id', req.params.id).select('id, user_id, name, price_start, desc, category, picture, created_at')
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


export const deleteService = async (req: any, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('services')
            .delete()
            .eq('id', +req.params.id)
            .select()

            console.log("DELETE: ", data, error);

            if(data){
                responseBuilder(res, { ...data, data: data }, 200);
            }
            

    } catch (error: any) {
        res.status(500).send(error.message);
    }
};