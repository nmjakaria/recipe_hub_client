"use client";

import React, { useState } from 'react';
import { AlertDialog, Button, toast } from '@heroui/react';
import { Trash2 } from 'lucide-react';
import { deleteRecipe } from '@/lib/actions/recipe';

export default function DeleteRecipeModal({ recipe, onDeleteSuccess }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const recipeId = recipe._id || recipe.id;

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await deleteRecipe(recipeId);

            if (res?.success) {
                onDeleteSuccess(recipeId);
                toast.success("Recipe deleted cleanly from database blocks.");
            } else {
                toast.error(res?.error || "Failed to remove the target system recipe.");
            }
        } catch (err) {
            console.error("Error removing structural recipe blueprint:", err);
            toast.error(err.message || "An unexpected context exception occurred.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div>
            <AlertDialog>
                <Button
                    isIconOnly size="sm" 

                    color="danger" 
                    className="rounded-xl w-9 h-9 bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-200 transition-all text-slate-600 hover:text-rose-600"
                >
                    <Trash2 size={16} />
                </Button>

                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-md">
                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Delete System Recipe?</AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                <p>
                                    Are you sure you want to delete <strong>{recipe.recipeName || "this recipe"}</strong>? As an Administrator, this deletes the artifact globally across all application layers. This action is terminal.
                                </p>
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button
                                    slot="close"
                                    variant="light"
                                    className="rounded-xl font-medium"
                                    isDisabled={isDeleting}
                                >
                                    Cancel Operations
                                </Button>
                                <Button
                                    onClick={handleDelete}
                                    slot={isDeleting ? undefined : "close"}
                                    variant="solid"
                                    color="danger"
                                    className="rounded-xl font-bold"
                                    isLoading={isDeleting}
                                >
                                    {isDeleting ? "Purging Record..." : "Confirm Deletion"}
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
}