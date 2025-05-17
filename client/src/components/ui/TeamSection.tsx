import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { X, Facebook, Instagram, Linkedin } from "lucide-react";
import { useRef } from "react";

export default function TeamSection() {
  const swiperRef = useRef<any>(null);

  return (
    <>
      <section className="p-20 bg-white text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Our Team</h2>
        <div className="w-24 h-1 mx-auto bg-primary rounded mb-6"></div>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Meet the talented individuals behind our innovative solutions. Our team
          is dedicated to pushing the boundaries of technology and design to
          create exceptional experiences for our users.
        </p>

        <div
          className="px-4 md:px-12 lg:px-20 relative z-0"
          
        >
          <div 
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
          >
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={30}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="team-swiper pb-16" // Push dots down a bit
          >
            {/* Utility Component to generate cards */}
            {[
              {
                name: "Hamza Shah",
                role: "AI/Back-end Development",
                img: "/images/team1.jpg",
              },
              {
                name: "Muhammad Talha",
                role: "Front-end and Design Management",
                img: "/images/team2.jpg",
              },
              {
                name: "Raja Hammad Ali",
                role: "Front-end Development",
                img: "/images/team3.jpg",
              },
              {
                name: "Syed Kumail Raza",
                role: "Back-end APIs and Routes",
                img: "/images/team4.jpg",
              },
              {
                name: "Wahab Ul Hassan",
                role: "Database Management",
                img: "/images/team5.jpg",
              },
            ].map((member, index) => (
              <SwiperSlide key={index}>
                <div className="mx-auto max-w-sm bg-white rounded-lg shadow-lg overflow-hidden group relative">
                  <div className="relative">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {[X, Facebook, Instagram, Linkedin].map((Icon, i) => (
                        <a
                          key={i}
                          href="#"
                          className="p-2 bg-white rounded-md hover:bg-primary transition"
                        >
                          <Icon size={20} className="text-gray-800" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 text-left">
                    <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                    <p className="text-gray-500">{member.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
        </div>

        {/* Custom Pagination Styling */}
        <style>{`
          .swiper-pagination-bullets {
            bottom: 0px !important;
          }

          .swiper-pagination-bullet {
            background-color: #e2e8f0; /* gray-200 */
            opacity: 1;
            transition: background-color 0.3s ease;
          }

          .swiper-pagination-bullet-active,
          .swiper-pagination-bullet:hover {
            background-color: #22c55e; /* Tailwind green-500 as primary */
          }
        `}</style>
      </section>
    </>
  );
}
