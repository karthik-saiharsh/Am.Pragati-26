import type { Schedule } from "./eventTypes";

export interface Ticket {
	event_id: string;
	event_name: string;
	schedules: Schedule[];
	is_group: boolean;
	team_name?: string;
	price: number;
	event_type: string;
	is_technical: boolean;
	event_mode: string;
	tags: string[] | null;
	specialEvent?: string;
}

export interface TicketResponse {
	solo_events: Ticket[];
	team_events: Ticket[];
}

export interface TicketListProps {
	listOftickets: Ticket[];
	userId: string;
}

export interface TicketProps {
	ticket: Ticket;
	userId: string;
}
