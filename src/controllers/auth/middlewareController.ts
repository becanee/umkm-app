import { Request, Response } from "express";
import { supabase } from "../../config/supabase";
import { responseLocationBuilder } from "../../utils/helper";
import { Md5 } from "ts-md5";

export const middleware = async (req: Request, res: Response) => {
    try {
        if (!req.headers?.authorization || !req.headers?.user_id) {
            res.status(404).send({
                status: false,
                httpCode: 404,
                message: "Authorization Required!",
            });
        } else {
            let token: any = req.headers?.authorization;
            const checkUser: any = await supabase.from('users').select().eq('id', req.headers?.user_id).order('id', { ascending: true });

            if (checkUser.data?.length === 1) {
                const checkPass = Md5.hashAsciiStr(token) === Md5.hashAsciiStr(checkUser.data[0].password);
                console.log("CP: ", checkPass);
                
                if (checkPass) {
                    const response: any = await supabase.from('users').select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at').eq('id', checkUser.data[0].id).order('id', { ascending: true });

                    await responseLocationBuilder(res, { ...response, data: response.data[0] }, response.status);
                } else {
                    res.status(403).send({
                        status: false,
                        httpCode: 403,
                        message: "[1] User not Authenticated!",
                    });
                }
            } else {
                res.status(403).send({
                    status: false,
                    httpCode: 403,
                    message: "[2] User not Authenticated!",
                });
            }
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}