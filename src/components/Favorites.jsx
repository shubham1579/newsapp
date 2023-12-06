import { Link, Navigate } from "react-router-dom";
import { useNewsContext } from "../context/newsContext";
import { useState } from "react";
import { FadeLoader } from "react-spinners";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { useAuth } from "../context/authContext";

const override = {
    display: "block",
    margin: "0 auto",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
};


function Favorites() {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const { favoriteArticles, removeFromFavorite, favLoading } = useNewsContext();
    const { loggedIn } = useAuth();
 
    const handleClick = (article) => {
        setIsPopupOpen(true);
        setSelectedArticle(article);
    }

    const closePopup = () => {
        setIsPopupOpen(false);
    }
    

    return (
        <>
            {!loggedIn && <Navigate to={'/'} replace={true} />}
            {favLoading ? (
                <FadeLoader cssOverride={override} color="#0080f8" />
            ) : (
                <div className="mx-auto max-w-2xl px-4 pb-10 sm:px-6 sm:py-0 md:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {favoriteArticles.map((ele, i) => (
                            <div key={i}>
                                <div className="group relative border-solid border-2 p-2 border-gray-200">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  lg:h-80 hover:opacity-75 cursor-pointer">
                                        <img
                                            src={ele.article.image}
                                            alt={ele.article.title}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700 font-semibold">
                                                {ele.article.description}
                                            </h3>
                                            {/* <p className="mt-1 text-sm text-gray-500">{ele.article.content}</p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => handleClick(ele.article)}
                                        className="rounded-md mt-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                                        >
                                        Read more
                                    </button>
                                    <button
                                        onClick={() => removeFromFavorite(ele.id)}
                                        className="rounded-md mt-2 bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 cursor-pointer"
                                        >
                                        Remove from Favorite
                                    </button>
                                </div>

                            </div>
                        ))}
                        {isPopupOpen && (
                            <>
                                <div className="fixed inset-0 bg-black bg-opacity-60 z-50"></div>
                                <div className="fixed top-1/2 left-1/2 w-[70%] sm:w-3/5 md:w-1/2 lg:w-1/2 xl:w-2/5 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 sm:p-8 rounded-md z-50">
                                    <div className="group relative border-solid border-2 p-2 border-gray-200">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 hover:opacity-75 cursor-pointer">
                                            <img
                                                src={selectedArticle.urlToImage}
                                                alt={selectedArticle.title}
                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex justify-between">
                                            <div>
                                                <h3 className="text-sm text-gray-700 font-semibold">
                                                    {selectedArticle.title}
                                                </h3>
                                                <p className="mt-1 hidden sm:block text-sm text-gray-500">{selectedArticle.content}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Link
                                                to={selectedArticle.url}
                                                target="_blank"
                                                className="rounded-md mt-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                                            >
                                                Click here
                                            </Link>
                                            <button
                                                onClick={closePopup}
                                                className="rounded-md mt-2 ml-2 bg-gray-200 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 cursor-pointer ease-in-out transition-[.4s]"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    )
}

export default Favorites;