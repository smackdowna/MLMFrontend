import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import '../../App.css'

const Gallery = () => {
  return (
    <section className='gallery'>
      <div className="container">
        <h2 className='gallery-title'>GALLERY</h2>
        <div className="swiper-container">
          <Swiper
            slidesPerView={ 1 }
            spaceBetween={ 10 }
            pagination={ true }
            modules={ [Pagination] }
            className="mySwiper"
            breakpoints={ {
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            } }
          >
            <SwiperSlide>
              <img loading="lazy" src="/assets/images/gallery_img_1.svg" alt="gallery-thumbnail-1" />
            </SwiperSlide>
            <SwiperSlide>
              <img loading="lazy" src="/assets/images/gallery_img_2.svg" alt="gallery-thumbnail-2" />
            </SwiperSlide>
            <SwiperSlide>
              <img loading="lazy" src="/assets/images/gallery_img_3.svg" alt="gallery-thumbnail-3" />
            </SwiperSlide>
            <SwiperSlide>
              <img loading="lazy" src="/assets/images/gallery_img_4.svg" alt="gallery-thumbnail-4" />
            </SwiperSlide>
            <SwiperSlide>
              <img loading="lazy" src="/assets/images/gallery_img_5.svg" alt="gallery-thumbnail-5" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Gallery