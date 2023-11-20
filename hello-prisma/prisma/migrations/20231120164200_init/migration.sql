-- CreateTable
CREATE TABLE "Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "email" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Employees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "position" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeeId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "orderAddress" TEXT NOT NULL,
    "deliveryCost" INTEGER NOT NULL,
    "orderDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Orders_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrdersOfProducts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    CONSTRAINT "OrdersOfProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrdersOfProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_OrdersToProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_OrdersToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OrdersToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_name_key" ON "Products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Products_amount_key" ON "Products"("amount");

-- CreateIndex
CREATE UNIQUE INDEX "Customers_email_key" ON "Customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_employeeId_key" ON "Orders"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_customerId_key" ON "Orders"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "OrdersOfProducts_orderId_productId_amount_key" ON "OrdersOfProducts"("orderId", "productId", "amount");

-- CreateIndex
CREATE UNIQUE INDEX "_OrdersToProducts_AB_unique" ON "_OrdersToProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_OrdersToProducts_B_index" ON "_OrdersToProducts"("B");
