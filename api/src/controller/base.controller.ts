export class BaseController {
  success(result?: object) {
    if (result) {
      return { code: 200, ...result };
    } else {
      return { code: 200 };
    }
  }
  error(code = 403, error = undefined) {
    return {
      code,
      ...error,
    };
  }
}
