import express from 'express';
const app = express()

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

app.use(express.json())

app.get('/products', async (req, res) => {
    const products = await prisma.products.findMany()
    res.json(products);
})

app.post('/products', async (req, res) => {
    const {name, category, amount, price} = req.body;
    if (!req.body.category)
        return res.status(403).send('Invalid product category')
    const newProduct = await prisma.products.create({
        data: {
            name,
            category,
            amount,
            price,
        },
    });

    res.json(newProduct);
})

app.patch('/employees/:id', async (req, res) => {
    const employeeId = parseInt(req.params.id);
    const {firstName, lastName, middleName, position} = req.body;

    if(!await prisma.employees.findUnique({where: {id: employeeId}}))
        return res.status(404).send('Employee with such id not found')

    const employee = await prisma.employees.update({
        where : {id: employeeId},
        data: {
            firstName,
            lastName,
            middleName,
            position,
        },
    });

    res.json(employee)

})

app.delete('/orders/:id', async (req, res) => {
    const ordersId = parseInt(req.params.id);
    if(!await prisma.orders.findUnique({where: {id: ordersId}}))
        return res.status(404).send('Order with such id not found')

    const order = await prisma.orders.delete({
        where: { id: ordersId },
    });

    res.send(order)

})









app.post('/employees', async (req, res) => {
    const {firstName, lastName, middleName, position} = req.body;
    if (!req.body.position)
        return res.status(403).send('Invalid employee position')
    const newEmployee = await prisma.employees.create({
        data: {
            firstName,
            lastName,
            middleName,
            position,
        },
    });

    res.json(newEmployee);
})

app.post('/customers', async (req, res) => {
    const {firstName, lastName, middleName, email, birthDate} = req.body;

    const newCustomer = await prisma.customers.create({
        data: {
            firstName,
            lastName,
            middleName,
            email,
            birthDate,
        },
    });

    res.json(newCustomer);
})

app.post('/orders', async (req, res) => {
    const {employeeId, customerId, orderAddress, deliveryCost, orderDate} = req.body;

    const parsedOrderDate = new Date(orderDate);
    if (isNaN(parsedOrderDate.getTime())) {
        return res.status(400).json({ error: 'Invalid orderDate format. Use ISO-8601 DateTime.' });
    }

    const newOrder = await prisma.orders.create({
        data: {
            employeeId,
            customerId,
            orderAddress,
            deliveryCost,
            orderDate: new Date(orderDate),
        },
    });

    res.send(newOrder);
})


app.post('/products', async (req, res) => {
    const {name, category, amount, price} = req.body;

    if (prisma.products.findMany({where: {name: name}})) {
        return res.status(404).json({ error: 'That product is already here' });
    }

    const newProduct = await prisma.orders.create({
        data: {
            name,
            category,
            amount,
            price
        },
    });

    res.send(newProduct);
})


async function main() {
    const relation = await prisma.ordersOfProducts.create({
        data: {
            orderId: 4,
            productId: 1,
            amount: 1
        },
    })
    console.log(relation)
}


main()




const port = process.env.PORT || 3000

app.listen(port,() => console.log(`it's alive on http:localhost:${port}`)
)