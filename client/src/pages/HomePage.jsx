import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { Link } from "react-router-dom";
// import dataMangas from "../data/mangas.json";

export default function HomePage() {
    const [manhwasAndMangas, setmanhwasAndMangas] = useState([]);

    const fetchData = async () => {
        try {
            // * hit API
            const { data } = await axios({
                method: "get",
                url: import.meta.env.VITE_API_URL + "/manhwasAndMangas/",
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem("token")}`,
                // },
            });

            // console.log(dataMangas, "mangas");
            console.log(data, "manhwasAndMangas");

            // setMangas(dataMangas);
            setmanhwasAndMangas(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="container my-5">
                {/* <h2 className="text-center my-5">Club</h2> */}
                <div className="row row-cols-4 g-3">
                    {manhwasAndMangas &&
                        manhwasAndMangas.map((e) => {
                            return <Card e={e} key={e.myManhwaAndMangaId} />;
                        })}
                </div>
            </div>
        </>
    );
}

// export default HomePage;
