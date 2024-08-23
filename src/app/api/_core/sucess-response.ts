import { Pagination } from '@/shared/types/api-response';
import { NextResponse } from 'next/server';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export interface SuccessResponseOption<T> {
  success?: boolean;
  errorMessage?: string;
  status?: number;
  data?: T;
  paging?: Pagination | null;
}

class SuccessResponse<T> {
  data: T | null;
  status: number;
  message: string;

  constructor({ data, status = StatusCodes.OK, errorMessage = ReasonPhrases.OK }: Partial<SuccessResponseOption<T>>) {
    this.data = data as T;
    this.status = status;
    this.message = errorMessage;
  }
  send(): NextResponse {
    return NextResponse.json({ success: true, errorMessage: '', data: this.data }, { status: this.status });
  }
}

class Ok<T> extends SuccessResponse<T> {
  constructor({ data }: SuccessResponseOption<T>) {
    super({ data });
  }
}

class OkPagination<T> extends SuccessResponse<T> {
  paging: Pagination | null;

  constructor({ data, paging = null }: SuccessResponseOption<T>) {
    super({ data });
    this.paging = paging;
  }

  send(): NextResponse {
    return NextResponse.json(
      { success: true, errorMessage: '', data: this.data, paging: this.paging },
      { status: this.status },
    );
  }
}

export { Ok, OkPagination };
