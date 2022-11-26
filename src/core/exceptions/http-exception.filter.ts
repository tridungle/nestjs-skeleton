import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
/**
 * Let us understand what we are doing here:
 * The HttpExceptionFilter class implements the in-built ExceptionFilter interface.
 * The decorator @Catch(HttpException) signifies that this filter will catch exceptions that belong to the HttpException type.
 * This @Catch() decorator can take a single input and also a list of exceptions in a comma-separated format.
 * In other words, the same filter can handle several exception types at once.
 * As part of the interface requirements, we implement the catch() method.
 * Basically, this method takes the exception object as input along with the ArgumentsHost.
 * In the catch() method, we extract the context object from the ArgumentsHost object.
 * From this context object, we can get access to the underlying platform’s Request and Response object.
 * Basically, we need the Response object to take control of the actual response in case of an exception.
 * Next, we construct the response using response.json() method.
 * From the Request object, we also extract the request URL to include as part of our custom response.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status).json({
      statusCode: status,
      message: 'Resource not found',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
