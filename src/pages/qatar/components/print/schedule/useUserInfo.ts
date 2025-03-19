
import { useMemo } from "react";

export const useUserInfo = () => {
  // Get user info from localStorage if available
  const userName = useMemo(() => {
    try {
      const usersString = localStorage.getItem('users');
      if (usersString) {
        const users = JSON.parse(usersString);
        if (users && users.length > 0) {
          return users[0].fullName;
        }
      }
      return "Admin User";
    } catch (error) {
      console.error('Error parsing user data from localStorage', error);
      return "Admin User";
    }
  }, []);
  
  // Format today's date
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });

  return {
    userName,
    formattedDate,
    formattedTime
  };
};
