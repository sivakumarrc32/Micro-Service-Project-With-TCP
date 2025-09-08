import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = process.hrtime.bigint(); // high-precision start time (nanoseconds)
    const req = context.switchToHttp().getRequest();

    console.log(
      `[API] Request for ${req.method} ${req.url} received at ${Number(start) / 1_000_000} ms`,
    );

    return next.handle().pipe(
      tap(() => {
        const end = process.hrtime.bigint(); // high-precision end time (nanoseconds)
        const totalTime = Number(end - start) / 1_000_000; // convert to milliseconds

        console.log(
          `[API] Response for ${req.method} ${req.url} sent at ${Number(end) / 1_000_000} ms`,
        );
        console.log(`[API] Total time: ${totalTime.toFixed(3)} ms`);
      }),
    );
  }
}
