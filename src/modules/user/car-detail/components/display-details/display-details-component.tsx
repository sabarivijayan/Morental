"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./display-details-component.module.css"; // Import the CSS Module for layout

const carData = {
  name: "Nissan GT - R",
  price: "80.00",
  discountPrice: "100.00",
  description:
    "NISMO has become the embodiment of Nissan's outstanding performance, inspired by the most unforgiving proving ground, the 'race track'.",
  type: "Sport",
  steering: "Manual",
  capacity: "2 Person",
  gasoline: "70L",
  rating: 4.5,
  reviewsCount: 440,
  images: [
    { id: "1", url: "/images/View.svg" },
    { id: "2", url: "/images/View 2.svg" },
    { id: "3", url: "/images/View 3.svg" },
  ],
};

const CarDetailsComponents: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    carData.images[0].url
  );

  return (
    <div className={styles.carPageContainer}>
      {/* Car Images Section */}
      <section className={styles.carImagesSection}>
        {/* Main Image */}
        <div className={styles.mainImage}>
          <Image
            src={selectedImage || carData.images[0].url}
            alt={carData.name}
            width={500}
            height={300}
          />
        </div>

        {/* Thumbnail Images */}
        <div className={styles.thumbnailImages}>
          {carData.images.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image.url)}
              className={`${styles.thumbnail} ${
                selectedImage === image.url ? styles.selectedThumbnail : ""
              }`}
            >
              <Image
                src={image.url}
                alt={carData.name}
                width={100}
                height={60}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Car Details Section */}
      <section className={styles.carDetailsSection}>
        <h2 className={styles.carName}>{carData.name}</h2>

        {/* Star Rating and Reviews */}
        <div className={styles.carReviews}>
          <span className={styles.rating}>★★★★☆</span>
          <span className={styles.reviewsCount}>
            {carData.reviewsCount} Reviewer
          </span>
        </div>

        <p className={styles.carDescription}>{carData.description}</p>

        {/* Car Specs */}
        <div className={styles.carSpecs}>
          <p>
            <strong>Type Car:</strong> {carData.type}
          </p>
          <p>
            <strong>Capacity:</strong> {carData.capacity}
          </p>
          <p>
            <strong>Steering:</strong> {carData.steering}
          </p>
          <p>
            <strong>Gasoline:</strong> {carData.gasoline}
          </p>
        </div>

        {/* Price Section */}
        <div className={styles.carPrice}>
          <span className={styles.discountedPrice}>${carData.price}/days</span>
          <span className={styles.originalPrice}>${carData.discountPrice}</span>
        </div>

        {/* Rent Button */}
        <button className={styles.rentNowBtn}>Rent Now</button>
      </section>
    </div>
  );
};

export default CarDetailsComponents;
