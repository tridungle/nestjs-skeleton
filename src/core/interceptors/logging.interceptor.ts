import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

/**
 * Each interceptor implements the intercept() method. This method takes two arguments.
 * The first argument is the ExecutionContext. This is inherited from the ArgumentsHost.
 * The second argument is an instance of CallHandler.
 * ExecutionContext derives several helper methods from ArgumentsHost.
 * Basically, this allows us to build more generic interceptor.
 * On the other hand, CallHandler implements the handle() method.
 * Basically, this method can be used to invoke the route handler.
 * In other words, if we don’t call the handle() method, our request will not reach the route handler.
 * Also, handle() returns an RxJS observable. This provides a wide range of operators to manipulate the stream.
 * In the above example, we use the tap() operator.
 * This operator invokes an anonymous function that logs something upon graceful termination of the stream.
 * In other words, during the response cycle.
 * Lastly, interceptors can also inject dependencies using the constructor.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before reaching the handler');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`Response Lag...${Date.now() - now}ms`)));
  }
}
