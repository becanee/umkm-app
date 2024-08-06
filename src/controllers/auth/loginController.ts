import { Request, Response } from "express";
import { supabase } from "../../config/supabase";
import { responseBuilder } from "../../utils/helper";
import { Md5 } from "ts-md5";

export const userLogin = async (req: Request, res: Response) => {
    try {
        const checkUsername: any = await supabase.from('users').select().eq('phone_number', req.body.phone_number).order('id', { ascending: true });


        if (checkUsername.data?.length === 1) {
            const checkPass = Md5.hashAsciiStr(req.body.password) === checkUsername.data[0].password;

            if (checkPass) {
                const createSession: any = await supabase.from('active_session').insert([{
                    user_id: checkUsername.data[0].id,
                    token: Md5.hashAsciiStr(req.body.password), 
                }]).select();

                const response: any = await supabase.from('users').select('id, username, email, phone_number, profile_pict, address, role, description, province, state, city, created_at').eq('id', createSession.data[0].user_id).order('id', { ascending: true });
                
                // console.log("R: ", createSession.data[0]);
                
                responseBuilder(res, {...response, data: {...createSession.data[0], user: response.data[0]}}, response.status);
            } else {
                res.status(200).send({
                    status: false,
                    httpCode: 200,
                    message: "Credentials not match!",
                });
            }
        } else {
            res.status(200).send({
                status: false,
                httpCode: 200,
                message: "Credentials not found!",
            });
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
}