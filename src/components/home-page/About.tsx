const About = () => {
  return (
    <section className="relative w-screen h-screen bg-black bg-[url(about/bg2.webp)] bg-cover bg-no-repeat overflow-hidden">
      <img src="about/comp.png" alt="" className="w-500 h-500 absolute left-5 -bottom-10" />
      <img height={30} src="about/cassette.webp" alt="" className="w-100 h-100 absolute bottom-20 left-30" />
      <img height={30} src="about/lava.png" alt="" className="w-200 h-200 absolute bottom-20 -left-70" />
      <img height={30} src="about/cd.webp" alt="" className="w-150 h-150 absolute -bottom-25 -left-30" />
      <img height={30} src="about/radio.webp" alt="" className="w-150 h-150 absolute bottom-20 -right-20" />
      <img height={30} src="about/soda-can.webp" alt="" className="w-100 h-100 absolute -bottom-5 right-60" />
      <img src="about/photoframe.webp" alt="" className="w-200 h-200 absolute -bottom-23 left-20" />
    </section>
  );
};

export default About;
