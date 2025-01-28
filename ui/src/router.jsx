import {lazy} from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";
import Loadable from "./layouts/globals/Loadable";

// import global components
import AuthGuard from "./middleware/AuthGuard";
import Layout from "./layouts/Layout"; 

// import views
// landing
const Landing = Loadable(lazy(() => import("./pages/Landing")));
// auth
const Signup = Loadable(lazy(() => import("./pages/Auth/Signup")));
const Signin = Loadable(lazy(() => import("./pages/Auth/Signin")));
// ** Dashboard ** //
// home
const Home = Loadable(lazy(() => import("./pages/Dashboard/Home")));
// profile
const ViewProfile = Loadable(lazy(() => import("./pages/Dashboard/Profile/View")));
const UpdateProfile = Loadable(lazy(() => import("./pages/Dashboard/Profile/Update")));
// nft
const OwnedNFT = Loadable(lazy(() => import("./pages/Dashboard/NFTAssets/Owned")));
const ScannedNFT = Loadable(lazy(() => import("./pages/Dashboard/NFTAssets/Scanned")));
const UploadNFT = Loadable(lazy(() => import("./pages/Dashboard/NFTAssets/UploadNew")));
const ViewNFT = Loadable(lazy(() => import("./pages/Dashboard/NFTAssets/View")));


const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/dashboard",
        element: <Navigate to="/dashboard/home" />
    },
    {
        path: "/dashboard",
        element: (
            <AuthGuard>
                <Layout />
            </AuthGuard>
        ),
        children: [
            // home
            {
                path: "/dashboard/home",
                element: <Home />,
            },
            // profile
            {
                path: "/dashboard/profile",
                element: <ViewProfile />,
            },
            {
                path: "/dashboard/profile/update",
                element: <UpdateProfile />,
            },
            // nft
            {
                path: "/dashboard/nft/owned",
                element: <OwnedNFT />,
            },
            {
                path: "/dashboard/nft/scanned",
                element: <ScannedNFT />,
            },
            {
                path: "/dashboard/nft/upload",
                element: <UploadNFT />,
            },
            {
                path: "/dashboard/nft/view/:nftId",
                element: <ViewNFT />,
            },
        ] 
    },
    {
        path: "/session/signup",
        element: <Signup />
    },
    {
        path: "/session/signin",
        element: <Signin />
    },
    {
        path: "/*",
        element: <p>404 Not Found!</p> // we will create a custom 404 page soon.
    }
])

export default router;