
import useData, { QueryParams } from './UseData'

export interface JobsData {
    job_id: number; 
    title: string;
    company: string;
    description: string;
    expire_date: string; 
    category_name: string;
    salary_type: string;
    salary_min: number | null;
    salary_max: number | null;
    salary_single: number | null;
    created_at: string;
    owner_id: number;
}

export interface JobsQuery {
    category?: string;
    sortBy?: 'newest' | 'expiring' | 'oldest';
    id?: number;
    page?: number;
    limit?: number;
}

export interface JobsResponse {
    status: string;
    count: number;
    data: JobsData[];
    sortedBy: string;
}

const useJobs = (params?: JobsQuery, deps?: any[]) => {
    const { data, error, isLoading } = useData<JobsResponse>(
        '/jobs/getJobs',
        params as QueryParams,
        deps
    );
    
    // Extract jobs from the response data
    const jobs = data && data.length > 0 ? data[0]?.data || [] : [];
    
    return { 
        jobs, 
        jobsCount: data && data.length > 0 ? data[0]?.count : 0,
        sortedBy: data && data.length > 0 ? data[0]?.sortedBy : null,
        jobsError: error, 
        isJobsLoading: isLoading 
    };
}

export default useJobs;

/*
DOCUMENTATION:
-> Get all jobs
const { jobs, jobsCount, sortedBy, jobsError, isJobsLoading } = useJobs();

-> Get jobs with pagination
const { jobs, jobsCount, sortedBy, jobsError, isJobsLoading } = useJobs({ page: 1, limit: 10 });

-> Get jobs by category
const { jobs, jobsCount, sortedBy, jobsError, isJobsLoading } = useJobs({ category: 'frontend' });

-> Get jobs sorted by expiration
const { jobs, jobsCount, sortedBy, jobsError, isJobsLoading } = useJobs({ sortBy: 'expiring' });

-> Get single job by ID
const { jobs, jobsError, isJobsLoading } = useJobs({ id: 123 });
*/