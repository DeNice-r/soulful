import React from 'react';
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup,
    TextField,
    Tooltip,
} from '@mui/material';
import { format } from 'date-fns';

export type BriefProps = {
    handleSubmit: (event: any) => Promise<void>;
    defaultValues?: Record<string, unknown>;
};

const Post: React.FC<BriefProps> = ({ handleSubmit, defaultValues }) => {
    return (
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
                defaultValue={defaultValues?.contactName}
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
                defaultValue={defaultValues?.contactPhone}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="companyProduct"
                label="Company/Product Name"
                name="companyProduct"
                helperText="Enter the name of your company or product."
                defaultValue={defaultValues?.companyProduct}
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
                defaultValue={defaultValues?.description}
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
                defaultValue={defaultValues?.values}
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
                defaultValue={defaultValues?.targetAudience}
            />
            <Tooltip title="Select the main goal of your website.">
                <RadioGroup aria-label="websiteGoal" name="websiteGoal" row defaultValue={defaultValues?.websiteGoal}>
                    <FormControlLabel
                        value="inform"
                        control={
                            <Radio

                            />
                        }
                        label="Inform"
                    />
                    <FormControlLabel
                        value="sell"
                        control={
                            <Radio

                            />
                        }
                        label="Sell"
                    />
                    <FormControlLabel
                        value="engage"
                        control={
                            <Radio

                            />
                        }
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
                defaultValue={defaultValues?.competitors}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="geographicRegions"
                label="Geographic Regions"
                name="geographicRegions"
                helperText="Specify the geographic regions you are targeting with your website."
                defaultValue={defaultValues?.geographicRegions}
            />
            <Tooltip title="Check all that apply for your website's features.">
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="gallery"
                                defaultChecked={defaultValues?.gallery === true}
                            />
                        }
                        label="Gallery"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="blog"
                                defaultChecked={defaultValues?.blog === true}
                            />
                        }
                        label="Blog"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="productCatalog"
                                defaultChecked={
                                    defaultValues?.productCatalog === true
                                }
                            />
                        }
                        label="Product Catalog"
                    />
                </FormGroup>
            </Tooltip>
            <Tooltip title="Choose if your website will support one or multiple languages.">
                <RadioGroup
                    aria-label="languageVersions"
                    name="languageVersions"
                    row
                    defaultValue={defaultValues?.languageVersions}
                >
                    <FormControlLabel
                        value="singleLanguage"
                        control={
                            <Radio

                            />
                        }
                        label="Single Language"
                    />
                    <FormControlLabel
                        value="multiLanguage"
                        control={
                            <Radio

                            />
                        }
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
                defaultValue={defaultValues?.designRequirements}
            />
            <Tooltip title="Select the options that apply for your website's marketing strategy.">
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="seo"
                                defaultChecked={defaultValues?.seo === true}
                            />
                        }
                        label="SEO"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="contextualAdvertising"
                                defaultChecked={
                                    defaultValues?.contextualAdvertising ===
                                    true
                                }
                            />
                        }
                        label="Contextual Advertising"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="socialMedia"
                                defaultChecked={
                                    defaultValues?.socialMedia === true
                                }
                            />
                        }
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
                defaultValue={defaultValues?.contentManagement}
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
                defaultValue={defaultValues?.likesDislikes}
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
                defaultValue={defaultValues?.additionalInformation}
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
                defaultValue={
                    defaultValues?.deadline
                        ? format(
                            new Date(String(defaultValues.deadline)),
                            'yyyy-MM-dd',
                        )
                        : ''
                }
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
                defaultValue={defaultValues?.budget}
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
    );
};

export default Post;
