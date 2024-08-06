import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../screen/error";
import { ClientStartScreen } from "../screen/user/start";
import { ClientSignUp } from "../screen/user/sign_up";
import { ClientSignIn } from "../screen/user/sign_in";
import { MerchantSignUp } from "../screen/merchant/sign_up";
import { MerchantSignIn } from "../screen/merchant/sign_in";
import { MerchantStartScreen } from "../screen/merchant/start";
import { StartScreen } from "../screen/start";
import { MerchantSuccess } from "../screen/merchant/success";
import { MerchantWaiting } from "../screen/merchant/waiting";
import { ClientSuccess } from "../screen/user/success";
import { ClientProfile } from "../screen/user/profile";
import { MerchantProfile } from "../screen/merchant/profile";
import { ClientHome } from "../screen/user/home";
import { MerchantHome } from "../screen/merchant/home";
import { ClientItem } from "../screen/user/items";
import { ClientAllChat } from "../screen/user/all_chat";
import { MerchantAllChat } from "../screen/merchant/all_chat";
import { ClientChat } from "../screen/user/chat";
import { MerchantAddProduct } from "../screen/merchant/tambah_produk";
import { MerchantRiwayat } from "../screen/merchant/riwayat";
import { MerchantChat } from "../screen/merchant/chat";
import { ClientRiwayat } from "../screen/user/riwayat";
import { ClientRating } from "../screen/user/rating";
import { MerchantUpdateProduct } from "../screen/merchant/edit_produk";
import { AdminLogin } from "../screen/admin/login";
import { AdminHome } from "../screen/admin/home";
// import { ClientRiwayat } from "../screen/user/riwayat";
// import { ClientRating } from "../screen/user/rating";

export const mainRouter = createBrowserRouter([
    {
      path: "/",
      element: <StartScreen />,
      errorElement: <ErrorPage />,
    },

    // Admin Route's
    {
      path: "/admin",
      element: <AdminLogin/>,
      errorElement:<ErrorPage/>
    },
    {
      path: "/admin/home",
      element: <AdminHome/>,
      errorElement:<ErrorPage/>
    },


    // User Route's
    {
      path: "/client",
      element: <ClientStartScreen />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/client/sign-up",
      element: <ClientSignUp />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/client/sign-in",
      element: <ClientSignIn />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/client/success",
      element: <ClientSuccess />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/client/profile",
      element: <ClientProfile />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/client/home",
      element: <ClientHome />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/client/item",
      element: <ClientItem />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/client/allchat",
      element: <ClientAllChat />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/client/riwayat",
      element: <ClientRiwayat />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/client/rating",
      element: <ClientRating />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/client/chat/merchant/:merchant_name/service/:service_id/chat/:chat_id",
      element: <ClientChat />,
      errorElement: <ErrorPage />,
    },

    // Merchant Route's
    {
      path: "/merchant",
      element: <MerchantStartScreen />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/merchant/sign-up",
      element: <MerchantSignUp />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/merchant/sign-in",
      element: <MerchantSignIn />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/merchant/success",
      element: <MerchantSuccess />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/merchant/waiting",
      element: <MerchantWaiting />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/merchant/profile",
      element: <MerchantProfile />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/merchant/home",
      element: <MerchantHome />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/merchant/allchat",
      element: <MerchantAllChat />,
      errorElement: <ErrorPage />,
    },
    // {
    //   path: "/merchant/chat/client/:client_name/:service/:service_id",
    //   element: <MerchantChat />,
    //   errorElement: <ErrorPage />,
    // },
    {
      path: "/merchant/chat/client/:merchant_name/:service/:service_id/chat/:chat_id",
      element: <MerchantChat />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/merchant/addproduct",
      element: <MerchantAddProduct />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/merchant/updateproduct",
      element: <MerchantUpdateProduct />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/merchant/riwayat",
      element: <MerchantRiwayat />,
      errorElement: <ErrorPage />,
    },
  ]);