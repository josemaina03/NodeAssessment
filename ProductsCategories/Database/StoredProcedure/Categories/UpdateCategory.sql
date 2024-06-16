USE SHOPPING;
GO

CREATE OR ALTER PROCEDURE updateCategory(@id INT,@name NVARCHAR(128))
AS
BEGIN
    
    UPDATE Category SET name = @name WHERE id = @id;

END;
GO
