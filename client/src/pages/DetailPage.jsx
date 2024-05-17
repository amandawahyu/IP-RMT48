import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DetailPage() {
    const params = useParams();
    const [dataDetail, setDataDetail] = useState({});
    const location = useLocation();

    async function fetchManhwaAndMangaById() {
        try {
            // * hit API
            let { data } = await axios({
                method: "get",
                url: import.meta.env.VITE_API_URL + "/manhwasAndMangas/" + params.id,

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(data, "<<<data");
            setDataDetail(data);
        } catch (error) {
            console.log(error);
            showToast(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchManhwaAndMangaById();
    }, []);
    console.log(dataDetail, "<- dari data detail")
    return (
        <>
            <section id="detail">
                <div className="container my-5">
                    <div className="card p-4">
                        <h4>Detail Manhwa Or Manga</h4>
                        <div className="d-flex gap-4">
                            <div>
                                <h3>Title : {dataDetail?.data?.attributes?.title?.en}</h3>
                                <h5>Last Volume : {dataDetail.lastVolume}</h5>
                                <br />
                                <p>Last Chapter : {dataDetail.lastChapter}</p>
                                <p>Description : {dataDetail.description} </p>
                            </div>
                        </div>
                    </div>
                    <Link
                        className="btn btn-outline-warning mt-2 me-2"
                        to={"/"}
                    >
                        Back
                    </Link>
                </div>
            </section>
        </>
    );
}
