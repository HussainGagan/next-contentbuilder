"use client";

import { RecoilRoot } from "recoil";
// import LangSwitcher from '../LangSwitcher';

function ProviderLayout({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default ProviderLayout;
