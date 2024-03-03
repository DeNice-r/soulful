import React from 'react';
import ConstrainedLayout from '$/ConstrainedLayout';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import Router from 'next/router';
import BriefForm from '$/BriefForm';
import { formToJson } from '#formToJson';

const Index: React.FC = () => {
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const data = formToJson(event.currentTarget);

        try {
            const result = await fetch('/api/brief', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (result.ok) {
                toast('Brief submitted successfully!');
                await Router.push('/');
            } else {
                toast.error('Failed to submit brief');
            }
            toast('Brief submitted successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ConstrainedLayout>
            <Container maxWidth="sm">
                <h1>Brief</h1>
                <BriefForm handleSubmit={handleSubmit} />
            </Container>
        </ConstrainedLayout>
    );
};

export default Index;
