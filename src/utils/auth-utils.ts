
import { User } from "@/types/auth";
import { 
  EMAIL_SERVICE_URL, 
  EMAIL_SERVICE_ID, 
  EMAIL_TEMPLATE_ID, 
  EMAIL_USER_ID 
} from "@/constants/auth";

// Ensure user has proper permissions structure
export function ensureUserPermissions(user: User): User {
  if (!user.permissions) {
    return {
      ...user,
      permissions: {
        masterData: user.isAdmin ? true : false,
        dataEntry: user.isAdmin ? true : false,
        reports: user.isAdmin ? true : false,
        downloads: user.isAdmin ? true : false,
        accounting: user.isAdmin ? true : false,
        controlPanel: user.isAdmin ? true : false,
        files: {}
      }
    };
  } else if (!user.permissions.files) {
    return {
      ...user,
      permissions: {
        ...user.permissions,
        accounting: user.permissions.accounting ?? user.isAdmin,
        controlPanel: user.permissions.controlPanel ?? user.isAdmin,
        files: {}
      }
    };
  } else {
    // Ensure new permissions exist
    return {
      ...user,
      permissions: {
        ...user.permissions,
        accounting: user.permissions.accounting ?? user.isAdmin,
        controlPanel: user.permissions.controlPanel ?? user.isAdmin,
      }
    };
  }
}

// Send activation email to user
export async function sendActivationEmail(user: User): Promise<boolean> {
  try {
    // Using EmailJS service to send email
    const response = await fetch(EMAIL_SERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: EMAIL_SERVICE_ID,
        template_id: EMAIL_TEMPLATE_ID,
        user_id: EMAIL_USER_ID,
        template_params: {
          to_name: user.fullName,
          to_email: user.email,
          status: user.isActive ? "activated" : "deactivated",
          login_url: window.location.origin + "/login",
        },
      }),
    });

    if (response.ok) {
      console.log(`Email sent to ${user.email} notifying them that their account is now ${user.isActive ? "active" : "inactive"}`);
      return true;
    } else {
      console.error("Failed to send email:", await response.text());
      return false;
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

// Check if user has permission for a specific file
export function hasFilePermission(user: User | null, fileKey: keyof User['permissions']['files']): boolean {
  if (!user) return false;
  if (user.isAdmin) return true; // Admins have access to everything
  
  return !!user.permissions?.files?.[fileKey];
}
