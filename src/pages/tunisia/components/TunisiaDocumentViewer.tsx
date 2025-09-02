import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Eye, FileText } from "lucide-react";
import TunisiaPrintStyles from "./TunisiaPrintStyles";

interface TunisiaDocumentViewerProps {
  documents: string[];
  onBack: () => void;
  title: string;
}

const TunisiaDocumentViewer: React.FC<TunisiaDocumentViewerProps> = ({
  documents,
  onBack,
  title
}) => {
  const handlePrint = (docUrl: string) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Document - ${title}</title>
            <style>
              @media print {
                @page {
                  size: A4;
                  margin: 15mm;
                }
                body {
                  margin: 0;
                  padding: 0;
                  background: white;
                }
                img {
                  max-width: 100%;
                  height: auto;
                  display: block;
                  margin: 0 auto;
                }
                .document-container {
                  width: 100%;
                  height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
              }
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
                background: #f5f5f5;
              }
              .document-container {
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                text-align: center;
              }
              img {
                max-width: 100%;
                height: auto;
                border: 1px solid #ddd;
                border-radius: 4px;
              }
              iframe {
                width: 100%;
                height: 600px;
                border: 1px solid #ddd;
                border-radius: 4px;
              }
            </style>
          </head>
          <body>
            <div class="document-container">
              ${docUrl.toLowerCase().includes('.pdf') 
                ? `<iframe src="${docUrl}" type="application/pdf"></iframe>`
                : `<img src="${docUrl}" alt="Document" />`
              }
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownload = (docUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = docUrl;
    link.download = `${title}_document_${index + 1}.${docUrl.split('.').pop() || 'file'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper function to determine if the data is base64 encoded
  const isBase64Data = (str: string) => {
    return str.startsWith('data:') || str.match(/^[A-Za-z0-9+/]*={0,2}$/);
  };

  // Helper function to create a proper data URL for base64 content
  const processDocumentUrl = (docUrl: string) => {
    if (docUrl.startsWith('data:')) {
      return docUrl; // Already a proper data URL
    }
    
    // If it looks like base64 data, try to create a proper data URL
    if (isBase64Data(docUrl)) {
      // Try to determine if it's a PDF based on content or assume PDF
      const isPdf = docUrl.includes('PDF') || docUrl.includes('%PDF');
      const mimeType = isPdf ? 'application/pdf' : 'image/jpeg';
      return `data:${mimeType};base64,${docUrl}`;
    }
    
    return docUrl; // Regular URL
  };

  // Helper function to check if document is PDF
  const isPdfDocument = (docUrl: string) => {
    const processedUrl = processDocumentUrl(docUrl);
    return processedUrl.includes('application/pdf') || 
           processedUrl.toLowerCase().includes('.pdf') ||
           processedUrl.includes('PDF') ||
           processedUrl.includes('%PDF');
  };

  return (
    <>
      <TunisiaPrintStyles />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{title} - Supporting Documents</h1>
        </div>

        {documents.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No supporting documents uploaded.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {documents.map((docUrl, index) => {
              const processedUrl = processDocumentUrl(docUrl);
              const isDisplayable = processedUrl.startsWith('data:') || processedUrl.startsWith('http') || processedUrl.startsWith('blob:');
              
              return (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Document {index + 1}</span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (isDisplayable) {
                              window.open(processedUrl, '_blank');
                            } else {
                              alert('Document preview not available');
                            }
                          }}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(processedUrl, index)}
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePrint(processedUrl)}
                          className="flex items-center gap-2 print:hidden"
                        >
                          <FileText className="h-4 w-4" />
                          Print
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="document-preview bg-gray-50 p-4 rounded-lg">
                      {isDisplayable ? (
                        isPdfDocument(docUrl) ? (
                          <div className="text-center">
                            <iframe 
                              src={processedUrl}
                              className="w-full h-96 border rounded bg-white"
                              title={`PDF Document ${index + 1}`}
                              style={{ minHeight: '400px' }}
                            />
                            <p className="text-sm text-muted-foreground mt-2">PDF Document</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <img 
                              src={processedUrl}
                              alt={`Document ${index + 1}`}
                              className="max-w-full h-auto max-h-96 mx-auto rounded border bg-white"
                              style={{ maxHeight: '400px' }}
                            />
                            <p className="text-sm text-muted-foreground mt-2">Image Document</p>
                          </div>
                        )
                      ) : (
                        <div className="text-center p-8">
                          <div className="h-16 w-16 mx-auto text-gray-400 mb-4 flex items-center justify-content">
                            <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Unable to preview document</p>
                          <p className="text-xs text-gray-500">Document format not supported for preview</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default TunisiaDocumentViewer;