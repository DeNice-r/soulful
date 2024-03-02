import prisma from '#/prisma';

// POST /api/post
export default async function handle(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    console.log(req.body);

    req.body.deadline = new Date(req.body.deadline);

    const result = await prisma.brief.create({
        data: {
            ...req.body,
            // deadline: new Date(req.body.deadline),
        },
    });
    res.json(result);
}
