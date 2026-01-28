import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FaultyTerminal from "./FaultyTerminal";

const aboutSections = [
	{
		title: "About ASB",
		content: `Amrita School of Business (ASB), Coimbatore is an elite management institution with a legacy of 30 years. The institution is accredited with AACSB (Association to Advance Collegiate Schools of Business), recognized to be top 5% of business schools around the world. It is also placed 26th in the NIRF Management Institution ranking (2025). With a unique blend of academic excellence and human values, ASB encapsulates in the philosophy "Education for life and Education for living". Here, students can pursue specializations in Marketing, Finance, Operations, Business Analytics, and HR. Career opportunities are plenty with the institution's strong industry ties, consistently achieving a near 100% placement. Success of ASB is reflected in our graduates who shine in pivotal roles at industry titans such as Google, Amazon, Microsoft, and EY, among other Fortune 500 giants. Beyond classroom, student-led committees and clubs, business research projects and rural out-reach initiatives shape graduates into industry ready global leaders. Backed by Principles of Responsible Management Education (PRME), ASB is also in the forefront of blending sustainability principles into modern day management competency building.`,
	},
	{
		title: "About PRAGATI",
		content: `PRAGATI is the flagship annual B-fest hosted by the students of Amrita School of Business, where theory meets practice through intense business-themed competitions across the domains of marketing, finance, HR, operations, and analytics. With PRAGATI'25 successfully amassing 400+ contestants for the prize pool of 4 Lakh Rupees, this year, PRAGATI'26 travels back to move forward. We celebrate the timeless glow of businesses that shaped our economy, under the theme - Radiance. It's a tribute to the leaders that redefined the future of India. PRAGATI isn't just a competition, it is also a networking hub. A constellation of CEOs and industry experts from in and around India visit the event, to inculcate their visionary insights and global perspectives. We take immense pride in having the global financial services leader BNY as our title sponsor, this partnership embarks a significant milestone in our journey. This is a student-executed event, every detail is a reflection of the professional learning at Amrita School of Business. Witness the perfect harmony of professional grit and retro flair, where every challenge is an opportunity to shine and every moment is a step toward your own radiance.`,
	},
	{
		title: "About Amrita Vishwa Vidyapeetham",
		content: `Amrita Vishwa Vidyapeetham is a multi-disciplinary, research-centered university that stands as a beacon of world-class education in India. Ranked as the 8 best university in India by NIRF and awarded an A++ by NAAC, Amrita is driven by the visionary guidance of its Chancellor, Sri Mata Amritanandamayi Devi (Amma). The institute is guided by the philosophy of "Education for Life and Education for Living," the university fosters a unique ecosystem where academic rigor meets compassion and social responsibility. This commitment to societal well-being is reflected in its pioneering initiatives like Live-in-Labs, Technology Business Incubator (TBI), AmritaRITE, Jivamritam, Saukhyam and many more. With over 250+ programs across 10 sprawling campuses, Amrita continues to pioneer global standards in research, innovation, and holistic development.`,
	},
];

const About = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	// Computer scale: grows from 1 to 3 as user scrolls (0% to 15% of scroll)
	const computerScale = useTransform(scrollYProgress, [0, 0.15], [1, 3]);

	// Black overlay opacity: fades in from 0 to 1 (8% to 20% of scroll)
	const blackOverlayOpacity = useTransform(scrollYProgress, [0.08, 0.2], [0, 1]);

	// Section 1 opacity and Y (About ASB) - 18% to 40%
	const section1Opacity = useTransform(scrollYProgress, [0.18, 0.25, 0.35, 0.42], [0, 1, 1, 0]);
	const section1Y = useTransform(scrollYProgress, [0.18, 0.25], [50, 0]);

	// Section 2 opacity and Y (About PRAGATI) - 40% to 65%
	const section2Opacity = useTransform(scrollYProgress, [0.40, 0.47, 0.58, 0.65], [0, 1, 1, 0]);
	const section2Y = useTransform(scrollYProgress, [0.40, 0.47], [50, 0]);

	// Section 3 opacity and Y (About Amrita) - 63% to 90%
	const section3Opacity = useTransform(scrollYProgress, [0.63, 0.70, 0.85, 0.95], [0, 1, 1, 0]);
	const section3Y = useTransform(scrollYProgress, [0.63, 0.70], [50, 0]);

	const sectionAnimations = [
		{ opacity: section1Opacity, y: section1Y },
		{ opacity: section2Opacity, y: section2Y },
		{ opacity: section3Opacity, y: section3Y },
	];

	return (
		<div ref={containerRef} className="relative h-[400vh]">
			{/* Sticky container that stays in view during scroll */}
			<div className="sticky top-0 w-screen h-screen overflow-hidden">
				{/* Background scene */}
				<section className="relative w-full h-full bg-black bg-[url(about/bg.webp)] bg-cover bg-no-repeat bg-center overflow-hidden">
					{/* Computer container with scale animation */}
					<motion.div
						className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[400px] lg:w-[1100px] origin-center"
						style={{ scale: computerScale }}
					>
						{/* Computer image */}
						<img
							src="/about/comp.webp"
							alt="Retro computer"
							className="w-full h-auto"
						/>
						{/* "About us" text on the screen */}
						<div className="absolute top-[12%] left-[15%] w-[70%] h-[40%] flex items-center justify-center">
							<span
								className="text-white text-2xl md:text-3xl lg:text-6xl font-bold tracking-wider font-jersey15"
								style={{
									textShadow:
										"-2px -2px 0px #ff0000, 2px 2px 0px #00ffff",
								}}
							>
								About Us
							</span>
						</div>
					</motion.div>

					{/* FaultyTerminal background overlay */}
					<motion.div
						className="absolute inset-0 pointer-events-none"
						style={{ opacity: blackOverlayOpacity }}
					>
						<FaultyTerminal
							scale={2.0}
							gridMul={[2, 1]}
							digitSize={2.6}
							timeScale={0.5}
							pause={false}
							scanlineIntensity={0.5}
							glitchAmount={1}
							flickerAmount={1}
							noiseAmp={1}
							chromaticAberration={0}
							dither={0}
							curvature={0.5}
							tint="#ffffff"
							mouseReact
							mouseStrength={0.5}
							pageLoadAnimation
							brightness={0.5}
							backgroundColor="#361c67"
						/>
					</motion.div>

					{/* About sections - all in the same sticky container */}
					{aboutSections.map((section, index) => (
						<motion.div
							key={section.title}
							className="absolute inset-0 flex items-center justify-center px-8 md:px-16 lg:px-32"
							style={{
								opacity: sectionAnimations[index].opacity,
								y: sectionAnimations[index].y,
							}}
						>
							<div className="max-w-4xl text-center bg-black/50 backdrop-blur-[4px] backdrop-saturate-200 rounded-3xl p-5 border border-[#00ffff]">
								<h2
									className="text-3xl text-white md:text-4xl lg:text-6xl font-bold text-green-400 mb-8 font-jersey15"
									style={{
										textShadow:
											"-2px -2px 0px #ff0000, 2px 2px 0px #00ffff",
									}}
								>
									{section.title}
								</h2>
								<p className="text-gray-300 text-balance md:text-lg lg:text-xl leading-relaxed font-jersey15">
									{section.content}
								</p>
							</div>
						</motion.div>
					))}
				</section>
			</div>
		</div>
	);
};

export default About;
