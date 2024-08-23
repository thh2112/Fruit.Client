import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';
import { CustomError } from './error-response';

type AsyncHandler = (request: NextRequest) => Promise<any>;

const asyncHandler = (fn: AsyncHandler) => {
  return async (request: NextRequest) => {
    return Promise.resolve(fn(request)).catch((error) => {
      if (error instanceof CustomError) {
        if (error.status === StatusCodes.NOT_FOUND) {
          return NextResponse.json(
            {
              success: false,
              errorMessage: ReasonPhrases.NOT_FOUND,
              errorMessageCode: StatusCodes[StatusCodes.NOT_FOUND],
              data: null,
            },
            { status: StatusCodes.NOT_FOUND },
          );
        }

        return NextResponse.json(
          {
            success: false,
            errorMessage: error.message,
            errorMessageCode: error.errorMessageCode,
            data: null,
          },
          { status: error.status },
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            errorMessage: (error as Error)?.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
            errorMessageCode: StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR],
          },
          { status: StatusCodes.INTERNAL_SERVER_ERROR },
        );
      }
    });
  };
};

export default asyncHandler;
