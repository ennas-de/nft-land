// import {RouterProvider} from "react-router-dom";
import {Toaster} from "react-hot-toast";
// import router from "./router";
import Router from "@/utils/routes";
import {StateContext} from "@/contexts/state.context";

import {Provider as SnackbarProvider} from "@/components/Widgets/Snackbar";

import MUITheme from "@/theme/";
import CustomizationLayout from "@/layouts/customization";

import "./App.css";

const App = () => {

  return (
    <StateContext>
      <MUITheme>
        <Toaster />
        <SnackbarProvider>
          <CustomizationLayout />
          <Router />
          {/* <RouterProvider router={router} /> */}
        </SnackbarProvider>
      </MUITheme>
    </StateContext>
  )
}

export default  App;
