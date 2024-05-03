// Styles
import { Box } from "@mui/material";
import { getAllCompetitions } from "../../api/comp/competitions/getAllCompetitions";
import styles from "./styles.module.css";

import React, { useRef, useState, useEffect } from 'react';

const HomeCompsList = () => {

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
        <Box sx={{
        }}>
            <Box sx={{
                color: 'white'
            }}>
                {comps?.length > 0 && comps.map((comp, index) => (
                    <Box key={index} className={styles.comp}>
                        <h2>{comp.title}</h2>
                        <p>{comp.description}</p>
                    </Box>
                ))
                }
                <button onClick={() => setLimit(limit + 10)}>Show More</button>
            </Box>
        </Box>
    );
}

export default HomeCompsList;