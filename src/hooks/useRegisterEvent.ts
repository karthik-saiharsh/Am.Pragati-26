"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventService } from "@/services/EventService";

export function useRegisterEvent(eventId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => EventService.registerForEvent(eventId),
		onSuccess: (data) => {
			if (data.checkout_url) {
				window.location.href = data.checkout_url;
			}
			// Invalidate event query to refetch registration status
			queryClient.invalidateQueries({ queryKey: ["event", eventId] });
		},
	});
}
