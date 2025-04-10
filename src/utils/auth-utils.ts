
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
    // If no permissions at all, create default structure with all disabled (except admin)
    return {
      ...user,
      permissions: {
        masterData: user.isAdmin ? true : false,
        dataEntry: user.isAdmin ? true : false,
        reports: user.isAdmin ? true : false,
        downloads: user.isAdmin ? true : false,
        accounting: user.isAdmin ? true : false,
        controlPanel: user.isAdmin ? true : false,
        files: {
          // Default all files to false for regular users, true for admins
          salesRep: user.isAdmin ? true : false,
          town: user.isAdmin ? true : false,
          packageOptions: user.isAdmin ? true : false,
          sellingRates: user.isAdmin ? true : false,
          container: user.isAdmin ? true : false,
          vessel: user.isAdmin ? true : false,
          invoiceBook: user.isAdmin ? true : false,
          driverHelper: user.isAdmin ? true : false,
          invoicing: user.isAdmin ? true : false,
          paymentReceivable: user.isAdmin ? true : false,
          item: user.isAdmin ? true : false
        }
      }
    };
  } else if (!user.permissions.files) {
    // If main permissions exist but no file permissions, add default file permissions
    return {
      ...user,
      permissions: {
        ...user.permissions,
        accounting: user.permissions.accounting ?? user.isAdmin,
        controlPanel: user.permissions.controlPanel ?? user.isAdmin,
        files: {
          // Default all files to false for regular users, true for admins
          salesRep: user.isAdmin ? true : false,
          town: user.isAdmin ? true : false,
          packageOptions: user.isAdmin ? true : false,
          sellingRates: user.isAdmin ? true : false,
          container: user.isAdmin ? true : false,
          vessel: user.isAdmin ? true : false,
          invoiceBook: user.isAdmin ? true : false,
          driverHelper: user.isAdmin ? true : false,
          invoicing: user.isAdmin ? true : false,
          paymentReceivable: user.isAdmin ? true : false,
          item: user.isAdmin ? true : false
        }
      }
    };
  } else {
    // If permissions structure exists, ensure all file permissions exist with proper defaults
    const currentFiles = user.permissions.files || {};
    
    // Set default file permissions if not present
    return {
      ...user,
      permissions: {
        ...user.permissions,
        accounting: user.permissions.accounting ?? user.isAdmin,
        controlPanel: user.permissions.controlPanel ?? user.isAdmin,
        files: {
          ...currentFiles,
          // Only set defaults for missing properties
          salesRep: currentFiles.salesRep ?? (user.isAdmin ? true : false),
          town: currentFiles.town ?? (user.isAdmin ? true : false),
          packageOptions: currentFiles.packageOptions ?? (user.isAdmin ? true : false),
          sellingRates: currentFiles.sellingRates ?? (user.isAdmin ? true : false),
          container: currentFiles.container ?? (user.isAdmin ? true : false),
          vessel: currentFiles.vessel ?? (user.isAdmin ? true : false),
          invoiceBook: currentFiles.invoiceBook ?? (user.isAdmin ? true : false),
          driverHelper: currentFiles.driverHelper ?? (user.isAdmin ? true : false),
          invoicing: currentFiles.invoicing ?? (user.isAdmin ? true : false),
          paymentReceivable: currentFiles.paymentReceivable ?? (user.isAdmin ? true : false),
          item: currentFiles.item ?? (user.isAdmin ? true : false)
        }
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
  
  // Don't default to true if file permissions aren't set
  if (!user.permissions?.files) return false;
  if (user.permissions.files[fileKey] === undefined) return false;
  
  return !!user.permissions.files[fileKey];
}

// Debug function to log user data
export function logUserData(user: User | null, message: string = "User data"): void {
  if (user) {
    console.log(`${message}:`, {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      permissions: user.permissions
    });
  } else {
    console.log(`${message}: No user data available`);
  }
}
