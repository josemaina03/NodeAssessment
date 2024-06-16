USE SHOPPING;
GO

CREATE OR ALTER PROCEDURE updateProduct (@id INT,@name NVARCHAR(128),@price FLOAT, @categoryId INT)
AS
BEGIN
    UPDATE Product SET Name=@name WHERE id=@id
END;
GO
