import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import "react-chat-elements/dist/main.css"
import { RouterProvider } from 'react-router-dom'
import { mainRouter } from './routes'
import moment from 'moment-timezone';

moment().tz("Asia/Jakarta").format();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <div className={`font-['Poppins']`}>
        <div className="container m-auto max-w-md lg:max-w-sm overflow-hidden bg-gray-100">
          <div className="h-screen p-8 sm:pt-18">
            <RouterProvider router={mainRouter} />
          </div>
        </div>
      </div>
    </ChakraProvider>
  </React.StrictMode>,
)
