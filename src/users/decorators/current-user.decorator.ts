import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // this will get the underlying request into our app
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);

// not possible to use DI with a param decorator, that's why we use the interceptor
