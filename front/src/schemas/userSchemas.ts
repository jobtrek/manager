// valibot user schema
import * as v from 'valibot';

export const UserSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  name: v.string(),
  roles: v.pipe(v.array(v.string()), v.minLength(1)),
});

export type User = v.InferOutput<typeof UserSchema>;

export const UserLoginSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.string(),
});

export type UserLoginDTO = v.InferOutput<typeof UserLoginSchema>;
