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

	// Generate avatar hash
	useEffect(() => {
		sha256(avatarEmail).then(setAvatarHash);
	}, [avatarEmail]);

	const handleEditClick = () => setIsEditMode(true);

	//VALIDATE & SUBMIT FORM
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
			? "border-red-500 focus-visible:ring-red-500 bg-black/80 border-red-500/70 text-white text-sm h-8"
			: isEditMode
				? "bg-black/80 border-[#00f0ff]/70 text-white placeholder:text-white/40 hover:border-[#ff00ff]/70 focus:border-[#00f0ff] focus:ring-[#00f0ff]/30 transition-all duration-300 text-sm h-8"
				: "bg-black/60 border-[#7e22ce]/40 text-white/70 cursor-not-allowed text-sm h-8";

		return (
			<div key={field + "-group"} className="space-y-1.5 w-full">
				<label className="text-[#00f0ff] text-xs font-medium block font-vcr uppercase tracking-wider">
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
				{error && <p className="text-xs text-red-400 font-vcr">{error}</p>}
			</div>
		);
	};

	return (
		<div className="w-full mx-auto max-w-4xl px-4">
			{/* Neon Card Container - 70% size */}
			<div className="relative bg-gradient-to-br from-black/90 via-[#0a0015]/95 to-black/90 rounded-xl border-2 border-[#00f0ff]/50 shadow-2xl shadow-[#00f0ff]/20 overflow-hidden">
				{/* Top Neon Line */}
				<div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff00ff] via-[#00f0ff] to-[#ff00ff] animate-pulse"></div>

				{/* Grid Background Effect */}
				<div className="absolute inset-0 opacity-10" style={{
					backgroundImage: `
						linear-gradient(#00f0ff 1px, transparent 1px),
						linear-gradient(90deg, #00f0ff 1px, transparent 1px)
					`,
					backgroundSize: '35px 35px'
				}}></div>

				<div className="relative p-6 md:p-8">
					{/* Profile Header Section */}
					<div className="flex flex-col md:flex-row gap-6 items-start mb-6">
						{/* Avatar with Neon Glow - Smaller */}
						<div className="flex-shrink-0 mx-auto md:mx-0">
							<div className="relative group">
								{/* Outer Glow Rings */}
								<div className="absolute -inset-3 bg-gradient-to-r from-[#ff00ff] via-[#00f0ff] to-[#ff00ff] rounded-full blur-lg opacity-60 group-hover:opacity-80 animate-pulse"></div>
								<div className="absolute -inset-1.5 bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] rounded-full blur-md opacity-40"></div>
								
								{/* Avatar Container */}
								<div className="relative w-20 h-20 md:w-24 md:h-24">
									<img
										src={avatarUrl}
										alt={name}
										className="w-full h-full rounded-full border-2 border-[#00f0ff] shadow-2xl shadow-[#00f0ff]/50"
									/>
									{/* Scanline Effect */}
									<div className="absolute inset-0 rounded-full pointer-events-none" style={{
										backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.1) 2px, rgba(0, 240, 255, 0.1) 4px)'
									}}></div>
								</div>
							</div>
						</div>

						{/* User Info */}
						<div className="flex-1 text-center md:text-left">
							<h2 className="text-xl md:text-2xl font-bold mb-1.5 font-vcr">
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ff00ff] to-[#00f0ff] animate-pulse">
									{name || "USER PROFILE"}
								</span>
							</h2>
							<p className="text-[#00f0ff]/80 text-xs font-vcr tracking-widest uppercase mb-3">
								{email}
							</p>
							<div className="h-px w-full bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent"></div>
						</div>
					</div>

					{/* FORM FIELDS */}
					<div className="space-y-4">
						{/* Name Field - Full Width */}
						<div className="w-full">
							{renderInput("name")}
						</div>

						{/* Email & Phone Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-1.5 w-full">
								<label className="text-[#00f0ff] text-xs font-medium block font-vcr uppercase tracking-wider">
									Email
								</label>
								<Input
									type="email"
									value={email}
									disabled
									className="bg-black/60 border-[#7e22ce]/40 text-white/50 cursor-not-allowed text-sm h-8"
								/>
							</div>
							{renderInput("phone_number")}
						</div>

						{/* College Info Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{renderInput("college_name")}
							{renderInput("college_city")}
						</div>
					</div>

					{/* ACTION BUTTONS */}
					<div className="flex flex-wrap gap-3 justify-center mt-7 pt-6 border-t border-[#00f0ff]/20">
						<Button
							type="button"
							onClick={handleEditClick}
							disabled={isEditDisabled}
							className={cn(
								"relative px-5 py-2.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 font-vcr overflow-hidden group",
								"bg-gradient-to-r from-[#00f0ff] to-[#0080ff] hover:from-[#00f0ff] hover:to-[#00d0ff]",
								"border-2 border-[#00f0ff] shadow-lg shadow-[#00f0ff]/50 hover:shadow-[#00f0ff]/70",
								"hover:scale-105 active:scale-95",
								isEditMode ? "hidden" : "",
								isEditDisabled ? "opacity-50 cursor-not-allowed hover:scale-100" : "",
							)}
						>
							<span className="relative z-10 text-black">Edit Profile</span>
							<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
						</Button>

						<Button
							type="submit"
							onClick={handleSubmit}
							className={cn(
								"relative px-5 py-2.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 font-vcr overflow-hidden group",
								"bg-gradient-to-r from-[#00ff00] to-[#00cc00] hover:from-[#00ff00] hover:to-[#00dd00]",
								"border-2 border-[#00ff00] shadow-lg shadow-[#00ff00]/50 hover:shadow-[#00ff00]/70",
								"hover:scale-105 active:scale-95",
								!isEditMode ? "hidden" : "",
							)}
							disabled={!isDirty}
						>
							<span className="relative z-10 text-black">Save Changes</span>
							<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
						</Button>

						<Button
							type="button"
							onClick={handleCancel}
							variant="outline"
							className={cn(
								"relative px-5 py-2.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 font-vcr overflow-hidden group",
								"bg-transparent hover:bg-red-500/10",
								"border-2 border-red-500 text-red-400 hover:text-red-300",
								"shadow-lg shadow-red-500/30 hover:shadow-red-500/50",
								"hover:scale-105 active:scale-95",
								!isEditMode ? "hidden" : "",
							)}
						>
							<span className="relative z-10">Cancel</span>
						</Button>
					</div>
				</div>

				{/* Bottom Neon Line */}
				<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00f0ff] via-[#ff00ff] to-[#00f0ff] animate-pulse"></div>
			</div>
		</div>
	);
}