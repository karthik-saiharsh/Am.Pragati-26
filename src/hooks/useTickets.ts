"use client";

import { useQuery } from "@tanstack/react-query";
import { ProfileService } from "@/services/ProfileService";
import type { Ticket } from "@/types/ticketTypes";

export function useTickets() {
	return useQuery<Ticket[], Error>({
		queryKey: ["tickets"],
		queryFn: ProfileService.getTickets,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
}
