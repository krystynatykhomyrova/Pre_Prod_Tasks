/*
  Part 1
*/
--1 Update the Employees table, so it contains the HireDate values from 2014 till the current (2019) year
select *
from dbo.Employees
update Employees
set HireDate=DATEADD(year,22,HireDate)

--2 Delete records from the Products table where ReorderLevel values is equal to 30.
EXEC sp_msforeachtable 'ALTER TABLE? NOCHECK CONSTRAINT all'
DELETE FROM Products WHERE ReorderLevel=30

--3 Get the list of data about employees: First Name, Last Name, Title, HireDate who was hired this year
select FirstName, Title, HireDate
from Employees
where HireDate like'%2018%'
--or
SELECT FirstName, LastName, Title, HireDate
FROM Employees
WHERE year(HireDate) = year(GETDATE())

--4 Get the list of titles and corresponding employees, who are working in each department (the list of columns in the result set from the Employee table is optional) 
--(in our tables there is no "department").
select FirstName, Title, LastName
from Employees
order by Title

--5 Get the list of suppliers, which are located in USA and have a specified region.
 select LastName, FirstName, Region, Country
from dbo.Employees
where country= 'USA' and region IS NOT NULL

--6 Get the amount of products that were delivered by each supplier (company), which have a discount from the Unit Price more than 10%. 
  --Where record are represented from the biggest to lowest discount.
select  Suppliers.CompanyName, COUNT (Products.ProductID) As ProductsCount
from [Products] JOIN [Order Details]
 ON [Products].ProductID=[Order Details].ProductID
    JOIN Suppliers
	ON Products.SupplierID=Suppliers.SupplierID
where Discount>0.1
group by Suppliers.CompanyName
order by ProductsCount 

--7 Get the top five product categories with the list of the most buyable products in European countries.
 select TOP 5 Categories.CategoryName, Products.ProductName, Suppliers.Country
from Products join Suppliers 
on Products.SupplierID=Suppliers.SupplierID
 join [Order Details]
 on Products.ProductID=[Order Details].ProductID
 join Categories
 on Categories.CategoryID=Products.CategoryID
where Country <> 'Australia' and  Country <> 'USA' and Country <>'Canada' and Country <>'Brazil'
order by  UnitsOnOrder DESC

--8 Get the First Name, Last Name and Title of Managers and their subordinates.
SELECT 
(SELECT FirstName FROM Employees WHERE Title LIKE '%Manager%') AS ManagerName,
(SELECT LastName FROM Employees WHERE Title LIKE '%Manager%') AS ManagerLastName,
(SELECT Title FROM Employees WHERE Title LIKE '%Manager%') AS ManagerTitle,
FirstName AS SubordinateName, LastName AS SubordinateLastName, Title AS SubordinateTitle
FROM Employees
WHERE ReportsTo = (SELECT EmployeeID FROM Employees WHERE Title LIKE '%Manager%')
Group By FirstName, LastName, Title

--9 Get the Firts Name, Lastn Name, Title of Sales who has the least amount of orders. (Amount of sold products should be also in the result set)
SELECT TOP 1 COUNT ([Order Details].Quantity) AS quantity, Employees.FirstName, Employees.LastName, Employees.Title
FROM Employees JOIN Orders
ON Employees.EmployeeID=Orders.EmployeeID
JOIN [Order Details]
ON [Order Details].OrderID=Orders.OrderID
GROUP BY FirstName, LastName, Title
order by quantity


