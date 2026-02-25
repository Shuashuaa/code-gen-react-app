import useSWR from "swr";
import { userService } from "./user.service";

// Hook for a single user
export const useUser = (id: string | null) => {
    return useSWR(
        id ? ["user", id] : null,
        () => userService.getById(id!),
        { revalidateOnFocus: false }
    );
};

// Hook for the full list
export const useUsers = () => {
    return useSWR(
        "users-list",
        () => userService.getAll(),
        { revalidateOnFocus: false }
    );
};