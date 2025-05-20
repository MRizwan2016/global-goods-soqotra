
import React from "react";
import DestinationCard from "./DestinationCard";

const PrimaryDestinations = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Primary Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DestinationCard country="Qatar" bgColor="bg-blue-50" to="/qatar" />
        <DestinationCard country="Kenya" bgColor="bg-green-50" to="/kenya" />
        <DestinationCard country="Uganda" bgColor="bg-purple-50" to="/uganda" />
        <DestinationCard country="Sri Lanka" bgColor="bg-amber-50" to="/sri-lanka" />
        <DestinationCard country="Philippines" bgColor="bg-cyan-50" to="/philippines" />
        <DestinationCard country="Tunisia" bgColor="bg-rose-50" to="/tunisia" />
        <DestinationCard country="Somalia" bgColor="bg-lime-50" to="/somalia" />
      </div>
    </div>
  );
};

export default PrimaryDestinations;
