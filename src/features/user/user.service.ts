import { api } from "@/services/api";
import { z } from "zod";
import { 
    UserSchema, 
    type User,
    type CreateUserInput,
    type UpdateUserInput 
} from "./user.schema";

export const userService = {
    getById: async (id: string): Promise<User> => {
        // Uses pluralize helper: e.g., /categories/123
        const data = await api.url(`/users/${id}`).get().json();
        return UserSchema.parse(data);
    },

    getAll: async (): Promise<User[]> => {
        // Uses pluralize helper: e.g., /categories
        const data = await api.url("/users").get().json();
        return z.array(UserSchema).parse(data);
    },

    create: async (payload: CreateUserInput): Promise<User> => {
        const data = await api.url("/users").post(payload).json();
        return UserSchema.parse(data);
    },

    update: async (id: string, payload: UpdateUserInput): Promise<User> => {
        const data = await api.url(`/users/${id}`).patch(payload).json();
        return UserSchema.parse(data);
    },

    delete: async (id: string): Promise<void> => {
        await api.url(`/users/${id}`).delete().res();
    }
};