SELECT customerName, o.orderDate FROM customers AS c JOIN orders AS o ON c.customerNumber = o.customerNumber WHERE orderDate >'2004-3-31' AND orderDate <'2004-6-01' ORDER BY orderDate DESC;