-- Enable RLS on Farm Products Table if not already enabled
ALTER TABLE public."Farm Products Table" ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view products (for marketplace)
CREATE POLICY "Anyone can view products" 
ON public."Farm Products Table"
FOR SELECT 
USING (true);

-- Allow authenticated users to insert their own products (for farmers)
CREATE POLICY "Authenticated users can insert products" 
ON public."Farm Products Table"
FOR INSERT 
TO authenticated
WITH CHECK (true);