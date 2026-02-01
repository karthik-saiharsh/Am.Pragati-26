import { createFileRoute, useNavigate } from "@tanstack/react-router";
import EventDetail from "@/components/EventDetail";
import EventDetailSkeleton from "@/components/EventDetailSkeleton";
import Navbar from "@/components/Navbar";
import { useEventById } from "@/hooks/useEventById";
import { useRegisterEvent } from "@/hooks/useRegisterEvent";
import { useStarSingleEvent } from "@/hooks/useStarSingleEvent";
import { useAuthStore } from "@/store/auth.store";

export const Route = createFileRoute("/events/$eventId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { eventId } = Route.useParams();
	const navigate = useNavigate();
	const { isAuthenticated, isHydrated } = useAuthStore();

	const {
		data: event,
		isLoading: isEventLoading,
		error,
	} = useEventById(eventId);
	const starMutation = useStarSingleEvent(eventId);
	const registerMutation = useRegisterEvent(eventId);

	const handleStarToggle = () => {
		if (!isAuthenticated) {
			navigate({ to: "/login" });
			return;
		}
		if (event) {
			starMutation.mutate(event.isStarred);
		}
	};

	const handleRegister = () => {
		if (!isAuthenticated) {
			navigate({ to: "/login" });
			return;
		}
		registerMutation.mutate();
	};

	const isLoading = isEventLoading || !isHydrated;

	if (isLoading) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen bg-linear-to-b from-[#1a0a29] via-[#1a0b2e] to-black">
					<div className="container mx-auto px-4 py-8">
						<EventDetailSkeleton />
					</div>
				</div>
			</>
		);
	}

	if (error) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen bg-linear-to-b from-[#1a0a29] via-[#1a0b2e] to-black">
					<div className="container mx-auto px-4 py-8 text-center">
						<h2 className="text-2xl text-red-500">Failed to load event</h2>
						<p className="text-red-400">{error.message}</p>
					</div>
				</div>
			</>
		);
	}

	if (!event) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen bg-linear-to-b from-[#1a0a29] via-[#1a0b2e] to-black">
					<div className="container mx-auto px-4 py-8 text-center">
						<h2 className="text-2xl text-yellow-500">Event not found</h2>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-linear-to-b from-[#000000] via-[#1a0b2e] to-black cursor-none">
				<div className="container mx-auto px-4 py-8">
					<EventDetail
						event={event}
						onStarToggle={handleStarToggle}
						onRegister={handleRegister}
						isLoggedIn={isAuthenticated}
						isStarLoading={starMutation.isPending}
						isRegisterLoading={registerMutation.isPending}
					/>
				</div>
			</div>
		</>
	);
}
