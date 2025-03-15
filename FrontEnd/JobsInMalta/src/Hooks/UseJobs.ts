import { SalaryData } from '../types';
import useData, { QueryParams } from './UseData'

export interface JobsData {
    id: number;
    title: string;
    company: string;
    description: string;
    expireDate: string;
    category: string;
    SalaryData?: SalaryData;
}

export interface JobsQuery {
    category?: string | null;
    sortBy?: string | null;
    id?: number | null;
    page?: number | null;
    limit?: number | null;
}


const useJobs = (params?: JobsQuery, deps?: any[]) => {
    const { data: jobs, error: jobsError, isLoading: isJobsLoading} = useData<JobsData>(
        '/jobs/getJobs',
        params as QueryParams,
        deps
    );
    console.log(jobs)
    return { jobs, jobsError, isJobsLoading };
}

export default useJobs


/*
DOCUMENTATION PURPOSES ONLY
-> Get all jobs
const { jobs, jobsError, isJobsLoading } = useJobs();
http://localhost:3001/jobs

-> Get single job by ID
const { jobs, jobsError, isJobsLoading } = useJobs({ jobID: 123 });
http://localhost:3001/jobs/123

-> Get jobs by category
const { jobs, jobsError, isJobsLoading } = useJobs({ category: 'frontend' });
http://localhost:3001/jobs?category=frontend

Note: When jobID is provided, category will be ignored
*/