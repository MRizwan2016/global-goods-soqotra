import React from "react";
import Layout from "@/components/layout/Layout";
import EritreaHBLGenerator from "./components/EritreaHBLGenerator";

const EritreaHBLPage: React.FC = () => {
  return (
    <Layout title="Generate House Bill of Lading - Eritrea">
      <EritreaHBLGenerator onBack={undefined} />
    </Layout>
  );
};

export default EritreaHBLPage;