import { Request, Response } from "express";
import { supabase } from "../../config/supabase";
import { responseBuilder } from "../../utils/helper";

export const userLogout = async (req: Request, res: Response) => {
    try {
        if (!req.headers?.authorization || !req.headers?.user_id) {
            res.status(200).send({
                status: false,
                httpCode: 200,
                message: "Authorization not found!",
            });
        } else {
            const checkUser: any = await supabase.from('users').select().eq('id', req.headers?.user_id).order('id', { ascending: true });

            if (checkUser.data?.length === 1) {
                const response: any = await supabase.from('active_session').delete().eq('user_id', checkUser.data[0].id).select().order('id', { ascending: true });

                responseBuilder(res, {...response, data: response.data}, response.status);
            } else {
                res.status(200).send({
                    status: false,
                    httpCode: 200,
                    message: "[2] User not Authenticated!",
                });
            }
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}