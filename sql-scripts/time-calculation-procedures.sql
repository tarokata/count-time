CREATE DATABASE Sample

USE Sample

/*
CUSTOMER TABLE
customer(
	CustomerID: 1
	FirstName: 'Jame',
	LastName: 'Bone',
	Gender: 'Male',
	City: 'Chicago',
	BillingAddress: '57 Beekman Road'
	State: 'CA',
	ZipCode: 11444-4444,
	PhoneNumber: (617) 223-1919
	EmailAddress: 'demoemail@gmail.com'
)
*/

/*
CREATE TABLE CUSTOMERS(
	CustomerID VARCHAR(10) NOT NULL,
	FirstName VARCHAR(10),
	LastName VARCHAR(10),
	Gender VARCHAR(5),
	City VARCHAR(30),
	BillingAddress VARCHAR(50),
	State VARCHAR(2),
	ZipCode VARCHAR(20),
	PhoneNumber VARCHAR(35),
	Email VARCHAR(25),
	CONSTRAINT PK_Customer PRIMARY KEY (CustomerID)
);
*/
CREATE TABLE CUSTOMERS(
	CustomerID VARCHAR(10) NOT NULL,
	FullName VARCHAR(10),
	CONSTRAINT PK_Customer PRIMARY KEY (CustomerID)
);

-- procedure for adding new customers
CREATE PROCEDURE AddCustomers @NumberOfRows INT, @TimeExecution INT OUTPUT
AS
BEGIN
	DECLARE @StartTime datetime
	DECLARE @EndTime datetime

	DECLARE @CustomerID INT
	SET @CustomerID = 1

	SET @StartTime = GETDATE()
	WHILE(@CustomerID <= @NumberOfRows) 
	BEGIN
		-- INSERT INTO CUSTOMERS VALUES(@CustomerID, 'Jame', 'Bond', 'Male', 'Chicago', '57 Beekman Road', 'CA', '11444-4444', '(617) 223-1919', 'jamebond@gmail.com')
		INSERT INTO CUSTOMERS VALUES(@CustomerID, 'Jame Bond')
		SET @CustomerID = @CustomerID + 1
	END
	SET @EndTime = GETDATE()

	SELECT @TimeExecution = DATEDIFF(MILLISECOND, @StartTime, @EndTime)
END

DECLARE @TIME INT
EXEC dbo.AddCustomers 1000000, @TimeExecution = @TIME OUTPUT
PRINT @TIME

-- procedure for showing all customers
CREATE PROCEDURE ShowCustomers @TimeExecution INT OUTPUT
AS
BEGIN
	DECLARE @StartTime datetime
	DECLARE @EndTime datetime

	SET @StartTime = GETDATE()

	SELECT * FROM CUSTOMERS

	SET @EndTime = GETDATE()

	SELECT @TimeExecution = DATEDIFF(MILLISECOND, @StartTime, @EndTime)
END

-- procedure for updating customers' contact info
CREATE PROCEDURE UpdateCustomers @TimeExecution INT OUTPUT
AS
BEGIN
	DECLARE @StartTime datetime
	DECLARE @EndTime datetime

	SET @StartTime = GETDATE()

	/*
	UPDATE CUSTOMERS 
	SET FirstName = 'John', LastName = 'Wick', Gender = 'Male', BillingAddress = '60 Berlingham Road',
		City = 'New York', State = 'NY', ZipCode = '55143-9989', PhoneNumber = '(784) 223-2020', 
		Email = 'johnwick@gmail.com' 
	*/

	UPDATE CUSTOMERS SET FullName = 'John Wick'

	SET @EndTime = GETDATE()

	SELECT @TimeExecution = DATEDIFF(MILLISECOND, @StartTime, @EndTime)
END

-- procedure for deleting all customers
CREATE PROCEDURE DeleteCustomers @TimeExecution INT OUTPUT
AS
BEGIN
	DECLARE @StartTime datetime
	DECLARE @EndTime datetime

	SET @StartTime = GETDATE()

	DELETE FROM CUSTOMERS

	SET @EndTime = GETDATE()

	SELECT @TimeExecution = DATEDIFF(MILLISECOND, @StartTime, @EndTime)
END

drop procedure dbo.AddCustomers
drop procedure dbo.ShowCustomers
drop procedure dbo.UpdateCustomers
drop procedure dbo.DeleteCustomers

