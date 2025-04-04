export type SalaryData = {
    type: 'range' | 'single';
    min?: number;
    max?: number;
    value?: number;
} | null;

export interface Education {
    degree: string;
    school: string;
    year: string; 
    yearStarted: string;
}