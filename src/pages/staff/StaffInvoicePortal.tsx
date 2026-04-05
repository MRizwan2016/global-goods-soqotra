import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, User, Calendar, RefreshCw, Pencil, Trash2, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { syncBookStockToExternal } from "@/lib/externalSync";

interface InvoiceBook {
  id: string;
  book_number: string;
  start_page: string;
  end_page: string;
  total_pages: number;
  pages_used: number;
  status: string;
  assigned_to_sales_rep: string | null;
  assigned_date: string | null;
  country: string;
}

const StaffInvoicePortal = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState<InvoiceBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("");

  // Admin assign dialog state
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [assignToName, setAssignToName] = useState("");
  const [staffList, setStaffList] = useState<{ name: string; email: string }[]>([]);

  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editBook, setEditBook] = useState<InvoiceBook | null>(null);
  const [editPagesUsed, setEditPagesUsed] = useState(0);
  const [editStatus, setEditStatus] = useState("");

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Check admin status
      const { data: adminCheck } = await supabase.rpc("is_admin", { _user_id: user.id });
      setIsAdmin(!!adminCheck);

      // Get current user's profile name
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", user.id)
        .single();
      setCurrentUserName(profile?.full_name || "");

      // Load all books (800-series)
      const { data: booksData, error } = await supabase
        .from("manage_invoice_book_stock")
        .select("id, book_number, start_page, end_page, total_pages, pages_used, status, assigned_to_sales_rep, assigned_date, country")
        .order("book_number");

      if (error) throw error;
      setBooks(booksData || []);

      // Load staff list for admin assignment
      if (adminCheck) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("full_name, email")
          .order("full_name");
        setStaffList(
          (profiles || []).map((p: any) => ({ name: p.full_name || "", email: p.email || "" }))
        );
      }
    } catch (err) {
      console.error("Error loading data:", err);
      toast.error("Failed to load invoice books");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const canEdit = (book: InvoiceBook) => {
    if (isAdmin) return true;
    return book.assigned_to_sales_rep === currentUserName;
  };

  const handleOpenEdit = (book: InvoiceBook) => {
    setEditBook(book);
    setEditPagesUsed(book.pages_used);
    setEditStatus(book.status);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editBook) return;
    try {
      const { error } = await supabase
        .from("manage_invoice_book_stock")
        .update({ pages_used: editPagesUsed, status: editStatus })
        .eq("id", editBook.id);

      if (error) throw error;
      void syncBookStockToExternal({
        book_number: editBook.book_number,
        start_page: editBook.start_page,
        end_page: editBook.end_page,
        total_pages: editBook.total_pages,
        pages_used: editPagesUsed,
        assigned_to_sales_rep: editBook.assigned_to_sales_rep,
        assigned_date: editBook.assigned_date,
        status: editStatus,
        country: editBook.country,
      });
      toast.success(`Book ${editBook.book_number} updated`);
      setEditDialogOpen(false);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    }
  };

  const handleAssignBook = async () => {
    if (!selectedBookId || !assignToName) {
      toast.error("Select a book and a staff member");
      return;
    }
    try {
      const { error } = await supabase
        .from("manage_invoice_book_stock")
        .update({
          assigned_to_sales_rep: assignToName,
          assigned_date: new Date().toISOString(),
          status: "assigned",
        })
        .eq("id", selectedBookId);

      if (error) throw error;
      const selectedBook = books.find((book) => book.id === selectedBookId);
      if (selectedBook) {
        void syncBookStockToExternal({
          book_number: selectedBook.book_number,
          start_page: selectedBook.start_page,
          end_page: selectedBook.end_page,
          total_pages: selectedBook.total_pages,
          pages_used: selectedBook.pages_used,
          assigned_to_sales_rep: assignToName,
          assigned_date: new Date().toISOString(),
          status: "assigned",
          country: selectedBook.country,
        });
      }
      toast.success(`Book assigned to ${assignToName}`);
      setAssignDialogOpen(false);
      setSelectedBookId("");
      setAssignToName("");
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Assignment failed");
    }
  };

  const handleDeleteBook = async (book: InvoiceBook) => {
    if (!confirm(`Delete book ${book.book_number}? This cannot be undone.`)) return;
    try {
      const { error } = await supabase
        .from("manage_invoice_book_stock")
        .delete()
        .eq("id", book.id);

      if (error) throw error;
      void syncBookStockToExternal({
        book_number: book.book_number,
        start_page: book.start_page,
        end_page: book.end_page,
        total_pages: book.total_pages,
        pages_used: book.pages_used,
        assigned_to_sales_rep: "",
        assigned_date: null,
        status: "deleted",
        country: book.country,
      });
      toast.success(`Book ${book.book_number} deleted`);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "available": return "secondary";
      case "assigned": return "default";
      case "completed": return "outline";
      default: return "destructive";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Staff Invoice Book Portal
            {isAdmin && <Badge variant="default" className="ml-2">Admin</Badge>}
          </CardTitle>
          <div className="flex gap-2">
            {isAdmin && (
              <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-1" /> Assign Book
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Assign Book to Staff</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Book</label>
                      <Select value={selectedBookId} onValueChange={setSelectedBookId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a book" />
                        </SelectTrigger>
                        <SelectContent>
                          {books
                            .filter((b) => b.status === "available")
                            .map((b) => (
                              <SelectItem key={b.id} value={b.id}>
                                #{b.book_number} ({b.start_page}-{b.end_page})
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Assign To</label>
                      <Select value={assignToName} onValueChange={setAssignToName}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose staff member" />
                        </SelectTrigger>
                        <SelectContent>
                          {staffList.map((s) => (
                            <SelectItem key={s.email} value={s.name}>
                              {s.name} ({s.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAssignBook} className="w-full">
                      Assign
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <Button variant="outline" size="sm" onClick={loadData}>
              <RefreshCw className="h-4 w-4 mr-1" /> Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Logged in as: <strong>{currentUserName || user?.email}</strong>
            {!isAdmin && " — You can update books assigned to you."}
          </p>

          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book #</TableHead>
                  <TableHead>Pages</TableHead>
                  <TableHead>Used</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Assigned Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      No invoice books found.
                    </TableCell>
                  </TableRow>
                ) : (
                  books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.book_number}</TableCell>
                      <TableCell>{book.start_page} – {book.end_page}</TableCell>
                      <TableCell>{book.pages_used} / {book.total_pages}</TableCell>
                      <TableCell>{book.country}</TableCell>
                      <TableCell>
                        <Badge variant={statusColor(book.status) as any}>
                          {book.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {book.assigned_to_sales_rep ? (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" /> {book.assigned_to_sales_rep}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {book.assigned_date ? (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(book.assigned_date).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        {canEdit(book) && (
                          <Button size="sm" variant="outline" onClick={() => handleOpenEdit(book)}>
                            <Pencil className="h-3 w-3" />
                          </Button>
                        )}
                        {isAdmin && (
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteBook(book)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Book #{editBook?.book_number}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Pages Used</label>
              <Input
                type="number"
                min={0}
                max={editBook?.total_pages || 50}
                value={editPagesUsed}
                onChange={(e) => setEditPagesUsed(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in_use">In Use</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSaveEdit} className="w-full">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffInvoicePortal;
