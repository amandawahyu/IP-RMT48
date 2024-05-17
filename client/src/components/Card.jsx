import { useEffect, useState } from "react";
import axios from "axios";
import showToast from "../utils/toast";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Card({ e }) {
    const params = useParams();
    const navigate = useNavigate();

    const handleAddFav = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios({
                method: "post",
                url: import.meta.env.VITE_API_URL + `/manhwasAndMangas/favorites/${e.myManhwaAndMangaId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(data, "response favoriteData");
            if (data.message === "Item has added") {
                showToast("Manhwa Or Manga has added");
                return;
            }

            navigate("/favorite");
        } catch (error) {
            console.log(error);
            showToast(error.response.data.message);
        }
    };

    return (
        <>
            <div className="col">
                <div
                    className="card"
                    // onClick={<Link to={`/lodgings/${e.id}`}>Detail</Link>}
                >
                    <img
                        src={e.coverArt.url}
                        style={{
                            height: "12rem",
                            objectFit: "cover",
                        }}
                        alt=""
                    />

                    <div className="card-body ">
                        <h5 className="card-title ">{e.title}</h5>
                        <span className="fs-6"> Description : {e.description}</span>
                        <div className="d-flex align-items-center">
                            <Link
                                to={`/detail/${e.myManhwaAndMangaId}`}
                                // state={{ myanimelist_url: e.myanimelist_url }}
                                // onClick={() => {
                                //     handleAddMyClub(event);
                                // }}
                                className="btn btn-outline-dark btn-sm mt-2 me-5"
                            >
                                Detail
                            </Link>
                            <button
                                onClick={() => {
                                    if (!localStorage.token) {
                                        navigate("/login");
                                    } else {
                                        handleAddFav(event);
                                    }
                                }}
                                className="btn btn-outline-dark btn-sm mt-2 ms-4"
                            >
                                Favorite
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
