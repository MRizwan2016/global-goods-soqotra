
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { generateAgentCode } from "../../utils/autoGenerators";

interface AgentSelectorProps {
  agentName: string;
  agentNumber: string;
  onAgentSelect: (name: string, code: string) => void;
}

// Mock list of agents - in a real app this would come from API or database
const AGENT_LIST = [
  { name: "Ahmed Al-Mansouri", code: "1234" },
  { name: "Mohammed Khan", code: "5678" },
  { name: "Sara Al-Jaber", code: "9012" },
  { name: "Ali Hassan", code: "3456" },
  { name: "Maria Torres", code: "7890" }
];

const AgentSelector: React.FC<AgentSelectorProps> = ({
  agentName,
  agentNumber,
  onAgentSelect
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAgentName, setNewAgentName] = useState("");
  const [agents, setAgents] = useState(AGENT_LIST);
  const [filteredAgents, setFilteredAgents] = useState(AGENT_LIST);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter agents when search term changes
  useEffect(() => {
    const filtered = agents.filter(agent => 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAgents(filtered);
  }, [searchTerm, agents]);

  // Function to add a new agent
  const handleAddNewAgent = () => {
    if (newAgentName.trim()) {
      // Get existing codes
      const existingCodes = agents.map(agent => agent.code);
      
      // Generate a new code
      const newCode = generateAgentCode(newAgentName, existingCodes);
      
      // Add to agents list
      const newAgent = { name: newAgentName, code: newCode };
      const updatedAgents = [...agents, newAgent];
      
      // Update state
      setAgents(updatedAgents);
      setNewAgentName("");
      
      // Auto-select the new agent
      onAgentSelect(newAgent.name, newAgent.code);
      
      // Close dialog
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium">Agent</label>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-7 gap-1" variant="outline">
              <UserPlus size={14} />
              Add Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Agent</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Agent Name</label>
                <Input 
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  placeholder="Enter agent name"
                />
              </div>
              <Button 
                onClick={handleAddNewAgent}
                disabled={!newAgentName.trim()}
                className="w-full"
              >
                Add Agent
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-2">
        <Input 
          placeholder="Search for agent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2"
        />
        
        <div className="max-h-48 overflow-y-auto border rounded-md">
          {filteredAgents.length > 0 ? (
            <div className="divide-y">
              {filteredAgents.map((agent, index) => (
                <div
                  key={index}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    agent.name === agentName ? "bg-blue-50" : ""
                  }`}
                  onClick={() => onAgentSelect(agent.name, agent.code)}
                >
                  <div className="font-medium">{agent.name}</div>
                  <div className="text-xs text-gray-500">Code: {agent.code}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 text-center text-gray-500">
              No agents found. Add a new agent.
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-500">Selected Agent</label>
          <Input value={agentName} readOnly className="bg-gray-50" />
        </div>
        <div>
          <label className="text-xs text-gray-500">Agent Code</label>
          <Input value={agentNumber} readOnly className="bg-gray-50" />
        </div>
      </div>
    </div>
  );
};

export default AgentSelector;
