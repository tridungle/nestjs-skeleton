import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

/**
 * catch the error and instead throw BadGatewayException. We can use this interceptor as follows:
 * @Get('/exception-interceptor')
 * @UseInterceptors(ExceptionInterceptor)
 * getExceptionInterceptor() {
 *      return throwError(() => new BadRequestException());
 * }
 * Response:
 * {"statusCode":502,"message":"Bad Gateway"}
 */
@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(catchError(() => throwError(() => new BadGatewayException())));
  }
}
