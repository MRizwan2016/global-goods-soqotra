
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/auth";
import { Database, FileInput, BarChart4, DollarSign, Building2, Users, FileText, Globe } from "lucide-react";
import { filePermissions } from "../../constants/filePermissions";

interface FilePermissionSectionProps {
  user: User;
  toggleFilePermission: (userId: string, fileKey: keyof User['permissions']['files']) => void;
  isAdminOnly?: boolean;
}

const FilePermissionSection = ({ user, toggleFilePermission, isAdminOnly = false }: FilePermissionSectionProps) => {
  return (
    <div className="mt-4">
      <h5 className="font-medium mb-2">File-Level Permissions</h5>
      <p className="text-sm text-muted-foreground mb-4">
        Configure access to specific files within each category. Users need both category-level permission
        and file-level permission to access a file.
      </p>
      
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="masterData">
          <AccordionTrigger className="py-2">
            <div className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              <span>Master Data Files</span>
              {user.permissions?.masterData ? (
                <Badge className="ml-2 bg-green-100 text-green-800">Category Enabled</Badge>
              ) : (
                <Badge className="ml-2 bg-gray-100 text-gray-800" variant="outline">Category Disabled</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-6 py-2">
              {Object.entries(filePermissions.masterData.files).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2 py-1">
                  <Checkbox 
                    id={`${user.id}-${key}`}
                    checked={!!user.permissions?.files?.[key as keyof User['permissions']['files']]}
                    onCheckedChange={isAdminOnly ? undefined : () => toggleFilePermission(
                      user.id, 
                      key as keyof User['permissions']['files']
                    )}
                    disabled={!user.permissions?.masterData || isAdminOnly}
                  />
                  <label 
                    htmlFor={`${user.id}-${key}`}
                    className={`text-sm cursor-pointer ${!user.permissions?.masterData ? 'text-gray-400' : ''}`}
                  >
                    {value.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="dataEntry">
          <AccordionTrigger className="py-2">
            <div className="flex items-center">
              <FileInput className="h-4 w-4 mr-2" />
              <span>Data Entry Files</span>
              {user.permissions?.dataEntry ? (
                <Badge className="ml-2 bg-green-100 text-green-800">Category Enabled</Badge>
              ) : (
                <Badge className="ml-2 bg-gray-100 text-gray-800" variant="outline">Category Disabled</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-6 py-2">
              {Object.entries(filePermissions.dataEntry.files).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2 py-1">
                  <Checkbox 
                    id={`${user.id}-${key}`}
                    checked={!!user.permissions?.files?.[key as keyof User['permissions']['files']]}
                    onCheckedChange={isAdminOnly ? undefined : () => toggleFilePermission(
                      user.id, 
                      key as keyof User['permissions']['files']
                    )}
                    disabled={!user.permissions?.dataEntry || isAdminOnly}
                  />
                  <label 
                    htmlFor={`${user.id}-${key}`}
                    className={`text-sm cursor-pointer ${!user.permissions?.dataEntry ? 'text-gray-400' : ''}`}
                  >
                    {value.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="reports">
          <AccordionTrigger className="py-2">
            <div className="flex items-center">
              <BarChart4 className="h-4 w-4 mr-2" />
              <span>Reports Files</span>
              {user.permissions?.reports ? (
                <Badge className="ml-2 bg-green-100 text-green-800">Category Enabled</Badge>
              ) : (
                <Badge className="ml-2 bg-gray-100 text-gray-800" variant="outline">Category Disabled</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-6 py-2">
              {Object.entries(filePermissions.reports.files).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2 py-1">
                  <Checkbox 
                    id={`${user.id}-${key}`}
                    checked={!!user.permissions?.files?.[key as keyof User['permissions']['files']]}
                    onCheckedChange={isAdminOnly ? undefined : () => toggleFilePermission(
                      user.id, 
                      key as keyof User['permissions']['files']
                    )}
                    disabled={!user.permissions?.reports || isAdminOnly}
                  />
                  <label 
                    htmlFor={`${user.id}-${key}`}
                    className={`text-sm cursor-pointer ${!user.permissions?.reports ? 'text-gray-400' : ''}`}
                  >
                    {value.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="accounting">
          <AccordionTrigger className="py-2">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              <span>Accounting Files</span>
              {user.permissions?.accounting ? (
                <Badge className="ml-2 bg-green-100 text-green-800">Category Enabled</Badge>
              ) : (
                <Badge className="ml-2 bg-gray-100 text-gray-800" variant="outline">Category Disabled</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-6 py-2">
              {Object.entries(filePermissions.accounting.files).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2 py-1">
                  <Checkbox 
                    id={`${user.id}-${key}`}
                    checked={!!user.permissions?.files?.[key as keyof User['permissions']['files']]}
                    onCheckedChange={isAdminOnly ? undefined : () => toggleFilePermission(
                      user.id, 
                      key as keyof User['permissions']['files']
                    )}
                    disabled={!user.permissions?.accounting || isAdminOnly}
                  />
                  <label 
                    htmlFor={`${user.id}-${key}`}
                    className={`text-sm cursor-pointer ${!user.permissions?.accounting ? 'text-gray-400' : ''}`}
                  >
                    {value.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="accountFunctions">
          <AccordionTrigger className="py-2">
            <div className="flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              <span>Account Functions</span>
              {user.permissions?.accountFunctions ? (
                <Badge className="ml-2 bg-green-100 text-green-800">Category Enabled</Badge>
              ) : (
                <Badge className="ml-2 bg-gray-100 text-gray-800" variant="outline">Category Disabled</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-6 py-2">
              {Object.entries(filePermissions.accountFunctions.files).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2 py-1">
                  <Checkbox 
                    id={`${user.id}-${key}`}
                    checked={!!user.permissions?.files?.[key as keyof User['permissions']['files']]}
                    onCheckedChange={isAdminOnly ? undefined : () => toggleFilePermission(
                      user.id, 
                      key as keyof User['permissions']['files']
                    )}
                    disabled={!user.permissions?.accountFunctions || isAdminOnly}
                  />
                  <label 
                    htmlFor={`${user.id}-${key}`}
                    className={`text-sm cursor-pointer ${!user.permissions?.accountFunctions ? 'text-gray-400' : ''}`}
                  >
                    {value.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="accountRegistrations">
          <AccordionTrigger className="py-2">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>Account Registrations</span>
              {user.permissions?.accountRegistrations ? (
                <Badge className="ml-2 bg-green-100 text-green-800">Category Enabled</Badge>
              ) : (
                <Badge className="ml-2 bg-gray-100 text-gray-800" variant="outline">Category Disabled</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-6 py-2">
              {Object.entries(filePermissions.accountRegistrations.files).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2 py-1">
                  <Checkbox 
                    id={`${user.id}-${key}`}
                    checked={!!user.permissions?.files?.[key as keyof User['permissions']['files']]}
                    onCheckedChange={isAdminOnly ? undefined : () => toggleFilePermission(
                      user.id, 
                      key as keyof User['permissions']['files']
                    )}
                    disabled={!user.permissions?.accountRegistrations || isAdminOnly}
                  />
                  <label 
                    htmlFor={`${user.id}-${key}`}
                    className={`text-sm cursor-pointer ${!user.permissions?.accountRegistrations ? 'text-gray-400' : ''}`}
                  >
                    {value.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="accountFinancialEntities">
          <AccordionTrigger className="py-2">
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>Account Financial Entities</span>
              {user.permissions?.accountFinancialEntities ? (
                <Badge className="ml-2 bg-green-100 text-green-800">Category Enabled</Badge>
              ) : (
                <Badge className="ml-2 bg-gray-100 text-gray-800" variant="outline">Category Disabled</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-6 py-2">
              {Object.entries(filePermissions.accountFinancialEntities.files).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2 py-1">
                  <Checkbox 
                    id={`${user.id}-${key}`}
                    checked={!!user.permissions?.files?.[key as keyof User['permissions']['files']]}
                    onCheckedChange={isAdminOnly ? undefined : () => toggleFilePermission(
                      user.id, 
                      key as keyof User['permissions']['files']
                    )}
                    disabled={!user.permissions?.accountFinancialEntities || isAdminOnly}
                  />
                  <label 
                    htmlFor={`${user.id}-${key}`}
                    className={`text-sm cursor-pointer ${!user.permissions?.accountFinancialEntities ? 'text-gray-400' : ''}`}
                  >
                    {value.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="accountCountryReconciliations">
          <AccordionTrigger className="py-2">
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              <span>Account Country Reconciliations</span>
              {user.permissions?.accountCountryReconciliations ? (
                <Badge className="ml-2 bg-green-100 text-green-800">Category Enabled</Badge>
              ) : (
                <Badge className="ml-2 bg-gray-100 text-gray-800" variant="outline">Category Disabled</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-6 py-2">
              {Object.entries(filePermissions.accountCountryReconciliations.files).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2 py-1">
                  <Checkbox 
                    id={`${user.id}-${key}`}
                    checked={!!user.permissions?.files?.[key as keyof User['permissions']['files']]}
                    onCheckedChange={isAdminOnly ? undefined : () => toggleFilePermission(
                      user.id, 
                      key as keyof User['permissions']['files']
                    )}
                    disabled={!user.permissions?.accountCountryReconciliations || isAdminOnly}
                  />
                  <label 
                    htmlFor={`${user.id}-${key}`}
                    className={`text-sm cursor-pointer ${!user.permissions?.accountCountryReconciliations ? 'text-gray-400' : ''}`}
                  >
                    {value.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilePermissionSection;
