import { ChevronLeft, ChevronRight } from "lucide-react";
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

// Generates a pseudo-random barcode visual seeded from a string
function Barcode({ id }: { id: string }) {
	const bars: number[] = [];
	let seed = 0;
	for (let i = 0; i < id.length; i++) seed += id.charCodeAt(i);
	for (let i = 0; i < 48; i++) {
		seed = (seed * 1664525 + 1013904223) & 0x7fffffff;
		bars.push(seed % 4);
	}

	return (
		<div className="flex items-stretch gap-px h-14">
			{bars.map((width, i) => {
				if (width === 0) return <div key={i} className="w-1" />;
				const barWidth = width === 1 ? "w-0.5" : width === 2 ? "w-1" : "w-1.5";
				return <div key={i} className={`${barWidth} bg-[#a855f7] rounded-sm opacity-90`} />;
			})}
		</div>
	);
}

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
				<div className="bg-black/60 backdrop-blur-sm border border-retro-cyan/30 rounded-lg p-8 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
					<div className="text-center text-white/50">
						<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black/40 border border-[#a855f7]/30 flex items-center justify-center">
							<svg className="w-8 h-8 text-[#a855f7]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12V8a2 2 0 00-2-2H4a2 2 0 00-2 2v1a2 2 0 012 2v1a2 2 0 01-2 2v1a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2zM16 12a1 1 0 11-2 0 1 1 0 012 0zM16 16a1 1 0 11-2 0 1 1 0 012 0z" />
							</svg>
						</div>
						<h3 className="text-xl font-bold text-retro-cyan mb-2 font-vcr tracking-wider">NO TICKETS FOUND</h3>
						<p className="font-vcr text-sm">You haven't registered for any events yet.</p>
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
	const ticketNumber = String(currentIndex + 1).padStart(8, "0");

	return (
		<div className="max-w-3xl mx-auto px-4">
			{/* Title */}
			<h2 className="text-3xl md:text-5xl font-bold text-center mb-8 font-jersey15 text-white drop-shadow-[2px_2px_0px_#a855f7]">
				YOUR TICKETS
			</h2>

			{/* Carousel */}
			<div className="relative">
				{/* Left Arrow Wrapper */}
				<div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10">
					<button
						onClick={handlePrevious}
						disabled={data.length <= 1}
						className="w-10 h-10 md:w-12 md:h-12 bg-[#7c3aed] border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center justify-center transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] active:shadow-[2px_2px_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed group"
					>
						<ChevronLeft className="w-6 h-6 text-white" />
					</button>
				</div>

				{/* Right Arrow Wrapper */}
				<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10">
					<button
						onClick={handleNext}
						disabled={data.length <= 1}
						className="w-10 h-10 md:w-12 md:h-12 bg-[#7c3aed] border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center justify-center transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] active:shadow-[2px_2px_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed group"
					>
						<ChevronRight className="w-6 h-6 text-white" />
					</button>
				</div>

				{/* ========== TICKET CARD ========== */}
				{/* Wrapped in the new container style but kept minimal padding to let ticket shine */}
				<div className="bg-black/60 backdrop-blur-sm border border-retro-cyan/30 rounded-lg p-6 md:p-8 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
					<div className="relative rounded-xl overflow-visible">
						{/* Outer shadow & border for ticket itself */}
						<div className="relative rounded-xl overflow-hidden shadow-2xl shadow-[#a855f7]/20 border border-[#a855f7]/40">

							{/* ---- HEADER BAR ---- */}
							<div className="relative bg-[#1a0033] px-6 py-4 flex items-center justify-between border-b border-[#a855f7]/20">
								{/* Event name */}
								<h3 className="text-base md:text-xl font-bold text-white font-vcr uppercase tracking-widest truncate mr-4">
									{currentTicket.event_name}
								</h3>

								{/* Registered badge */}
								<div className="px-3 py-1 bg-[#16a34a] border border-black shadow-[2px_2px_0_rgba(0,0,0,1)] flex-shrink-0">
									<span className="text-white font-bold font-vcr text-xs tracking-widest uppercase">
										Registered
									</span>
								</div>
							</div>

							{/* ---- PUNCH NOTCHES (semicircles on left & right between header and body) ---- */}
							<div className="relative bg-[#1a0033]">
								{/* Left notch */}
								<div
									className="absolute -left-3 -top-3 w-6 h-6 rounded-full z-10 bg-black/80"
									style={{
										boxShadow: "inset 2px 0 4px rgba(0,0,0,0.5)",
									}}
								></div>
								{/* Right notch */}
								<div
									className="absolute -right-3 -top-3 w-6 h-6 rounded-full z-10 bg-black/80"
									style={{
										boxShadow: "inset -2px 0 4px rgba(0,0,0,0.5)",
									}}
								></div>
								
								{/* Divider Line */}
								<div className="border-t-2 border-dashed border-[#a855f7]/30 mx-4"></div>
							</div>

							{/* ---- BODY ---- */}
							<div className="bg-[#0f001f]/95 px-6 py-4">

								{/* DATE row */}
								<div className="flex items-center py-3">
									<span className="text-retro-cyan/70 font-vcr text-xs uppercase tracking-widest min-w-[80px]">
										Date:
									</span>
									<span className="text-white font-vcr text-sm md:text-base font-bold">
										{currentTicket.event_date}
									</span>
								</div>

								{/* TIME row */}
								<div className="flex items-center py-3 border-t border-dashed border-[#a855f7]/20">
									<span className="text-retro-cyan/70 font-vcr text-xs uppercase tracking-widest min-w-[80px]">
										Time:
									</span>
									<span className="text-white font-vcr text-sm md:text-base font-bold">
										{currentTicket.event_time}
									</span>
								</div>

								{/* VENUE row */}
								<div className="flex items-center py-3 border-t border-dashed border-[#a855f7]/20">
									<span className="text-retro-cyan/70 font-vcr text-xs uppercase tracking-widest min-w-[80px]">
										Venue:
									</span>
									<span className="text-white font-vcr text-sm md:text-base">
										{currentTicket.venue}
									</span>
								</div>

								{/* TICKET NO + BARCODE row */}
								<div className="flex items-end justify-between py-4 mt-2 gap-4 border-t-2 border-white/10">
									<div>
										<span className="text-white/40 font-vcr text-[0.6rem] uppercase tracking-widest block mb-1">
											Ticket No.
										</span>
										<span className="text-retro-cyan font-vcr text-sm md:text-lg tracking-widest">{ticketNumber}</span>
									</div>
									<div className="opacity-70">
                                        <Barcode id={currentTicket.event_id + ticketNumber} />
                                    </div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* ========== END TICKET CARD ========== */}

				{/* Counter & Dots */}
				<div className="text-center mt-6">
					<p className="text-retro-cyan text-sm font-vcr mb-3">
						Ticket <span className="text-white">{currentIndex + 1}</span> of{" "}
						<span className="text-white">{data.length}</span>
					</p>
					<div className="flex justify-center gap-2">
						{data.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`h-2 rounded-none transition-all duration-300 ${
									index === currentIndex
										? "bg-[#a855f7] w-8 border border-black shadow-[1px_1px_0_#fff]"
										: "bg-white/20 w-2 hover:bg-white/40"
								}`}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}