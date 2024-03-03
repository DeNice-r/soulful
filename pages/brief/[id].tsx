import React, { useEffect, useState } from 'react';
import ConstrainedLayout from '$/ConstrainedLayout';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';
import BriefForm from '$/BriefForm';
import { formToJson } from '#formToJson';
import {useSession} from 'next-auth/react';
import {UserRole} from '#types';

const EditBrief: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { id } = router.query;

    const [brief, setBrief] = useState(null);

    useEffect(() => {
        if (!id || session.user.role < UserRole.ADMIN) return;

        const getBrief = async () => {
            try {
                setBrief(
                    (await (await fetch(`/api/brief?id=${id}`)).json()).brief,
                );
            } catch (error) {
                console.error(error);
            }
        };
        getBrief();
    }, [id, session]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const data: any = {
            id,

            gallery: false,
            blog: false,
            productCatalog: false,

            seo: false,
            contextualAdvertising: false,
            socialMedia: false,

            ...formToJson(event.currentTarget),
        };

        try {
            await fetch('/api/brief', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            await Router.push('/dashboard');
            toast('Brief updated successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ConstrainedLayout>
            <Container maxWidth="sm">
                <h1>Edit brief</h1>
                {!brief && <p>Loading...</p>}
                {brief && (
                    <BriefForm
                        handleSubmit={handleSubmit}
                        defaultValues={brief}
                    />
                )}
            </Container>
        </ConstrainedLayout>
    );
};

export default EditBrief;
