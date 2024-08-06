import { Request, Response } from "express";
import { responseBuilder } from "../../utils/helper";


export const getCurrentLocation = async (req: Request, res: Response) => {
    try {
        if (req.params.ip) {
            const responseGeo = await fetch(`https://api.becanee.com/api/v1?use=ipaddress&key=dCWGmPvwSB1gkuiczS7c&text=${req.params.ip}`, {
                method: 'GET',
                redirect: 'follow'
            })
                .then(response => response.text())
                .then(result => JSON.parse(result))
                .catch(error => console.log('error', error));
    
            responseBuilder(res, {...responseGeo.data, data: responseGeo.data.result}, responseGeo.httpCode);
        } else {
            res.status(500).send({
                message: "Params Required"
            });
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};