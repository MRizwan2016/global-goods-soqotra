import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, User, Calendar } from "lucide-react";
import { TunisiaInvoiceBookService, TunisiaInvoiceBook, TunisiaBookAssignment } from "../services/TunisiaInvoiceBookService";
import { toast } from "sonner";

const TunisiaInvoiceBookManager = () => {
  const [books, setBooks] = useState<TunisiaInvoiceBook[]>([]);
  const [assignments, setAssignments] = useState<TunisiaBookAssignment[]>([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [username, setUsername] = useState("");
  const [userAssignment, setUserAssignment] = useState<TunisiaBookAssignment | null>(null);
  const [availablePages, setAvailablePages] = useState<string[]>([]);

  useEffect(() => {
    // Initialize default books if none exist
    TunisiaInvoiceBookService.initializeDefaultBooks();
    loadData();
  }, []);

  const loadData = () => {
    const allBooks = TunisiaInvoiceBookService.getAllBooks();
    const allAssignments = TunisiaInvoiceBookService.loadAssignments();
    setBooks(allBooks);
    setAssignments(allAssignments);
  };

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    if (newUsername) {
      const assignment = TunisiaInvoiceBookService.getAssignmentByUser(newUsername);
      setUserAssignment(assignment);
      setAvailablePages(assignment?.availablePages || []);
    } else {
      setUserAssignment(null);
      setAvailablePages([]);
    }
  };

  const handleAssignBook = () => {
    if (!selectedBookId || !username) {
      toast.error("Please select a book and enter a username");
      return;
    }

    const assignment = TunisiaInvoiceBookService.assignBookToUser(selectedBookId, username);
    if (assignment) {
      toast.success(`Book assigned to ${username} successfully`);
      setUserAssignment(assignment);
      setAvailablePages(assignment.availablePages);
      loadData();
      setSelectedBookId("");
    } else {
      toast.error("Failed to assign book. Book may not be available.");
    }
  };

  const availableBooks = books.filter(book => book.status === "available");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Tunisia Invoice Book Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                placeholder="Enter username"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Book to Assign</label>
              <Select value={selectedBookId} onValueChange={setSelectedBookId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a book" />
                </SelectTrigger>
                <SelectContent>
                  {availableBooks.map((book) => (
                    <SelectItem key={book.id} value={book.id}>
                      {book.bookNumber} ({book.startPage} - {book.endPage})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Action</label>
              <Button 
                onClick={handleAssignBook}
                disabled={!selectedBookId || !username}
                className="w-full"
              >
                Assign Book
              </Button>
            </div>
          </div>

          {userAssignment && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Current Assignment for {username}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Book:</strong> {userAssignment.bookNumber}</p>
                    <p><strong>Assigned Date:</strong> {new Date(userAssignment.assignedDate).toLocaleDateString()}</p>
                    <p><strong>Pages Remaining:</strong> {userAssignment.availablePages.length}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Available Invoice Numbers</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select invoice number" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {availablePages.slice(0, 20).map((page) => (
                          <SelectItem key={page} value={page}>
                            {page}
                          </SelectItem>
                        ))}
                        {availablePages.length > 20 && (
                          <SelectItem value="more" disabled>
                            ... and {availablePages.length - 20} more
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book Number</TableHead>
                  <TableHead>Page Range</TableHead>
                  <TableHead>Total Pages</TableHead>
                  <TableHead>Available Pages</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Assigned Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.bookNumber}</TableCell>
                    <TableCell>{book.startPage} - {book.endPage}</TableCell>
                    <TableCell>{book.totalPages}</TableCell>
                    <TableCell>{book.available.length}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          book.status === "available" ? "secondary" :
                          book.status === "assigned" ? "default" : "destructive"
                        }
                      >
                        {book.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {book.assignedTo ? (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {book.assignedTo}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {book.assignedDate ? (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(book.assignedDate).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TunisiaInvoiceBookManager;