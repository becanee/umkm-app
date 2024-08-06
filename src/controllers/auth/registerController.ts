import { Request, Response } from "express";
import { supabase } from "../../config/supabase";
import { responseBuilder } from "../../utils/helper";
import { Md5 } from "ts-md5";

export const userRegister = async (req: Request, res: Response) => {
    try {
        const checkUsername: any = await supabase.from('users').select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at').eq('username', req.body.username).order('id', { ascending: true });
        const checkPhoneNumber: any = await supabase.from('users').select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at').eq('phone_number', req.body.phone_number).order('id', { ascending: true });

        if (checkUsername.data?.length === 0) { 
            if (checkPhoneNumber.data?.length === 0) {
                const response: any = await supabase.from('users').insert([{
                    role: req.body.role, 
                    is_approve: req.body.role === "merchant" ? false : true, 
                    username: req.body.username,
                    phone_number: req.body.phone_number, 
                    password: Md5.hashAsciiStr(req.body.password),
                }]).select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at');

                responseBuilder(res, {...response, data: response.data[0]}, response.status);
            } else {
                res.status(200).send({
                    status: false,
                    httpCode: 200,
                    message: "Phone Number Already Registered!",
                });
            }
        } else {
            res.status(200).send({
                status: false,
                httpCode: 200,
                message: "Username Already Registered!",
            });
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}