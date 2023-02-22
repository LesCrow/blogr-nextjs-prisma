import React, { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <Sidebar />
    {props.children}
  </div>
);

export default Layout;
