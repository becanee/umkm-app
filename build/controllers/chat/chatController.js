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
exports.merchantGetChatByID = exports.clientGetChatByID = exports.getAllMessageByChatID = exports.getAllChatByChatID = exports.messagePlaceOrder = exports.sendNewMessage = exports.clientCreateNewChat = void 0;
const supabase_1 = require("../../config/supabase");
const helper_1 = require("../../utils/helper");
const clientCreateNewChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield supabase_1.supabase.from('chats').insert([{
                avatar: req.body.avatar,
                alt: req.body.alt,
                title: req.body.title,
                subtitle: req.body.subtitle,
                date: req.body.date,
                unread: req.body.unread,
                status: req.body.status,
                client_id: req.body.client_id,
                merchant_id: req.body.merchant_id,
                service_id: req.body.service_id,
            }]).select('id, avatar, alt, title, subtitle, date, unread, status, client_id, merchant_id, service_id, created_at');
        (0, helper_1.responseBuilder)(res, Object.assign(Object.assign({}, response), { data: response.data[0] }), response.status);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.clientCreateNewChat = clientCreateNewChat;
const sendNewMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield supabase_1.supabase.from('chat_history').insert([{
                client_id: req.body.client_id,
                merchant_id: req.body.merchant_id,
                type: req.body.type,
                position: req.body.position,
                text: req.body.text,
                chat_id: req.body.chat_id,
                role: req.body.role,
                order_status: req.body.order_status,
                lat: req.body.lat,
                lon: req.body.lon,
            }]).select('id, type, position, text, client_id, merchant_id, chat_id, role, order_status, lat, lon, created_at');
        (0, helper_1.responseBuilder)(res, Object.assign(Object.assign({}, response), { data: response.data[0] }), response.status);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.sendNewMessage = sendNewMessage;
const messagePlaceOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield supabase_1.supabase.from('chats').update({ status: req.body.status }).eq('id', req.params.id).select('id, avatar, alt, title, subtitle, date, unread, status, client_id, merchant_id, service_id, created_at');
        (0, helper_1.responseBuilder)(res, response, response.status);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.messagePlaceOrder = messagePlaceOrder;
const getAllChatByChatID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            const response = yield supabase_1.supabase.from('chats').select('id, avatar, alt, title, subtitle, date, unread, status, client_id, merchant_id, service_id, created_at').eq('id', req.params.id).order('id', { ascending: true });
            (0, helper_1.responseBuilder)(res, response, response.status);
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
exports.getAllChatByChatID = getAllChatByChatID;
const getAllMessageByChatID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            const response = yield supabase_1.supabase.from('chat_history').select('id, type, position, text, client_id, merchant_id, chat_id, role, order_status, lat, lon, created_at').eq('chat_id', req.params.id).order('id', { ascending: true });
            (0, helper_1.responseBuilder)(res, response, response.status);
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
exports.getAllMessageByChatID = getAllMessageByChatID;
const clientGetChatByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            const response = yield supabase_1.supabase.from('chats').select('id, avatar, alt, title, subtitle, date, unread, status, client_id, merchant_id, service_id, created_at').eq('client_id', req.params.id).order('id', { ascending: true });
            (0, helper_1.responseBuilder)(res, response, response.status);
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
exports.clientGetChatByID = clientGetChatByID;
const merchantGetChatByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id) {
            const response = yield supabase_1.supabase.from('chats').select('id, avatar, alt, title, subtitle, date, unread, status, client_id, merchant_id, service_id, created_at').eq('merchant_id', req.params.id).order('id', { ascending: true });
            (0, helper_1.responseBuilder)(res, response, response.status);
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
exports.merchantGetChatByID = merchantGetChatByID;
