"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentLocation = void 0;
const helper_1 = require("../../utils/helper");
const getCurrentLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.ip) {
            const responseGeo = yield fetch(`https://api.becanee.com/api/v1?use=ipaddress&key=dCWGmPvwSB1gkuiczS7c&text=${req.params.ip}`, {
                method: 'GET',
                redirect: 'follow'
            })
                .then(response => response.text())
                .then(result => JSON.parse(result))
                .catch(error => console.log('error', error));
            (0, helper_1.responseBuilder)(res, Object.assign(Object.assign({}, responseGeo.data), { data: responseGeo.data.result }), responseGeo.httpCode);
        }
        else {
            res.status(500).send({
                message: "Params Required"
            });
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getCurrentLocation = getCurrentLocation;
