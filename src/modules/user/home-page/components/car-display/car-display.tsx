"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CarCard from "../car-display/car-card/car-card";
import styles from "./car-display.module.css";
import { cars } from "../../../../../../public/data/car-data"; // Import car data
import { useRouter } from "next/navigation";

const CarDisplay = () => {
  const router = useRouter(); // Initialize router

  const handleViewAllClick = () => {
    router.push("/all-cars"); // Redirect to the all cars page
  };
  return (
    <div className={styles.homeContainer}>
      <div className={styles.headerContainer}>
        <h2 className={styles.sectionTitle}>Popular Cars</h2>
        <div className={styles.viewAllLink} onClick={handleViewAllClick}>
          View All <span className={styles.arrow}>→</span>
        </div>
      </div>
      {/* Use SwiperJS for small screens */}
      <div className={styles.swiperContainer}>
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={16}
          slidesPerView={1}
          centeredSlides={true}
          navigation
          breakpoints={{
            // Ensure behavior below 640px
            0: {
              slidesPerView: 2, // Show 2 cards for screens smaller than 640px
              centeredSlides: false, // Avoid centered slides for better layout
            },
            640: {
              slidesPerView: 2, // Show 2 cards for small screens
              centeredSlides: false,
            },
            768: {
              slidesPerView: 2, // 2 cards for tablets
            },
            1024: {
              slidesPerView: 3, // 3 cards for desktops
            },
          }}
        >
          {cars.map((car, index) => (
            <SwiperSlide key={index}>
              <CarCard {...car} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Grid layout for larger screens */}
      <div className={styles.carGrid}>
        {cars.map((car, index) => (
          <CarCard key={index} {...car} />
        ))}
      </div>
    </div>
  );
};

export default CarDisplay;
