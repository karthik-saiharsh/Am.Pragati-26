import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
// import { getMockProfile } from '@/mocks/mockProfile';
import { ProfileService } from "@/services/ProfileService";
import { useAuthStore } from "@/store/auth.store";
import type { Profile, UpdateProfilePayload } from "@/types/profileTypes";

export function useUserProfile() {
	const email = useAuthStore((state) => state.user)?.email;
	return useQuery<Profile, Error>({
		queryKey: ["getProfile", email],
		queryFn: ProfileService.getProfile,
		// queryFn: getMockProfile,
		staleTime: 1000 * 60 * 5,
		retry: 3,
	});
}

export function useUpdateProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: UpdateProfilePayload) =>
			ProfileService.updateProfile(payload),
		onSuccess: () => {
			toast.success("Successfully Updated!");
			queryClient.invalidateQueries({ queryKey: ["getProfile"] });
		},
		onError: () => {
			toast.error("Update Failed!");
		},
	});
}
