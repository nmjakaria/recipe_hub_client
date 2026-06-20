/* eslint-disable @next/next/no-img-element */
// components/dashboard/AddRecipeForm.jsx
"use client";

import React, { useState } from 'react';
import { Plus, Trash2, Upload, Loader2, ChefHat, Clock, AlertCircle } from 'lucide-react';
import { Select, Label, ListBox, TextField, Input, Description, FieldError, Button, toast, TextArea } from '@heroui/react';
import { createRecipe } from '@/lib/actions/recipe';

export default function AddRecipeForm({ user }) {
    // Form State mapped to your exact database schema instructions
    const [formData, setFormData] = useState({
        recipeName: '',
        recipeImage: '',
        category: '',
        cuisineType: '',
        difficultyLevel: 'Easy',
        preparationTime: '',
        ingredients: [''],
        instructions: [''],
        description: '',

        // Secured server injection mappings
        authorId: user?.id || 'anonymous_id',
        authorName: user?.name || 'Anonymous User',
        authorEmail: user?.email || 'no-email@domain.com',

        // Default schema counters and status systems
        likesCount: 0,
        isFeatured: false,
        status: 'pending'
    });

    const [errors, setErrors] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", "Beverages"];
    const cuisines = ["Bangladeshi", "Italian", "Mexican", "Indian", "Chinese", "French", "Japanese", "American", "Mediterranean"];
    const difficulties = ["Easy", "Medium", "Hard"];

    // ImgBB Upload Handler
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 3 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, recipeImage: "File size exceeds 3MB limit" }));
            return;
        }

        setIsUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: uploadFormData
            });
            const data = await response.json();

            if (data.success) {
                setFormData(prev => ({ ...prev, recipeImage: data.data.url }));
                setErrors(prev => ({ ...prev, recipeImage: null }));
            } else {
                setErrors(prev => ({ ...prev, recipeImage: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, recipeImage: "Network error during image upload" }));
        } finally {
            setIsUploading(false);
        }
    };

    // Array mutation routines for flexible ingredient listing maps
    const handleArrayChange = (index, value, field) => {
        const updatedArray = [...formData[field]];
        updatedArray[index] = value;
        setFormData(prev => ({ ...prev, [field]: updatedArray }));
    };

    const addArrayField = (field) => {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const removeArrayField = (index, field) => {
        if (formData[field].length > 1) {
            const updatedArray = formData[field].filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, [field]: updatedArray }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        if (!formData.recipeName.trim()) formErrors.recipeName = "Recipe name is required";
        if (!formData.recipeImage) formErrors.recipeImage = "Recipe image feature banner is required";
        if (!formData.preparationTime) formErrors.preparationTime = "Prep time required";

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            const finalPayload = {
                ...formData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // console.log("Submitting structured database payload matching schema:", finalPayload);
            await createRecipe(finalPayload);

            toast.success("Recipe submitted successfully!");

            // Reset form fields back to blank
            setFormData({
                recipeName: '',
                recipeImage: '',
                category: '',
                cuisineType: '',
                difficultyLevel: 'Easy',
                preparationTime: '',
                ingredients: [''],
                instructions: [''],
                description: '',
                authorId: user?.id || 'anonymous_id',
                authorName: user?.name || 'Anonymous User',
                authorEmail: user?.email || 'no-email@domain.com',
                likesCount: 0,
                isFeatured: false,
                status: 'pending'
            });

            setErrors({});

        } catch (err) {
            // console.error("Submission exception context: ", err);
            toast.error("Failed to submit recipe.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-background-secondary p-4 rounded-2xl">
            {/* Image Upload Banner Box */}
            <div className="border-2 border-dashed border-default rounded-2xl p-6 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center min-h-60 relative overflow-hidden">
                {formData.recipeImage ? (
                    <div className="absolute inset-0 w-full h-full group">
                        <img src={formData.recipeImage} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="cursor-pointer bg-white/20 text-white backdrop-blur-md px-4 py-2 rounded-xl text-sm border border-white/30">
                                Change Image
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                        </div>
                    </div>
                ) : (
                    <div className="text-center space-y-3">
                        <div className="size-12 rounded-full bg-default flex items-center justify-center mx-auto text-muted-foreground">
                            {isUploading ? <Loader2 className="size-6 animate-spin" /> : <Upload className="size-6" />}
                        </div>
                        <div>
                            <label className="cursor-pointer font-medium text-primary hover:underline text-sm">
                                Click to upload banner photo
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                            </label>
                            <p className="text-xs text-zinc-400 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                    </div>
                )}
                {errors.recipeImage && (
                    <p className="text-xs text-danger flex items-center gap-1 mt-2"><AlertCircle className="size-3.5" /> {errors.recipeImage}</p>
                )}
            </div>

            {/* Input Context Framework Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Recipe Name Input */}
                <TextField isInvalid={!!errors.recipeName} className="flex flex-col gap-1.5 w-full">
                    <Label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 px-1">Recipe Name</Label>
                    <Input
                        value={formData.recipeName}
                        onChange={(e) => setFormData(prev => ({ ...prev, recipeName: e.target.value }))}
                        placeholder="e.g., Homemade Margherita Pizza"
                        className="w-full min-h-12 border border-default rounded-xl px-3 flex items-center bg-zinc-50 dark:bg-zinc-900/50 transition-colors focus-within:border-primary outline-none text-sm text-foreground"
                    />
                    <Description className="text-xs text-zinc-400 dark:text-zinc-500 px-1">Give your dish an attractive public name.</Description>
                    {errors.recipeName && <FieldError className="text-xs text-danger px-1">{errors.recipeName}</FieldError>}
                </TextField>

                {/* Preparation Time Input */}
                <TextField isInvalid={!!errors.preparationTime} className="flex flex-col gap-1.5 w-full">
                    <Label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 px-1">Preparation Time (Minutes)</Label>
                    <div className="relative flex items-center w-full">
                        <Clock className="absolute left-3 size-4 text-zinc-400 z-10" />
                        <Input
                            type="number"
                            min={0}
                            value={formData.preparationTime}
                            onChange={(e) => setFormData(prev => ({ ...prev, preparationTime: e.target.value }))}
                            placeholder="45"
                            className="w-full min-h-12 border border-default rounded-xl pl-9 pr-3 flex items-center bg-zinc-50 dark:bg-zinc-900/50 transition-colors focus-within:border-primary outline-none text-sm text-foreground"
                        />
                    </div>
                    <Description className="text-xs text-zinc-400 dark:text-zinc-500 px-1">Total estimated time needed to serve.</Description>
                    {errors.preparationTime && <FieldError className="text-xs text-danger px-1">{errors.preparationTime}</FieldError>}
                </TextField>

                {/* Category Select Dropdown */}
                <div className="flex flex-col gap-1.5 w-full">
                    <Select
                        selectedKey={formData.category}
                        onSelectionChange={(key) => setFormData(prev => ({ ...prev, category: key }))}
                    >
                        <Label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 px-1">Category</Label>
                        <Select.Trigger className="w-full min-h-12 border border-default rounded-xl px-3 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 hover:bg-default/40 transition-colors focus:border-primary">
                            <Select.Value className="text-sm text-foreground">
                                {formData.category || "Select a category"}
                            </Select.Value>
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-white dark:bg-zinc-950 border border-default rounded-xl shadow-xl p-1 min-w-[240px] z-50">
                            <ListBox className="gap-0.5 flex flex-col">
                                {categories.map((cat) => (
                                    <ListBox.Item
                                        key={cat}
                                        id={cat}
                                        textValue={cat}
                                        className="flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
                                    >
                                        <Label className="cursor-pointer w-full">{cat}</Label>
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* Cuisine Type Select Dropdown */}
                <div className="flex flex-col gap-1.5 w-full">
                    <Select
                        selectedKey={formData.cuisineType}
                        onSelectionChange={(key) => setFormData(prev => ({ ...prev, cuisineType: key }))}
                    >
                        <Label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 px-1">Cuisine Type</Label>
                        <Select.Trigger className="w-full min-h-12 border border-default rounded-xl px-3 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 hover:bg-default/40 transition-colors focus:border-primary">
                            <Select.Value className="text-sm text-foreground">
                                {formData.cuisineType || "Select cuisine origin"}
                            </Select.Value>
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-white dark:bg-zinc-950 border border-default rounded-xl shadow-xl p-1 min-w-[240px] z-50">
                            <ListBox className="gap-0.5 flex flex-col">
                                {cuisines.map((cui) => (
                                    <ListBox.Item
                                        key={cui}
                                        id={cui}
                                        textValue={cui}
                                        className="flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
                                    >
                                        <Label className="cursor-pointer w-full">{cui}</Label>
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* Difficulty Level Select Dropdown */}
                <div className="flex flex-col gap-1.5 w-full md:col-span-2">
                    <Select
                        selectedKey={formData.difficultyLevel}
                        onSelectionChange={(key) => setFormData(prev => ({ ...prev, difficultyLevel: key }))}
                    >
                        <Label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 px-1">Difficulty Level</Label>
                        <Select.Trigger className="w-full min-h-12 border border-default rounded-xl px-3 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 hover:bg-default/40 transition-colors focus:border-primary">
                            <Select.Value className="text-sm text-foreground">
                                {formData.difficultyLevel}
                            </Select.Value>
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-white dark:bg-zinc-950 border border-default rounded-xl shadow-xl p-1 min-w-[240px] z-50">
                            <ListBox className="gap-0.5 flex flex-col">
                                {difficulties.map((diff) => (
                                    <ListBox.Item
                                        key={diff}
                                        id={diff}
                                        textValue={diff}
                                        className="flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
                                    >
                                        <Label className="cursor-pointer w-full">{diff}</Label>
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>
            </div>

            {/* Interactive Listing Arrays */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Ingredients List */}
                <div className="p-5 border border-default rounded-2xl bg-white dark:bg-zinc-900 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Ingredients List</h3>
                        <Button size="sm" variant="flat" startContent={<Plus className="size-4" />} onClick={() => addArrayField('ingredients')}>Add Item</Button>
                    </div>
                    <div className="space-y-2">
                        {formData.ingredients.map((ingredient, i) => (
                            <div key={i} className="flex gap-2 items-center w-full">
                                <TextField className="w-full">
                                    <Input
                                        placeholder={`Ingredient #${i + 1}`}
                                        value={ingredient}
                                        onChange={(e) => handleArrayChange(i, e.target.value, 'ingredients')}
                                        className="w-full min-h-10 border border-default rounded-xl px-3 flex items-center bg-zinc-50 dark:bg-zinc-900/50 text-sm outline-none"
                                    />
                                </TextField>
                                <Button isIconOnly size="sm" variant="light" color="danger" onClick={() => removeArrayField(i, 'ingredients')} isDisabled={formData.ingredients.length <= 1}>
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Instructions List */}
                <div className="p-5 border border-default rounded-2xl bg-white dark:bg-zinc-900 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Instructions Sequence</h3>
                        <Button size="sm" variant="flat" startContent={<Plus className="size-4" />} onClick={() => addArrayField('instructions')}>Add Step</Button>
                    </div>
                    <div className="space-y-2">
                        {formData.instructions.map((step, i) => (
                            <div key={i} className="flex gap-2 items-start w-full">
                                <span className="text-xs font-bold text-zinc-400 mt-3 shrink-0 w-5">{i + 1}.</span>
                                <TextField className="w-full">
                                    <textarea
                                        rows={2}
                                        placeholder="Describe instructions action step details..."
                                        value={step}
                                        onChange={(e) => handleArrayChange(i, e.target.value, 'instructions')}
                                        className="w-full border border-default rounded-xl p-3 bg-zinc-50 dark:bg-zinc-900/50 text-sm outline-none resize-none focus:border-primary transition-colors"
                                    />
                                </TextField>
                                <Button isIconOnly size="sm" variant="light" color="danger" className="mt-1" onClick={() => removeArrayField(i, 'instructions')} isDisabled={formData.instructions.length <= 1}>
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Description Input */}
            <TextField isInvalid={!!errors.description} className="flex flex-col gap-1.5 w-full">
                <Label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 px-1">Description</Label>
                <TextArea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Briefly describe what makes this recipe special..."
                    rows={3}
                    className="w-full min-h-24 border border-default rounded-xl p-3 flex items-center bg-zinc-50 dark:bg-zinc-900/50 transition-colors focus:border-primary outline-none text-sm text-foreground resize-none"
                />
                <Description className="text-xs text-zinc-400 dark:text-zinc-500 px-1">Give your dish an attractive summary description.</Description>
                {errors.description && <FieldError className="text-xs text-danger px-1">{errors.description}</FieldError>}
            </TextField>
            {/* Submission Trigger */}
            <div className="flex justify-end pt-4 border-t border-default">
                <Button type="submit" color="primary" className="font-semibold" isLoading={isSubmitting} startContent={!isSubmitting && <ChefHat className="size-4" />}>
                    Deploy Recipe to Database
                </Button>
            </div>
        </form>
    );
}