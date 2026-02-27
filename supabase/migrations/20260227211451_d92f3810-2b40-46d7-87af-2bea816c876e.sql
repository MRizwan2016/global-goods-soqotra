
-- Force schema cache reload
NOTIFY pgrst, 'reload schema';
SELECT 1;
