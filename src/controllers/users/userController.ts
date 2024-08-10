import { NextFunction, Request, Response } from "express";
import { supabase } from "../../config/supabase";
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
            const response: any = await supabase.from('users').select('id, username, is_approve, email, phone_number, profile_pict, address, role, description, created_at').order('id', { ascending: true });
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

export const getUserByRole = async (req: Request, res: Response) => {
    try {
        if (req.params.role) {
            const response: any = await supabase.from('users').select('id, username, is_approve, email, phone_number, profile_pict, address, role, description, province, state, city, created_at').eq('role', req.params.role).order('id', { ascending: true });

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
            const response: any = await supabase.from('users').update({ username: req.body.username, description: req.body.description, address: req.body.address, phone_number: req.body.phone_number }).eq('id', req.params.id).select('id, username, is_approve, email, phone_number, profile_pict, address, role, description, province, state, city, created_at')

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