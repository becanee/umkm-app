import { NextFunction, Request, Response } from "express";
import { supabase } from "../../config/supabase";
import { getCity, getProvince, getState } from "../location/location";
import { responseBuilder } from "../../utils/helper";
import { decode } from "base64-arraybuffer";

export const uploadAvatar = async (req: any, res: Response) => {
    try {
        const fileBase64 = decode(req.file.buffer.toString("base64"));

        const { data, error }: any = await supabase.storage.from("users")
            .upload(`avatar-${Date.now()}`, fileBase64, {
                contentType: req.file.mimetype
            });

        const { data: image } = supabase.storage
            .from("users")
            .getPublicUrl(data.path);

        if (image.publicUrl) {
            const response: any = await supabase.from('users').update({ username: req.body.username, description: req.body.description, address: req.body.address, phone_number: req.body.phone_number, profile_pict: image.publicUrl }).eq('id', req.params.id).select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at')
            responseBuilder(res, { ...response, data: response.data[0] }, response.status);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const uploadService = async (req: any, res: Response) => {
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
            const response: any = await supabase.from('services').update({ name: req.body.name, category: req.body.category, price_start: parseInt(req.body.price_start), desc: req.body.desc, picture: image.publicUrl }).eq('id', req.params.id).select('id, user_id, name, price_start, desc, category, picture, created_at').order('id', { ascending: true });
            responseBuilder(res, { ...response, data: response.data[0] }, response.status);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};