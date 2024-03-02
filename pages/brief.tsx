import React from 'react';
import Router from 'next/router';
import ConstrainedLayout from '../components/ConstrainedLayout';
import {
    Checkbox,
    Container,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup,
    TextField,
    Tooltip,
} from '@mui/material';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const Brief: React.FC = () => {
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: Record<string, unknown> = Object.fromEntries(formData);

        for (const key of Object.keys(data)) {
            if (data[key] === 'on') {
                data[key] = true;
            }
        }

        data['budget'] = Number(data['budget']);

        try {
            await fetch('/api/brief', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            // await Router.push('/');
            toast('Brief submitted successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ConstrainedLayout>
            <Container maxWidth="sm">
                <h1>Brief</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="contactName"
                        label="Contact Name"
                        name="contactName"
                        autoComplete="name"
                        helperText="Please enter your full name."
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="contactPhone"
                        label="Contact Phone"
                        name="contactPhone"
                        type="tel"
                        helperText="Please enter your contact phone number."
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="companyProduct"
                        label="Company/Product Name"
                        name="companyProduct"
                        helperText="Enter the name of your company or product."
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        helperText="Provide a brief description of your company or product."
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="values"
                        label="Values and Benefits"
                        name="values"
                        multiline
                        rows={3}
                        helperText="Describe the core values and benefits of your product or service."
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="targetAudience"
                        label="Target Audience"
                        name="targetAudience"
                        multiline
                        rows={2}
                        helperText="Describe your target audience, including demographics and interests."
                    />
                    <Tooltip title="Select the main goal of your website.">
                        <RadioGroup
                            aria-label="websiteGoal"
                            name="websiteGoal"
                            row
                        >
                            <FormControlLabel
                                value="inform"
                                control={<Radio />}
                                label="Inform"
                            />
                            <FormControlLabel
                                value="sell"
                                control={<Radio />}
                                label="Sell"
                            />
                            <FormControlLabel
                                value="engage"
                                control={<Radio />}
                                label="Engage"
                            />
                        </RadioGroup>
                    </Tooltip>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="competitors"
                        label="Competitors"
                        name="competitors"
                        multiline
                        rows={2}
                        helperText="List your main competitors and what you like or dislike about their online presence."
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="geographicRegions"
                        label="Geographic Regions"
                        name="geographicRegions"
                        helperText="Specify the geographic regions you are targeting with your website."
                    />
                    <Tooltip title="Check all that apply for your website's features.">
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox name="gallery" />}
                                label="Gallery"
                            />
                            <FormControlLabel
                                control={<Checkbox name="blog" />}
                                label="Blog"
                            />
                            <FormControlLabel
                                control={<Checkbox name="productCatalog" />}
                                label="Product Catalog"
                            />
                        </FormGroup>
                    </Tooltip>
                    <Tooltip title="Choose if your website will support one or multiple languages.">
                        <RadioGroup
                            aria-label="languageVersions"
                            name="languageVersions"
                            row
                        >
                            <FormControlLabel
                                value="singleLanguage"
                                control={<Radio />}
                                label="Single Language"
                            />
                            <FormControlLabel
                                value="multiLanguage"
                                control={<Radio />}
                                label="Multi-Language"
                            />
                        </RadioGroup>
                    </Tooltip>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="designRequirements"
                        label="Design Requirements"
                        name="designRequirements"
                        multiline
                        rows={2}
                        helperText="Describe any specific design requirements or preferences for your website."
                    />
                    <Tooltip title="Select the options that apply for your website's marketing strategy.">
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox name="seo" />}
                                label="SEO"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox name="contextualAdvertising" />
                                }
                                label="Contextual Advertising"
                            />
                            <FormControlLabel
                                control={<Checkbox name="socialMedia" />}
                                label="Social Media"
                            />
                        </FormGroup>
                    </Tooltip>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="contentManagement"
                        label="Content Management"
                        name="contentManagement"
                        helperText="Who will manage the website content? Do you need content creation services?"
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="likesDislikes"
                        label="Likes/Dislikes"
                        name="likesDislikes"
                        multiline
                        rows={2}
                        helperText="Mention any specific likes or dislikes regarding website design or functionality."
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="additionalInformation"
                        label="Additional Information"
                        name="additionalInformation"
                        multiline
                        rows={2}
                        helperText="Any additional information or special requirements for the project."
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="deadline"
                        label="Deadline"
                        name="deadline"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        helperText="Specify the deadline for the website to be launched."
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="budget"
                        label="Budget, USD"
                        name="budget"
                        type="number"
                        helperText="Enter your budget for the website project."
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </form>
            </Container>
        </ConstrainedLayout>
    );
};

export default Brief;
