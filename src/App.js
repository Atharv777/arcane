import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/Header";

import Home from './pages/Home';
import About from './pages/About';
import Explore from './pages/Explore';
import Account from './pages/Account';

export default function App() {

    const AppendHeader = ({ Comp }) => {
        return (
            <>
                <Header />
                <Comp />
            </>
        )
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <AppendHeader Comp={Home} />,
        },
        {
            path: "/about",
            element: <AppendHeader Comp={About} />,
        },
        {
            path: "/explore",
            element: <AppendHeader Comp={Explore} />,
        },
        {
            path: "/account",
            element: <AppendHeader Comp={Account} />,
        }
    ]);

    return (
        <div className='flex flex-col min-h-screen'>

            <ToastContainer />

            <RouterProvider router={router} />

        </div>
    )
}
