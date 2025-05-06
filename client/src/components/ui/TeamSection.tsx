// TeamSection.tsx or in your component file
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function TeamSection() {
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

        <div className="px-4 md:px-12 lg:px-20">
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            autoplay={{ delay: 2500 }}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {/* Team Member 1 */}
            <SwiperSlide>
              <div className="mx-auto max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/images/team1.jpg"
                  alt="Hamza Shah"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-left">
                  <h3 className="text-xl font-bold text-gray-800">Hamza Shah</h3>
                  <p className="text-gray-500">AI/Back-end Development</p>
                </div>
              </div>
            </SwiperSlide>

            {/* Team Member 2 */}
            <SwiperSlide>
              <div className="mx-auto max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/images/team2.jpg"
                  alt="Muhammad Talha"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-left">
                  <h3 className="text-xl font-bold text-gray-800">Muhammad Talha</h3>
                  <p className="text-gray-500">Front-end and Design Management</p>
                </div>
              </div>
            </SwiperSlide>

            {/* Team Member 3 */}
            <SwiperSlide>
              <div className="mx-auto max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/images/team3.jpg"
                  alt="Kumail Raza Kazmi"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-left">
                  <h3 className="text-xl font-bold text-gray-800">
                    Kumail Raza Kazmi
                  </h3>
                  <p className="text-gray-500">APIs/Routes Implementation</p>
                </div>
              </div>
            </SwiperSlide>

            {/* Team Member 4 */}
            <SwiperSlide>
              <div className="max-auto max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/images/team4.jpg"
                  alt="Wahab Ul Hassan"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-left">
                  <h3 className="text-xl font-bold text-gray-800">Wahab Ul Hassan</h3>
                  <p className="text-gray-500">Database and Storage Management</p>
                </div>
              </div>
            </SwiperSlide>

            {/* Team Member 5 */}
            <SwiperSlide>
              <div className="mx-auto max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/images/team5.jpg"
                  alt="Raja Hammad Ali"
                  className="w-full h-64 object-cover"
                />
              <div className="p-4 text-left overflow-hidden">
                <h3 className="text-xl font-bold text-gray-800">Raja Hammad Ali</h3>
                <p className="text-gray-500 line-clamp-2 overflow-hidden">
                  Front-end Implementation
                </p>
              </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <style>{`
        .swiper-pagination {
          bottom: -5px !important;
          margin-top: 0 !important;
        }
        .swiper-pagination-bullet-active {
          background-color: #22c55e !important; /* Tailwind green-500 */
        }
        .swiper {
          padding-bottom: 3rem !important;
        }
      `}</style>
    </>
  );
}
