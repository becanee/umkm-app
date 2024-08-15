import { NextFunction, Request, Response } from "express";
import { supabase } from "../../config/supabase";
import { getCity, getProvince, getState } from "../location/location";
import { responseBuilder } from "../../utils/helper";

export const clientCreateNewChat = async (req: Request, res: Response) => {
  try {
    const response: any = await supabase
      .from("chats")
      .insert([
        {
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
        },
      ])
      .select(
        "id, rating, comment, avatar, alt, title, subtitle, date, unread, status, client_id, merchant_id, service_id, created_at"
      );

    responseBuilder(
      res,
      { ...response, data: response.data[0] },
      response.status
    );
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const sendNewMessage = async (req: Request, res: Response) => {
  try {
    const response: any = await supabase
      .from("chat_history")
      .insert([
        {
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
        },
      ])
      .select(
        "id, type, position, text, client_id, merchant_id, chat_id, role, order_status, lat, lon, created_at"
      );

    responseBuilder(
      res,
      { ...response, data: response.data[0] },
      response.status
    );
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const messagePlaceOrder = async (req: Request, res: Response) => {
  try {
    const response: any = await supabase
      .from("chats")
      .update({ status: req.body.status })
      .eq("id", req.params.id)
      .select(
        "id, rating, comment, avatar, alt, title, subtitle, date, unread, status, client_id, merchant_id, service_id, created_at"
      );

    responseBuilder(res, response, response.status);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getAllChatByChatID = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const response: any = await supabase
        .from("chats")
        .select(
          "id, rating, comment, avatar, alt, title, subtitle, date, unread, status, client_id, merchant_id, service_id, created_at"
        )
        .eq("id", req.params.id)
        .order("id", { ascending: true });

      responseBuilder(res, response, response.status);
    } else {
      res.status(500).send({
        message: "Params Required",
      });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getAllMessageByChatID = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const response: any = await supabase
        .from("chat_history")
        .select(
          "id, type, position, text, client_id, merchant_id, chat_id, role, order_status, lat, lon, created_at"
        )
        .eq("chat_id", req.params.id)
        .order("id", { ascending: true });

      responseBuilder(res, response, response.status);
    } else {
      res.status(500).send({
        message: "Params Required",
      });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const clientGetChatByID = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const response: any = await supabase
        .from("chats")
        .select(
          "id, rating, comment, avatar, alt, title, subtitle, date, unread, status, client_id, merchant_id, service_id, created_at"
        )
        .eq("client_id", req.params.id)
        .order("id", { ascending: true });

      responseBuilder(res, response, response.status);
    } else {
      res.status(500).send({
        message: "Params Required",
      });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const merchantGetChatByID = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const response: any = await supabase
        .from("chats")
        .select(
          "id, rating, comment, avatar, alt, title, subtitle, date, unread, status, client_id, merchant_id, service_id, created_at"
        )
        .eq("merchant_id", req.params.id)
        .order("id", { ascending: true });

      responseBuilder(res, response, response.status);
    } else {
      res.status(500).send({
        message: "Params Required",
      });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const clientGetOrderByID = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const response: any = await supabase
        .from("chats")
        .select(
          "id, rating, comment, avatar, alt, title, subtitle, date, unread, status, client_id, merchant_id, service_id, created_at"
        )
        .eq("client_id", req.params.id)
        .order("id", { ascending: true });

      responseBuilder(res, response, response.status);
    } else {
      res.status(500).send({
        message: "Params Required",
      });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const merchantGetOrderByID = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const response: any = await supabase
        .from("chats")
        .select(
          "id, rating, comment, avatar, alt, title, subtitle, date, unread, status, client_id, merchant_id, service_id, created_at"
        )
        .eq("merchant_id", req.params.id)
        .order("id", { ascending: true });

      responseBuilder(res, response, response.status);
    } else {
      res.status(500).send({
        message: "Params Required",
      });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const addRating = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const response: any = await supabase
        .from("chats")
        .update({ rating: req.body.rating, comment: req.body.comment })
        .eq("id", req.params.id)
        .select("*");
      responseBuilder(
        res,
        { ...response, data: response.data[0] },
        response.status
      );
    } else {
      res.status(500).send({
        message: "Params Required",
      });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
