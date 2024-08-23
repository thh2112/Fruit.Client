import asyncHandler from '../../_core/async-handler';
import { projectController } from './_controller';

export const GET = asyncHandler(projectController.getProjects);
