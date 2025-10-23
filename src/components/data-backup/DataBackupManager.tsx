import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Download, Upload, RotateCcw, Trash2, Save, AlertTriangle, CheckCircle } from "lucide-react";
import DataBackupService from "@/services/DataBackupService";
import { toast } from "sonner";

export function DataBackupManager() {
  const [isImporting, setIsImporting] = useState(false);
  const [autoBackups, setAutoBackups] = useState(DataBackupService.getAutoBackups());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    DataBackupService.exportAllData();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const success = await DataBackupService.importData(file);
      if (success) {
        // Refresh auto-backups list
        setAutoBackups(DataBackupService.getAutoBackups());
        // Reload page to reflect changes
        setTimeout(() => window.location.reload(), 2000);
      }
    } finally {
      setIsImporting(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleCreateAutoBackup = () => {
    DataBackupService.createAutoBackup();
    setAutoBackups(DataBackupService.getAutoBackups());
    toast.success("Auto-backup created successfully!");
  };

  const handleRestore = () => {
    if (confirm('This will restore your data to the last restore point. Continue?')) {
      const success = DataBackupService.restoreFromLastPoint();
      if (success) {
        setTimeout(() => window.location.reload(), 2000);
      }
    }
  };

  const handleClearAll = () => {
    DataBackupService.clearAllData();
    setAutoBackups(DataBackupService.getAutoBackups());
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Backup & Recovery</h1>
        <p className="text-muted-foreground mt-2">
          Protect your data by creating backups and restore when needed
        </p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> Regular backups protect against data loss. Export your data to save it permanently on your laptop.
        </AlertDescription>
      </Alert>

      {/* Main Backup Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Export Data
            </CardTitle>
            <CardDescription>
              Download all your data to your laptop as a JSON file
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleExport} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Export All Data
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              This will download a complete backup of all your invoices, payments, jobs, and settings.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Import Data
            </CardTitle>
            <CardDescription>
              Restore data from a previously exported backup file
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleImportClick} 
              variant="outline" 
              className="w-full" 
              size="lg"
              disabled={isImporting}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isImporting ? 'Importing...' : 'Import Backup File'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Select a JSON backup file to restore your data.
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Auto Backup & Recovery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Save className="h-4 w-4" />
              Quick Backup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleCreateAutoBackup} variant="outline" className="w-full">
              Create Backup Point
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <RotateCcw className="h-4 w-4" />
              Restore Point
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleRestore} variant="outline" className="w-full">
              Restore Last Point
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trash2 className="h-4 w-4" />
              Clear Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleClearAll} variant="destructive" className="w-full">
              Clear All Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Auto Backups List */}
      {autoBackups.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Recent Auto Backups
            </CardTitle>
            <CardDescription>
              Automatically created backup points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {autoBackups.map((backup, index) => (
                <div key={backup.key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      Backup #{autoBackups.length - index}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(backup.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="secondary">{backup.size}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use Data Backup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">To Save Data to Your Laptop:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Click "Export All Data" to download a backup file</li>
              <li>The file will be saved to your Downloads folder</li>
              <li>Move it to a safe location (like Documents/Backups)</li>
              <li>Repeat this process regularly to keep backups current</li>
            </ol>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-semibold mb-2">To Restore Your Data:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Click "Import Backup File"</li>
              <li>Select your backup JSON file</li>
              <li>Wait for the import to complete</li>
              <li>Your data will be restored automatically</li>
            </ol>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Pro Tip:</strong> Set a reminder to export your data weekly to prevent any loss.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}