USE SHOPPING;
GO

CREATE OR ALTER PROCEDURE addCategory(@name NVARCHAR(128))
AS
BEGIN
    -- Insert the new category into the Category table
    INSERT INTO Category (name)
    VALUES (@name);

    
END;
GO
