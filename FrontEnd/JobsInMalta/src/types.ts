export type SalaryData = {
    type: 'range' | 'single';
    min?: number;
    max?: number;
    value?: number;
} | null;

