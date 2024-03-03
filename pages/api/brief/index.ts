import prisma from '#/prisma';
import { getServerAuthSession } from '#getServerAuthSession';
import { UserRole } from '#types';

// POST /api/post
export default async function handle(req, res) {
    if (req.method === 'GET' && req.query.id) {
        return getBrief(req, res);
    }

    req.body.deadline = new Date(req.body.deadline);

    if (req.method === 'POST') {
        return createBrief(req, res);
    } else if (req.method === 'PUT' && req.body.id) {
        const session = await getServerAuthSession(req, res);
        if (session.user.role < UserRole.ADMIN) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        return updateBrief(req, res);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

async function getBrief(req, res) {
    try {
        const brief = await prisma.brief.findUnique({
            where: { id: Number(req.query.id) },
        });
        res.status(200).json({ brief });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

async function createBrief(req, res) {
    console.log('createBrief', req.body);
    try {
        const brief = await prisma.brief.create({
            data: req.body,
        });
        res.status(201).json(brief);
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

async function updateBrief(req, res) {
    try {
        const { id, ...data } = req.body;
        const brief = await prisma.brief.update({
            where: { id: Number(id) },
            data,
        });
        res.status(200).json(brief);
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}
