// Styles
import styles from "./styles.module.css";

import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import Swiper Navigation
import { Navigation } from 'swiper/modules';

import { Button } from '@mui/material';
import { getAllCompetitions } from "../../api/comp/competitions/getAllCompetitions";

const HeroSlider = () => {
    const swiperRef = useRef(null);

    const [disableArrows, setDisableArrows] = useState({
        left: false,
        right: false,
    });

    const handleNextSlides = () => {
        if(swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const handlePrevSlides = () => {
        if(swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    const setArrowDisability = () => {
        if (swiperRef.current) {
            const { isBeginning, isEnd } = swiperRef.current;

            setDisableArrows({
                left: isBeginning,
                right: isEnd,
            });
        }
    };

    const [comps, setComps] = useState([]);

    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const fetchComps = async () => {
            try {
                const response = await getAllCompetitions(limit);
                const data = response.data;
                setComps(data);
            } catch (error) {
                console.error("Error fetching comps: ", error);
            }
        }

        fetchComps();
    }, [limit]);

    return (
        <>
        {comps?.length > 0 && (
            <>
            <Swiper
                className={styles.swiper}
                onSlideChange={setArrowDisability}
                onTransitionEnd={setArrowDisability}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setArrowDisability();
                }}
            >
                {comps.map((comp, index) => (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                        <h2>{comp.title}</h2>
                        <p>{comp.description}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Button className={`swiper-button-prev ${styles.swiperButtonPrev}`} onClick={handlePrevSlides} disabled={disableArrows.left}></Button>
            <Button className={`swiper-button-next ${styles.swiperButtonNext}`} onClick={handleNextSlides} disabled={disableArrows.right}></Button>
            </>
        )}
        </>
    );
}

export default HeroSlider;
