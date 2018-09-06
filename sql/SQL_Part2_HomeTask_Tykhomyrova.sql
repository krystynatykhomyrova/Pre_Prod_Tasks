/*
  Part 2
*/
--1 Clone data from the Shippers table to the NewShippers table.
select *
into NewShippers
from Shippers
--query to verify that the table was created
select *
from NewShippers
--2 Find the set of products (Product Name) and maximum value of units in stock for each one, which is in the range from 25 to 50. 
--Represent records from the min to max value of units in stock.
select MAX (UnitsInStock) inStock, ProductName
From Products
where UnitsInStock > '25' and UnitsInStock < '50'
group by ProductName
order by ProductName
--3 Get the list of total quantities of ordered products which consists of: 
--total quantity ordered in Germany and the total quantiy* 0.7% of products ordered in Sweden. 
--(Result should contain 2 rows)
select count (OrderID) as Orders, ShipCountry
from Orders
group by ShipCountry
having ShipCountry = 'Germany'
union
select count ([Order Details].ProductID)* 0.7, Orders.ShipCountry
from [Order Details] join Orders
on [Order Details].OrderID=Orders.OrderID
group by ShipCountry
having ShipCountry = 'Sweden'
--4 Find the list of different countries in Employees and Customers tables.
select country 
from Customers
except
select country
from Employees
-- or find the list of different countries in  Customers and Employees tables
select country
from Employees
except
select country 
from Customers
 --5  Find the list of the same Postal Codes between Suppliers and Employees tables.
select PostalCode
from Suppliers
intersect
select PostalCode
from Employees
--6 Find the top region from which sales specialists were hired.
select MAX (Region) as Region
from Employees
where Title like '%Sales%'
--7 Get two lists of products: with a price < 50.00 with a discountinued flag and < 50  without a discountinued flag.
--first list (with discontinued flag its more then 1 in column "discontinued")
select UnitPrice, Discontinued
from Products
where UnitPrice <'50' and Discontinued > 0
--second list (without discontinued flag its 0 in column "discontinued")
select UnitPrice, Discontinued
from Products
where UnitPrice <'50' and Discontinued = 0
--8 Create new table NewProducts based on the Products table with only discountinued products. Compare data sets between Products and NewProducts tables.
--(with discontinued flag its more then 1 in column "discontinued") 
select *
into NewProducts
from Products
where Discontinued > 0
--query to verify that the table was created
select *
from NewProducts
--(Check that only discountinued products are inserted)
select*
from NewProducts
intersect
select *
from Products

--9 * Get the list of orders, where a required date is bigger than the Shipped date ( compare in days) and Ship Region is not specified.
select datediff(day,RequiredDate, ShippedDate) as DiffDate, ShipRegion
from Orders
where RequiredDate>ShippedDate and ShipRegion is NULL

