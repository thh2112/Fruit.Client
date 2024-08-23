/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

class CustomError extends Error {
  status: number;

  constructor(
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    status: number = StatusCodes.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.status = status;
  }

  send(): NextResponse {
    return NextResponse.json(
      {
        success: false,
        errorMessage: this.message,
        data: null,
      },
      { status: this.status },
    );
  }
}

class NotFoundError extends CustomError {
  constructor(message: string = ReasonPhrases.NOT_FOUND) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

class BadRequestError extends CustomError {
  constructor(message: string = ReasonPhrases.BAD_REQUEST) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export { BadRequestError, CustomError, NotFoundError };
