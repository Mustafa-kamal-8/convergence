import { Navigate, Routes as ReactRouter, Route } from "react-router-dom";

import {
  Assesment,
  Course,
  Home,
  Page404,
  Placement,

  Profile,
  Scheme,
  Target,
  Tc,
  Tp,
  Unauthorized,
  Batch,
  Assessor,
  Trainer,
  Invoice,
} from "@/pages";
import Login from "@/pages/Login";
import Layout from "@/components/common/layout";
import Protected from "@/components/protected";
import LoginCreation from "@/pages/login-creation/LoginCreation";
import LayoutSystemAdmin from "@/components/common/layout-system-admin";

export default function Routes() {
  return (
    <ReactRouter>
      <Route path="/" element={ <Protected /> }>
        <Route path="/" element={ <Layout /> }>
          <Route path="/" element={ <Home /> } />

          <Route path="/scheme" element={ <Scheme /> } />
          <Route path="/batch" element={ <Batch /> } />

          <Route path="/target" element={ <Target /> } />
          <Route path="/course" element={ <Course /> } />
          <Route path="/tp" element={ <Tp /> } />
          <Route path="/tc" element={ <Tc /> } />
          <Route path="/candidate" element={ <Profile /> } />
          <Route path="/assesment" element={ <Assesment /> } />
          <Route path="/placement" element={ <Placement /> } />

          <Route path="/assessor" element={ <Assessor /> } />
          <Route path="/trainer" element={ <Trainer /> } />
          <Route path="/invoice" element={ <Invoice /> } />
        </Route>
        <Route path="/" element={ <LayoutSystemAdmin /> }>
          <Route path="/admin" element={ <LoginCreation /> } />
        </Route>
      </Route>
      <Route path="/login" element={ <Login /> } />
      <Route path="/unauthorized" element={ <Unauthorized /> } />
      <Route path="/404" element={ <Page404 /> } />

      <Route path="*" element={ <Navigate to={ "/404" } replace /> } />
    </ReactRouter>
  );
}
