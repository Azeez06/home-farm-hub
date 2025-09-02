-- Add user_id column to Farm Products Table to link products to farmers
ALTER TABLE "Farm Products Table" 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update RLS policies to allow farmers to manage their own products
DROP POLICY IF EXISTS "Authenticated users can insert products" ON "Farm Products Table";
DROP POLICY IF EXISTS "Anyone can view products" ON "Farm Products Table";

-- Allow anyone to view products (for marketplace)
CREATE POLICY "Anyone can view products" 
ON "Farm Products Table" 
FOR SELECT 
USING (true);

-- Allow authenticated users to insert their own products
CREATE POLICY "Users can insert their own products" 
ON "Farm Products Table" 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own products
CREATE POLICY "Users can update their own products" 
ON "Farm Products Table" 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Allow users to delete their own products
CREATE POLICY "Users can delete their own products" 
ON "Farm Products Table" 
FOR DELETE 
USING (auth.uid() = user_id);