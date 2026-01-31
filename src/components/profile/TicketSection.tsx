import { Ticket, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const mockTickets = [
	{
		event_id: "1",
		event_name: "Tech Workshop 2026",
		event_date: "2026-03-15",
		event_time: "10:00 AM",
		venue: "Main Hall, Building A",
	},
	{
		event_id: "2",
		event_name: "Coding Championship",
		event_date: "2026-03-20",
		event_time: "2:00 PM",
		venue: "Tech Center",
	},
	{
		event_id: "3",
		event_name: "AI Summit",
		event_date: "2026-03-25",
		event_time: "9:00 AM",
		venue: "Conference Hall",
	},
];

export default function TicketSection() {
	const data = mockTickets;
	const isLoading = false;
	const error = null;
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
	};

	if (isLoading) {
		return (
			<div className="text-center py-12">
				<div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#a855f7] border-t-transparent"></div>
				<p className="mt-4 text-white/70 font-vcr text-sm">Loading tickets...</p>
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className="max-w-3xl mx-auto px-4">
				<div className="bg-gradient-to-br from-black/90 via-[#0a0015]/95 to-black/90 rounded-xl border-2 border-[#a855f7]/50 shadow-2xl shadow-[#a855f7]/20 p-8">
					<div className="text-center text-white/70">
						<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#a855f7]/20 to-[#ff00ff]/20 flex items-center justify-center border-2 border-[#a855f7]/50">
							<Ticket className="w-8 h-8 text-[#a855f7]" />
						</div>
						<h3 className="text-xl font-semibold text-[#a855f7] mb-2 font-vcr">
							NO TICKETS FOUND
						</h3>
						<p className="font-vcr text-white/60 text-sm">You haven't registered for any events yet.</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-red-400 font-vcr">Unable to load Registered Events</p>
				<p className="text-white/70 text-sm mt-2 font-vcr">Please try again later</p>
			</div>
		);
	}

	const currentTicket = data[currentIndex];

	return (
		<div className="max-w-3xl mx-auto px-4">
			<h2 className="text-2xl md:text-3xl font-bold text-center mb-6 font-vcr">
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#ff00ff] to-[#00ffff]">
					YOUR TICKETS
				</span>
			</h2>

			{/* Carousel Container */}
			<div className="relative">
				{/* Navigation Buttons */}
				<button
					onClick={handlePrevious}
					className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-[#a855f7] to-[#7e22ce] border-2 border-[#a855f7] shadow-lg shadow-[#a855f7]/50 hover:shadow-[#a855f7]/70 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
					disabled={data.length <= 1}
				>
					<ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-white transition-colors" />
				</button>

				<button
					onClick={handleNext}
					className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-[#a855f7] to-[#7e22ce] border-2 border-[#a855f7] shadow-lg shadow-[#a855f7]/50 hover:shadow-[#a855f7]/70 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
					disabled={data.length <= 1}
				>
					<ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-white transition-colors" />
				</button>

				{/* Ticket Card */}
				<div className="relative bg-gradient-to-br from-black/90 via-[#0a0015]/95 to-black/90 rounded-xl border-2 border-[#a855f7]/50 shadow-xl shadow-[#a855f7]/20 overflow-hidden transition-all duration-300">
					{/* Top Neon Line */}
					<div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#a855f7] via-[#ff00ff] to-[#00ffff]"></div>

					<div className="p-6">
						<div className="flex flex-col gap-4">
							{/* Ticket Header */}
							<div className="flex items-start justify-between gap-4">
								<div className="flex-1">
									<h3 className="text-lg md:text-xl font-bold text-[#a855f7] mb-3 font-vcr">
										{currentTicket.event_name}
									</h3>
								</div>
								<div className="flex-shrink-0">
									<div className="px-4 py-2 bg-gradient-to-r from-[#00ff00]/20 to-[#00cc00]/20 border-2 border-[#00ff00]/60 rounded-lg shadow-lg shadow-[#00ff00]/30">
										<span className="text-[#00ff00] font-bold font-vcr text-xs tracking-wider">
											✓ REGISTERED
										</span>
									</div>
								</div>
							</div>

							{/* Ticket Details */}
							<div className="space-y-2 text-white/70 text-sm font-vcr">
								<p className="flex items-center gap-2">
									<span className="text-[#ff00ff]">►</span>
									<span className="text-[#a855f7]/70 min-w-[60px]">DATE:</span> 
									<span className="text-white/90">{currentTicket.event_date}</span>
								</p>
								<p className="flex items-center gap-2">
									<span className="text-[#ff00ff]">►</span>
									<span className="text-[#a855f7]/70 min-w-[60px]">TIME:</span> 
									<span className="text-white/90">{currentTicket.event_time}</span>
								</p>
								<p className="flex items-center gap-2">
									<span className="text-[#ff00ff]">►</span>
									<span className="text-[#a855f7]/70 min-w-[60px]">VENUE:</span> 
									<span className="text-white/90">{currentTicket.venue}</span>
								</p>
							</div>
						</div>
					</div>

					{/* Bottom Neon Line */}
					<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00ffff] via-[#a855f7] to-[#ff00ff]"></div>
				</div>

				{/* Ticket Counter */}
				<div className="text-center mt-4">
					<p className="text-[#a855f7] text-sm font-vcr">
						<span className="text-white/90">{currentIndex + 1}</span> / <span className="text-white/90">{data.length}</span>
					</p>
					
					{/* Dot Indicators */}
					<div className="flex justify-center gap-2 mt-3">
						{data.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`w-2 h-2 rounded-full transition-all duration-300 ${
									index === currentIndex
										? "bg-[#a855f7] w-6 shadow-lg shadow-[#a855f7]/50"
										: "bg-[#a855f7]/30 hover:bg-[#a855f7]/50"
								}`}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}