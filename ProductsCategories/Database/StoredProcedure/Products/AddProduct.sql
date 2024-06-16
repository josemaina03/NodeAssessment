USE SHOPPING;

GO
CREATE OR ALTER PROCEDURE addProduct(@name NVARCHAR(128),@price FLOAT,@categoryId INT)
    
AS
BEGIN
    

    -- Insert the new product into the Product table
    INSERT INTO Product (name, price, categoryId)
    VALUES (@name, @price, @categoryId);

  
END;

GO