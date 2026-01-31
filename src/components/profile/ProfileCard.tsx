import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfileStore } from "@/store/profileStore";
import type { PROFILE_CARD_PROPS } from "@/types/profileTypes";
import { cn } from "@/lib/utils";

async function sha256(message: string) {
	const msgBuffer = new TextEncoder().encode(message.trim().toLowerCase());
	const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
}

const formFields = [
	{ label: "Name", field: "name", placeholder: "Enter Name" },
	{
		label: "Phone Number",
		field: "phone_number",
		placeholder: "+91 99999 99999",
	},
	{
		label: "College Name",
		field: "college_name",
		placeholder: "Enter College Name",
	},
	{
		label: "College City",
		field: "college_city",
		placeholder: "Enter College City",
	},
] as const;

export function ProfileCard({
	avatarEmail,
	email,
	name,
	phone_number,
	college_name,
	college_city,
	register,
	reset,
	errors,
	onSubmit,
	isDirty,
}: PROFILE_CARD_PROPS) {
	const isEditMode = useProfileStore((state) => state.isEditMode);
	const setIsEditMode = useProfileStore((state) => state.setIsEditMode);
	const [isEditDisabled, setIsEditDisabled] = useState(false);
	const [avatarHash, setAvatarHash] = useState<string>("");

	useEffect(() => {
		sha256(avatarEmail).then(setAvatarHash);
	}, [avatarEmail]);

	const handleEditClick = () => setIsEditMode(true);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit();

		const hasErrors = Object.keys(errors).some((key) =>
			formFields
				.map((f) => f.field)
				.includes(key as (typeof formFields)[number]["field"]),
		);

		if (hasErrors) return setIsEditMode(true);

		setIsEditDisabled(true);
		setTimeout(() => setIsEditDisabled(false), 3000);
	};

	const handleCancel = () => {
		reset({ name, phone_number, college_name, college_city });
		setIsEditMode(false);
	};

	const avatarUrl = avatarHash
		? `https://www.gravatar.com/avatar/${avatarHash}?s=200&d=robohash`
		: `https://www.gravatar.com/avatar/${avatarEmail}?s=200&d=robohash`;

	const renderInput = (fieldName: (typeof formFields)[number]["field"]) => {
		const fieldObj = formFields.find((f) => f.field === fieldName);
		if (!fieldObj) return null;
		const { label, field, placeholder } = fieldObj;
		const error = errors?.[field];

		const inputClassName = error
			? "border-2 border-red-500 focus-visible:ring-2 focus-visible:ring-red-500 bg-[#1a0033]/80 text-white text-sm h-10 font-vcr placeholder:text-red-300/40 rounded-md"
			: isEditMode
				? "bg-[#1a0033]/80 border-2 border-[#a855f7] text-white placeholder:text-[#a855f7]/40 hover:border-[#ff00ff] focus:border-[#c084fc] focus:ring-2 focus:ring-[#a855f7]/50 transition-all duration-300 text-sm h-10 font-vcr rounded-md"
				: "bg-black/60 border-2 border-[#7e22ce]/40 text-white/50 cursor-not-allowed text-sm h-10 font-vcr rounded-md";

		return (
			<div key={field + "-group"} className="space-y-2 w-full">
				<label 
					className="text-[#a855f7] text-[10px] font-bold block uppercase tracking-[0.2em] font-vcr" 
					style={{ 
						textShadow: '0 0 10px rgba(168, 85, 247, 0.8), 0 0 20px rgba(168, 85, 247, 0.4)',
						lineHeight: '1.6'
					}}
				>
					{label}
				</label>
				<Input
					type="text"
					placeholder={placeholder}
					{...register(field)}
					disabled={!isEditMode}
					className={inputClassName}
					required
				/>
				{error && <p className="text-xs text-red-400 font-vcr mt-1">{error}</p>}
			</div>
		);
	};

	return (
		<div className="w-full mx-auto max-w-4xl px-4">
			{/* Arcade Card Container */}
			<div 
				className="relative bg-gradient-to-br from-[#1a0033] via-[#0a0015] to-black rounded-2xl border-4 border-[#A855F7] overflow-hidden"
			>
				{/* Top Neon Border */}
				<div 
					className="absolute top-0 left-0 right-0 h-1.5" 
					style={{ 
						background: 'linear-gradient(90deg, #A855F7 0%, #00ffff 50%, #ff00ff 100%)',
						boxShadow: '0 0 20px rgba(168, 85, 247, 0.9)'
					}}
				></div>

				{/* Arcade Grid Background */}
				<div className="absolute inset-0 opacity-5" style={{
					backgroundImage: `
						linear-gradient(#a855f7 2px, transparent 2px),
						linear-gradient(90deg, #a855f7 2px, transparent 2px)
					`,
					backgroundSize: '40px 40px'
				}}></div>

				{/* Scanline Effect */}
				<div className="absolute inset-0 pointer-events-none opacity-10" style={{
					backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(168, 85, 247, 0.4) 3px, rgba(168, 85, 247, 0.4) 6px)'
				}}></div>

				<div className="relative p-8 md:p-12">
					{/* Profile Header Section */}
					<div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
						{/* Avatar with Arcade Glow */}
						<div className="flex-shrink-0">
							<div className="relative group">
								{/* Avatar Container */}
								<div className="relative w-28 h-28 md:w-36 md:h-36">
									<div 
										className="absolute inset-0 rounded-full border-4 border-[#a855f7]"
									></div>
									<img
										src={avatarUrl}
										alt={name}
										className="w-full h-full rounded-full border-4 border-[#A855F7] relative z-10"
										style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.7)' }}
									/>
									{/* Scanline Effect on Avatar */}
									<div className="absolute inset-0 rounded-full pointer-events-none opacity-30 z-20" style={{
										backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(168, 85, 247, 0.4) 3px, rgba(168, 85, 247, 0.4) 6px)'
									}}></div>
								</div>
							</div>
						</div>

						{/* User Info */}
						<div className="flex-1 text-center md:text-left">
							<h2 
								className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-wider font-vcr" 
								style={{ 
									color: '#ffffff',
									textShadow: '0 0 30px rgba(168, 85, 247, 0.95), 0 0 60px rgba(168, 85, 247, 0.6), 4px 4px 0px rgba(255, 0, 255, 0.5)',
									lineHeight: '1.5',
									letterSpacing: '0.05em'
								}}
							>
								{name || "USER PROFILE"}
							</h2>
							<p 
								className="text-[#00ffff] text-xs font-vcr tracking-widest uppercase mb-4" 
								style={{ textShadow: '0 0 15px rgba(0, 255, 255, 0.9)' }}
							>
								{email}
							</p>
							<div 
								className="h-1 w-full bg-gradient-to-r from-transparent via-[#a855f7] to-transparent rounded-full" 
								style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.8)' }}
							></div>
						</div>
					</div>

					{/* FORM FIELDS - Scrollable Container */}
				<div className="max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#a855f7]/50 scrollbar-track-transparent">
					<div className="space-y-6">
						{/* Name Field - Full Width */}
						<div className="w-full">
							{renderInput("name")}
						</div>

						{/* Email & Phone Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2 w-full">
								<label 
									className="text-[#a855f7] text-[10px] font-bold block uppercase tracking-[0.2em] font-vcr" 
									style={{ 
										textShadow: '0 0 10px rgba(168, 85, 247, 0.8)',
										lineHeight: '1.6'
									}}
								>
									Email
								</label>
								<Input
									type="email"
									value={email}
									disabled
									className="bg-black/60 border-2 border-[#7e22ce]/40 text-white/50 cursor-not-allowed text-sm h-10 font-vcr rounded-md"
								/>
							</div>
							{renderInput("phone_number")}
						</div>

						{/* College Info Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{renderInput("college_name")}
							{renderInput("college_city")}
						</div>
					</div>
				</div>

					{/* ACTION BUTTONS - Arcade Style */}
					<div className="flex flex-wrap gap-4 justify-center mt-10 pt-8 border-t-2 border-[#A855F7]/30">
						<Button
							type="button"
							onClick={handleEditClick}
							disabled={isEditDisabled}
							className={cn(
								"relative px-8 py-4 font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden group border-4 rounded-lg",
								"bg-gradient-to-b from-[#A855F7] to-[#7e22ce] hover:from-[#c084fc] hover:to-[#A855F7]",
								"border-[#ff00ff] text-black",
								"hover:scale-105 active:scale-95",
								isEditMode ? "hidden" : "",
								isEditDisabled ? "opacity-50 cursor-not-allowed hover:scale-100" : "",
							)}
							style={{ 
								boxShadow: '0 0 25px rgba(168, 85, 247, 0.7), 0 5px 0 #581c87, inset 0 2px 0 rgba(255, 255, 255, 0.3)',
								textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)'
							}}
						>
							<span className="relative z-10 font-vcr text-xs">▶ EDIT</span>
							<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
						</Button>

						<Button
							type="submit"
							onClick={handleSubmit}
							className={cn(
								"relative px-8 py-4 font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden group border-4 rounded-lg",
								"bg-gradient-to-b from-[#00ff00] to-[#00cc00] hover:from-[#00ff00] hover:to-[#00dd00]",
								"border-[#00ff00] text-black",
								"hover:scale-105 active:scale-95",
								!isEditMode ? "hidden" : "",
							)}
							disabled={!isDirty}
							style={{ 
								boxShadow: '0 0 25px rgba(0, 255, 0, 0.7), 0 5px 0 #008000, inset 0 2px 0 rgba(255, 255, 255, 0.3)',
								textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)'
							}}
						>
							<span className="relative z-10 font-vcr text-xs">✓ SAVE</span>
							<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
						</Button>

						<Button
							type="button"
							onClick={handleCancel}
							variant="outline"
							className={cn(
								"relative px-8 py-4 font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden group border-4 rounded-lg",
								"bg-gradient-to-b from-[#ff4444] to-[#cc0000] hover:from-[#ff6666] hover:to-[#ff4444]",
								"border-[#ff0000] text-white",
								"hover:scale-105 active:scale-95",
								!isEditMode ? "hidden" : "",
							)}
							style={{ 
								boxShadow: '0 0 25px rgba(255, 0, 0, 0.7), 0 5px 0 #880000, inset 0 2px 0 rgba(255, 255, 255, 0.2)',
								textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)'
							}}
						>
							<span className="relative z-10 font-vcr text-xs">✕ CANCEL</span>
						</Button>
					</div>
				</div>

				{/* Bottom Neon Border */}
				<div 
					className="absolute bottom-0 left-0 right-0 h-1.5" 
					style={{ 
						background: 'linear-gradient(90deg, #ff00ff 0%, #a855f7 50%, #00ffff 100%)',
						boxShadow: '0 0 20px rgba(168, 85, 247, 0.9)'
					}}
				></div>
			</div>
		</div>
	);
}