/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
//dashboard/user/edit-recipe/[recipeId]
"use client";

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import { Button, Input, Label, Description, TextArea } from '@heroui/react';
import Link from 'next/link';
import { getRecipeByRecipeId } from '@/lib/api/recipe';
import { updateRecipe } from '@/lib/actions/recipe';

export default function EditRecipePage({ params }) {
    const resolvedParams = use(params);
    const id = resolvedParams?.id || resolvedParams?.recipeId;

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    // Core Form Fields State
    const [recipeName, setRecipeName] = useState('');
    const [recipeImage, setRecipeImage] = useState('');
    const [category, setCategory] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [description, setDescription] = useState('');

    // Dynamic Array State blocks
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);

    // --- Action: Initial Data Load Hydration ---
    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            setError("Could not find a valid recipe ID parameter in your URL path routing structure.");
            return;
        }

        const loadRecipeData = async () => {
            try {
                setIsLoading(true);
                const data = await getRecipeByRecipeId(id);

                if (!data) {
                    throw new Error("The database returned an empty record for this recipe.");
                }

                setRecipeName(data.recipeName || '');
                setRecipeImage(data.recipeImage || '');
                setCategory(data.category || '');
                setCuisineType(data.cuisineType || '');
                setDifficultyLevel(data.difficultyLevel || 'Easy');
                setPreparationTime(data.preparationTime || '');
                setDescription(data.description || '');
                setIngredients(data.ingredients || []);
                setInstructions(data.instructions || []);
            } catch (err) {
                console.error("Failed to load recipe details:", err);
                setError(err.message || "Failed to load recipe information.");
            } finally {
                setIsLoading(false);
            }
        };

        loadRecipeData();
    }, [id]);

    // --- Action Helpers: Dynamic Array Controls ---
    const handleAddIngredient = () => setIngredients([...ingredients, ""]);
    const handleIngredientChange = (index, value) => {
        const updated = [...ingredients];
        updated[index] = value;
        setIngredients(updated);
    };
    const handleRemoveIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index));

    const handleAddInstruction = () => setInstructions([...instructions, ""]);
    const handleInstructionChange = (index, value) => {
        const updated = [...instructions];
        updated[index] = value;
        setInstructions(updated);
    };
    const handleRemoveInstruction = (index) => setInstructions(instructions.filter((_, i) => i !== index));

    // --- Action: Form Submission Sync ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const cleanIngredients = ingredients.filter(item => item.trim() !== "");
        const cleanInstructions = instructions.filter(item => item.trim() !== "");

        const submissionPayload = {
            recipeName,
            recipeImage,
            category,
            cuisineType,
            difficultyLevel,
            preparationTime,
            description,
            ingredients: cleanIngredients,
            instructions: cleanInstructions
        };

        try {
            await updateRecipe(id, submissionPayload);
            alert("Recipe modified successfully!");

            // Refresh first to invalidate cached layouts, then navigate back
            router.refresh();
            router.push('/dashboard/user/my-recipes');
        } catch (err) {
            console.error(err);
            alert(err.message || "Failed to sync structural form edits.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
                <Loader2 className="size-7 text-primary animate-spin" />
                <p className="text-xs font-semibold text-zinc-400">Loading recipe blueprints...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4 space-y-4">
                <p className="text-sm font-semibold text-danger">Hydration Failure</p>
                <p className="text-xs text-zinc-400 max-w-sm">{error}</p>
                <Link href="/dashboard/user/my-recipes"><Button size="sm" color="primary" ><ArrowLeft className="size-3.5" /> Return To Dashboard</Button></Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

            <div className="flex items-center gap-4 border-b border-default pb-4">
                <Link
                    href="/dashboard/user/my-recipes"
                >
                    <Button as={Link} size="sm" isIconOnly>
                        <ArrowLeft className="size-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-xl font-black tracking-tight sm:text-2xl text-foreground">Modify Creation</h1>
                    <p className="text-xs text-zinc-400 mt-0.5">Edit system values for your recipe fields.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-950 border border-default p-6 rounded-2xl shadow-sm">

                {/* Section A: Core Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium text-foreground">Recipe Name</Label>
                        <Input
                            placeholder="e.g. Szechuan Chicken"
                            variant="bordered"
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium text-foreground">Recipe Cover Image URL</Label>
                        <Input
                            placeholder="https://i.ibb.co/..."
                            variant="bordered"
                            value={recipeImage}
                            onChange={(e) => setRecipeImage(e.target.value)}
                            required
                        />
                    </div>

                    {/* ✅ CONVERTED TO INPUT: Category Field */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium text-foreground">Category</Label>
                        <Input
                            placeholder="e.g. Breakfast, Lunch, Dinner, Dessert"
                            variant="bordered"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium text-foreground">Cuisine Type</Label>
                        <Input
                            placeholder="Chinese, Italian, Mexican..."
                            variant="bordered"
                            value={cuisineType}
                            onChange={(e) => setCuisineType(e.target.value)}
                            required
                        />
                    </div>

                    {/* ✅ CONVERTED TO INPUT: Difficulty Level Field */}
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium text-foreground">Difficulty Level</Label>
                        <Input
                            placeholder="e.g. Easy, Medium, Hard"
                            variant="bordered"
                            value={difficultyLevel}
                            onChange={(e) => setDifficultyLevel(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium text-foreground">Preparation Time (Minutes)</Label>
                        <Input
                            placeholder="55"
                            type="number"
                            variant="bordered"
                            value={preparationTime}
                            onChange={(e) => setPreparationTime(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Brief Description Block */}
                <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium text-foreground">Brief Description</Label>
                    <TextArea
                        aria-label="Recipe Brief Description Summary Input"
                        placeholder="Provide a narrative summary..."
                        className="w-full min-h-22.5 p-3 border border-default-200 rounded-xl bg-transparent text-sm focus:outline-none focus:border-primary transition-all"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <Description className="text-zinc-400 text-xs mt-0.5">
                        Characters length: {description.length}
                    </Description>
                </div>

                <hr className="border-default" />

                {/* Section B: Ingredients Log */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-foreground">Ingredients Log</label>
                        <Button type="button" size="sm" color="primary" onClick={handleAddIngredient}>
                            <Plus className="size-3.5" /> Add Entry
                        </Button>
                    </div>

                    {ingredients.length === 0 && (
                        <p className="text-xs text-zinc-400 italic bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-xl border border-dashed border-default text-center">No lines declared. Click "Add Entry" to map ingredients strings.</p>
                    )}

                    <div className="space-y-2">
                        {ingredients.map((item, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <Input
                                    aria-label={`Ingredient input entry ${index + 1}`}
                                    variant="bordered"
                                    size="sm"
                                    placeholder={`Ingredient parameter line allocation #${index + 1}`}
                                    value={item}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                    required
                                />
                                <Button size="sm" isIconOnly color="danger" onClick={() => handleRemoveIngredient(index)}>
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <hr className="border-default" />

                {/* Section C: Preparation Procedures */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-foreground">Preparation Procedures (Instructions)</label>
                        <Button type="button" size="sm" color="primary" onClick={handleAddInstruction}>
                            <Plus className="size-3.5" /> Add Step
                        </Button>
                    </div>

                    {instructions.length === 0 && (
                        <p className="text-xs text-zinc-400 italic bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-xl border border-dashed border-default text-center">No structural execution matrices written yet.</p>
                    )}

                    <div className="space-y-2">
                        {instructions.map((item, index) => (
                            <div key={index} className="flex gap-2 items-start">
                                <span className="bg-zinc-100 dark:bg-zinc-900 font-bold border border-default text-xs rounded-lg p-2.5 min-w-10 text-center mt-0.5">
                                    {index + 1}
                                </span>
                                <div className="w-full flex flex-col gap-1">
                                    <TextArea
                                        aria-label={`Instruction step ${index + 1}`}
                                        placeholder="Describe physical cooking tasks..."
                                        className="w-full p-2.5 border border-default-200 rounded-xl bg-transparent text-sm focus:outline-none focus:border-primary"
                                        value={item}
                                        onChange={(e) => handleInstructionChange(index, e.target.value)}
                                        required
                                    />
                                </div>
                                <Button size="sm" isIconOnly color="danger" className="mt-1" onClick={() => handleRemoveInstruction(index)}>
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section D: Operational Control Actions */}
                <div className="flex items-center justify-end gap-3 border-t border-default pt-4">
                    <Link href="/dashboard/user/my-recipes">
                        <Button size="sm" className="font-bold bg-danger">
                            Cancel Changes
                        </Button>
                    </Link>
                    <Button type="submit" color="primary" size="sm" className="font-bold" isLoading={isSaving} >
                        {!isSaving && <Save className="size-4" />} Save Structural Matrix
                    </Button>
                </div>
            </form>
        </div>
    );
}