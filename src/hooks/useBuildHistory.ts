import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/config/aws';
import { BuildHistory } from '@/types/database';

export const useBuildHistory = () => {
  const { data: builds = [], isLoading, error } = useQuery<BuildHistory[]>({
    queryKey: ['buildHistory'],
    queryFn: async () => {
      // This will call your AWS API Gateway endpoint for build history
      const response = await apiClient.request<{ builds: BuildHistory[] }>('/builds');
      return response.builds;
    },
  });

  return {
    builds,
    isLoading,
    error,
  };
};
