import { AxiosError } from 'axios';
import { CustomError } from '../../_core/error-response';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ENV } from '@/environment';
import { httpServer } from '@/libs/axios/http-server';
import { transformProject } from '@/features/task-management/services/mappers/project';

export const projectService = {
  getProjects: async (request: any) => {
    try {
      const endpoint = `${ENV.API_URL}/project`;
      const response = await httpServer.get(endpoint, {
        transformResponse: [
          (response) => {
            try {
              const { result, ...resp } = JSON.parse(response);
              if (resp.status !== StatusCodes.OK) {
                return resp;
              }

              return {
                data: transformProject(result.data),
                paging: result.pagination,
              };
            } catch (error) {
              return response;
            }
          },
        ],
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const response = error.response;
        const status = Number(response?.status) || StatusCodes.INTERNAL_SERVER_ERROR;
        const errorMessage = response?.data?.errorMessage || error.message;
        throw new CustomError(errorMessage, status);
      } else {
        throw new CustomError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
      }
    }
  },
};
