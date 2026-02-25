import { z } from "zod";

const AddressSchema = z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({
        lat: z.string(),
        lng: z.string(),
    }),
});

const CompanySchema = z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
});

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    address: AddressSchema,
    phone: z.string(),
    website: z.string(),
    company: CompanySchema,
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = UserSchema.omit({
    id: true,
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial();

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;