"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventService } from "@/services/EventService";
import type { EventDetails } from "@/types/eventTypes";

export function useStarSingleEvent(eventId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (isStarred: boolean) => {
			if (isStarred) {
				await EventService.unstarEvent(eventId);
			} else {
				await EventService.starEvent(eventId);
			}
		},
		onMutate: async (isStarred: boolean) => {
			const queryKey = ["event", eventId, true]; // Assuming authenticated user
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({ queryKey });

			// Snapshot the previous value
			const previousEvent = queryClient.getQueryData<EventDetails>(queryKey);

			// Optimistically update to the new value
			if (previousEvent) {
				queryClient.setQueryData<EventDetails>(queryKey, {
					...previousEvent,
					isStarred: !isStarred,
				});
			}

			return { previousEvent };
		},
		onError: (_err, _variables, context) => {
			if (context?.previousEvent) {
				const queryKey = ["event", eventId, true];
				queryClient.setQueryData<EventDetails>(queryKey, context.previousEvent);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["event", eventId] });
		},
	});
}
