import React, { useState } from 'react';

import Button from '@mui/material/Button';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '#prisma';
import { Brief } from '@prisma/client';
import Layout from '$/Layout';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

type BriefJSONReady = Brief & {
    createdAt: string;
    deadline: string;
};

function camelCaseToWords(s: string) {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });
    if (!session) {
        res.statusCode = 403;
        return { props: { briefs: [] } };
    }

    let briefs: any = await prisma.brief.findMany();

    briefs = briefs.map((brief) => {
        return {
            ...brief,
            createdAt: brief.createdAt.toLocaleString(),
            deadline: brief.deadline.toLocaleString(),
        };
    });

    return {
        props: { briefs },
    };
};

const Dashboard: React.FC<{ briefs: BriefJSONReady[] }> = ({ briefs }) => {
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);

    const handleViewDetails = (index: number) => {
        if (expandedRowIndex === index) {
            setExpandedRowIndex(null);
            return;
        }
        setExpandedRowIndex(index);
    };

    const handleDownloadPDF = (index: number) => {
        const brief = briefs[index];

        const pdf = new jsPDF();

        pdf.setFontSize(18);
        pdf.text('Brief Details', 10, 10);

        // Define the columns and the data
        const columns = [
            { header: 'Field', dataKey: 'field' },
            { header: 'Value', dataKey: 'value' },
        ];

        const data = Object.keys(brief).map((key) => {
            return { field: camelCaseToWords(key), value: brief[key] };
        });

        // @ts-expect-error method is imported from jspdf-autotable
        pdf.autoTable(columns, data, { startY: 20 });

        // Save the PDF
        pdf.save(`Brief-${brief.id}.pdf`);
    };

    return (
        <Layout>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="briefs table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Contact Name</TableCell>
                            <TableCell>Contact Phone</TableCell>
                            <TableCell>Company/Product</TableCell>
                            <TableCell>Deadline</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {briefs.map((row, index) => (
                            <>
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.contactName}
                                    </TableCell>
                                    <TableCell>{row.contactPhone}</TableCell>
                                    <TableCell>{row.companyProduct}</TableCell>
                                    <TableCell>{row.deadline}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                handleViewDetails(index)
                                            }
                                        >
                                            Details
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() =>
                                                handleDownloadPDF(index)
                                            }
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Download PDF
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                {expandedRowIndex === index && (
                                    <TableRow>
                                        <TableCell
                                            style={{
                                                paddingBottom: 0,
                                                paddingTop: 0,
                                            }}
                                            colSpan={6}
                                        >
                                            <Box margin={2}>
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    component="div"
                                                >
                                                    Brief Details
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>
                                                        Description:
                                                    </strong>{' '}
                                                    {row.description}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Values:</strong>{' '}
                                                    {row.values}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>
                                                        Target Audience:
                                                    </strong>{' '}
                                                    {row.targetAudience}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>
                                                        Website Goal:
                                                    </strong>{' '}
                                                    {row.websiteGoal}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>
                                                        Competitors:
                                                    </strong>{' '}
                                                    {row.competitors}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>
                                                        Geographic Regions:
                                                    </strong>{' '}
                                                    {row.geographicRegions}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Features:</strong>{' '}
                                                    Gallery:{' '}
                                                    {row.gallery ? 'Yes' : 'No'}
                                                    , , Blog:{' '}
                                                    {row.blog ? 'Yes' : 'No'},
                                                    Product Catalog:{' '}
                                                    {row.productCatalog
                                                        ? 'Yes'
                                                        : 'No'}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>
                                                        Language Versions:
                                                    </strong>{' '}
                                                    {row.languageVersions}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>
                                                        Design Requirements:
                                                    </strong>{' '}
                                                    {row.designRequirements}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Marketing:</strong>{' '}
                                                    SEO:{' '}
                                                    {row.seo ? 'Yes' : 'No'},
                                                    Contextual Advertising:{' '}
                                                    {row.contextualAdvertising
                                                        ? 'Yes'
                                                        : 'No'}
                                                    , Social Media:{' '}
                                                    {row.socialMedia
                                                        ? 'Yes'
                                                        : 'No'}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>
                                                        Content Management:
                                                    </strong>{' '}
                                                    {row.contentManagement}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>
                                                        Likes/Dislikes:
                                                    </strong>{' '}
                                                    {row.likesDislikes}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>
                                                        Additional Information:
                                                    </strong>{' '}
                                                    {row.additionalInformation}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <strong>Budget:</strong>{' '}
                                                    {row.budget}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    );
};

export default Dashboard;
