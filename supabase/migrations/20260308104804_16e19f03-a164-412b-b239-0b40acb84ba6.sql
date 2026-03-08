UPDATE public.invoice_books 
SET assigned_to_sales_rep = 'Mr. Lahiru Chathuranga',
    assigned_to_driver = 'Ashoka Udesh',
    status = 'assigned',
    assigned_date = now()
WHERE book_number = '800' AND country = 'Sri Lanka';