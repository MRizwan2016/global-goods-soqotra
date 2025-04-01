
/**
 * Generates a unique agent code based on the agent name
 * @param agentName Name of the agent
 * @param existingCodes Array of existing codes to avoid duplicates
 * @returns A unique 4-digit code
 */
export const generateAgentCode = (agentName: string, existingCodes: string[] = []): string => {
  // Generate a hash based on the agent name to ensure consistency
  let hash = 0;
  for (let i = 0; i < agentName.length; i++) {
    hash = ((hash << 5) - hash) + agentName.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  
  // Generate a positive 4-digit number from the hash
  let agentCode = Math.abs(hash % 9000 + 1000).toString();
  
  // Ensure uniqueness by incrementing if code exists
  while (existingCodes.includes(agentCode)) {
    const numericCode = parseInt(agentCode, 10);
    agentCode = ((numericCode + 1) % 10000).toString().padStart(4, '0');
  }
  
  return agentCode;
};

/**
 * Automatically generates the next box number in sequence
 * @param existingBoxNumbers Array of existing box numbers
 * @returns The next sequential box number
 */
export const generateNextBoxNumber = (existingBoxNumbers: string[]): string => {
  if (existingBoxNumbers.length === 0) {
    return "1";
  }
  
  // Find the highest existing number
  const numericBoxNumbers = existingBoxNumbers
    .map(num => parseInt(num, 10))
    .filter(num => !isNaN(num));
  
  if (numericBoxNumbers.length === 0) {
    return "1";
  }
  
  const highestNumber = Math.max(...numericBoxNumbers);
  return (highestNumber + 1).toString();
};
