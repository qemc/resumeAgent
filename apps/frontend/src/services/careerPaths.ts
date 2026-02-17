import { api } from './api';
import type { ResumeLang, CareerPath } from '@/types';


export const getCareerPaths = async (lang: ResumeLang): Promise<CareerPath[]> => {
    const response = await api.get<CareerPath[]>(`/career-paths/${lang}`);
    return response.data;
};

export const getCareerPath = async (id: number): Promise<CareerPath> => {
    const response = await api.get<CareerPath>(`/career-path/${id}`);
    return response.data;
};

export const createCareerPath = async (data: {
    resume_lang: ResumeLang;
    name: string;
    description: string;
}): Promise<CareerPath> => {
    const response = await api.post<CareerPath>('/career-paths', data);
    return response.data;
};

export const updateCareerPath = async (
    id: number,
    data: { name?: string; description?: string }
): Promise<CareerPath> => {
    const response = await api.patch<CareerPath>(`/career-paths/${id}`, data);
    return response.data;
};

export const deleteCareerPath = async (id: number): Promise<void> => {
    await api.delete(`/career-paths/${id}`);
};
