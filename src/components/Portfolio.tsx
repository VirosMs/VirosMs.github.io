
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const projects = [
  {
    img: "/images/restaurantChallenge.png",
    title: "Sistema de Reservas",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 px-[4%] lg:px-[8%]">
      <h2 className="text-4xl font-bold text-center mb-12 text-dark-green dark:text-light-green">MIS <span className="text-mint-2">PROYECTOS.</span></h2>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="max-w-xl mx-auto"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="bg-midnight-blue p-5 rounded-2xl shadow-lg flex flex-col items-center justify-center">
              <div className="relative w-full h-64 flex items-center justify-center">
                <img src={project.img} alt={project.title} className="max-w-full max-h-full object-contain"/>
                <div className="absolute bottom-4 bg-black/50 p-2 rounded">
                  <h3 className="text-white text-center font-bold text-lg">{project.title}</h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Portfolio;
