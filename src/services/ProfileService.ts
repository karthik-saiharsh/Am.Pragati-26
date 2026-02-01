import { apiGet, apiPost } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import type { Schedule } from "@/types/eventTypes";
import type { Profile, UpdateProfilePayload } from "@/types/profileTypes";
import type { Ticket, TicketResponse } from "@/types/ticketTypes";

export const ProfileService = {
	getProfile: async (): Promise<Profile> => {
		const res = await apiGet<{ profile: Profile; message: string }>(
			API_ROUTES.PROFILE.GET,
		);
		return res.profile;
	},

	updateProfile: async (payload: UpdateProfilePayload): Promise<string> => {
		try {
			const csrfData = await apiGet<{ message: string; key: string }>(
				API_ROUTES.PROFILE.UPDATE,
			); // CSRF for update Profile
			const csrfToken = csrfData.key;

			const res = await apiPost<{ message: string }>(
				API_ROUTES.PROFILE.UPDATE,
				payload,
				{
					headers: {
						"X-Csrf-Token": csrfToken,
					},
				},
			);
			return res.message;
		} catch (error: any) {
			const message =
				error?.response?.data?.message ||
				error.message ||
				"edit Profile failed";
			throw new Error(message);
		}
	},

	getTickets: async (): Promise<Ticket[]> => {
		const res = await apiGet<TicketResponse>(API_ROUTES.PROFILE.TICKETS);

		const processTicket = (ticket: Ticket) => {
			const specialTag =
				ticket.tags && ticket.tags.length > 0
					? ticket.tags.find((tag) => tag.startsWith("!"))
					: undefined;

			if (specialTag) {
				return {
					...ticket,
					specialEvent: specialTag.substring(1),
				};
			}
			return ticket;
		};

		const soloTickets = (res.solo_events || []).map((ticket) => ({
			...processTicket(ticket),
			is_group: false,
		}));
		const teamTickets = (res.team_events || []).map((ticket) => ({
			...processTicket(ticket),
			is_group: true,
		}));
		const tickets: Ticket[] = [...soloTickets, ...teamTickets];

		const now = new Date();

		const getScheduleDates = (schedule: Schedule) => {
			const start = new Date(schedule.start_time);
			const end = new Date(schedule.end_time);
			return { start, end };
		};

		const processedTickets = tickets.map((ticket) => {
			const schedules = ticket.schedules || [];

			if (schedules.length === 0) {
				return { ticket, category: "unknown" };
			}

			let isUpcoming = false;
			let isInvalid = false;
			let nextStartTime: number = Infinity;

			for (const schedule of schedules) {
				const { start, end } = getScheduleDates(schedule);
				const sTime = start.getTime();
				const eTime = end.getTime();

				if (isNaN(sTime) || isNaN(eTime)) {
					isInvalid = true;
					continue;
				}

				if (end > now) {
					isUpcoming = true;
					if (sTime < nextStartTime) {
						nextStartTime = sTime;
					}
				}
			}

			if (isUpcoming) {
				return { ticket, category: "upcoming", sortTime: nextStartTime };
			}

			if (isInvalid) {
				return { ticket, category: "unknown" };
			}

			return { ticket, category: "completed" };
		});

		const upcoming = processedTickets.filter((t) => t.category === "upcoming");
		const unknown = processedTickets.filter((t) => t.category === "unknown");
		const completed = processedTickets.filter(
			(t) => t.category === "completed",
		);

		upcoming.sort((a, b) => (a.sortTime || 0) - (b.sortTime || 0));

		return [...upcoming, ...unknown, ...completed].map((t) => t.ticket);
	},
};
