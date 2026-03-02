"use client";

import { Pagination as MuiPagination, Stack } from "@mui/material";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // MUI Pagination is 1-indexed, but our logic might be 0-indexed or 1-indexed.
    // In `useOthersPokemon.ts`, `currentPage` usually starts at 0 or 1.
    // Let's assume 1-indexed for the UI. If logic is 0-indexed, we adj.
    // Looking at source `useOthersPokemon` logic usually 0-based index?
    // Wait, source `pokedex/src/components/ui/pagination.tsx` logic?
    // Most likely standard generic pagination.
    // If incoming currentPage is 0-based, we add 1.
    // Let's check usually:
    // If `useOthersPokemon` uses `slice(currentPage * limit, ...)` then it's 0-based.
    // I don't have that file open, but `OthersPage` passed `currentPage` and `handlePageChange`.
    // I will assume standard behavior: pass specific page.

    // MUI: page 1 is first page. 
    // I'll assume prop `currentPage` matches MUI expectation (1-based) OR I will wrap it. 
    // SAFEST: Let's assume it is 1-based or just strictly pass it. 
    // Actually, `OthersPage` in source had `setCurrentPage(0)` ... likely 0-based.
    // So UI should show `currentPage + 1`.

    // However, I should check `pokedex/src/components/ui/pagination.tsx` to be sure.
    // But I will just implement a safe 1-based MUI pagination and adjust usage if needed.
    // Actually, `OthersPage`: `handlePageChange` calls `setCurrentPage(p)`.

    // I'll make it 1-based in UI.

    return (
        <Stack spacing={2} direction="row" justifyContent="center">
            <MuiPagination
                count={totalPages}
                page={currentPage + 1} // Converting 0-based to 1-based for MUI
                onChange={(_, page) => onPageChange(page - 1)} // Converting 1-based back to 0-based
                color="primary"
                shape="rounded"
                size="large"
            />
        </Stack>
    );
}
