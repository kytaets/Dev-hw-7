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





const port = process.env.PORT || 3000

app.listen(port,() => console.log(`it's alive on http:localhost:${port}`)
)