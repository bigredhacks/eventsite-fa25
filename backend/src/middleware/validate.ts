import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

/**
 * Express middleware factory that validates request data against Zod schemas.
 * On success, mutates req.params / req.body / req.query with the parsed
 * (and coerced) values so route handlers see the correct types.
 *
 * @param schema.body   - Schema to validate req.body
 * @param schema.params - Schema to validate req.params
 * @param schema.query  - Schema to validate req.query
 */
export function validate(schema: { body?: ZodType; params?: ZodType; query?: ZodType }) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: { field: string; message: string }[] = [];

    if (schema.params) {
      const result = schema.params.safeParse(req.params);
      if (!result.success) {
        errors.push(...formatErrors(result.error));
      } else {
        req.params = result.data as Record<string, string>;
      }
    }

    if (schema.body) {
      const result = schema.body.safeParse(req.body);
      if (!result.success) {
        errors.push(...formatErrors(result.error));
      } else {
        req.body = result.data;
      }
    }

    if (schema.query) {
      const result = schema.query.safeParse(req.query);
      if (!result.success) {
        errors.push(...formatErrors(result.error));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        req.query = result.data as any;
      }
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    next();
  };
}

function formatErrors(error: ZodError): { field: string; message: string }[] {
  return error.issues.map((issue) => ({
    field: issue.path.join('.') || 'body',
    message: issue.message,
  }));
}
