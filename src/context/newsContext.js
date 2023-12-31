import { createContext, useContext, useEffect, useState } from "react";
import { NEWS_API_KEY } from "../constant/apiKey";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firestore";
import { useAuth } from "./authContext";
import { toast } from "react-toastify";

const newsContext = createContext();

function useNewsContext(){
    const value = useContext(newsContext);
    return value;
}

const NewsContextProvider = ({ children }) => {

    const [articles, setArticles] = useState([]);
    const [favoriteArticles, setFavoriteArticles] = useState([]);
    const [gridView, setGridView] = useState(false);
    const [loading, setLoading] = useState(false);
    const [favLoading, setFavLoading] = useState(false);
    const [newsCat, setNewsCat] = useState('general');

    const { userId } = useAuth();

    useEffect(() => {
        
        setLoading(true);
        fetch(`https://gnews.io/api/v4/top-headlines?category=${newsCat}&lang=en&apikey=${NEWS_API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            setArticles(data.articles);
            setLoading(false);
        })
        .catch((err) => {
            console.log('error', err);
            const cachedNews = localStorage.getItem('cachedNews');
            if (cachedNews) {
                setArticles(JSON.parse(cachedNews));
                setLoading(false);
            }
            else {
                setLoading(false);
            }
        });

    }, [newsCat]);

    useEffect(() => {
        setFavLoading(true);
        if(userId){
            onSnapshot(collection(db, `favorites/${userId}/myFavorites`), (snapshot) => {
                const articlesFromDB = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });
    
                // Sorting the images on the basis of the added time
                const sortedArticles = [...articlesFromDB].sort((a, b) => {
                    return new Date(b.addedAt) - new Date(a.addedAt);
                });
    
                setFavoriteArticles(sortedArticles);
                setFavLoading(false);
            });
        }
    }, [userId]);

    const addToFavorite = async (article) => {
        const articleData = {
            article,
            addedAt: Date.now()
        }

        await addDoc(collection(db, `favorites/${userId}/myFavorites`), articleData);
        toast('News Added Successfully');
    }

    const removeFromFavorite = async (id) => {
        await deleteDoc(doc(db, `favorites/${userId}/myFavorites`, id));
        toast('News removed Successfully');
    }

    const toggleNewsView = () => {
        setGridView(!gridView);
    }


    return (
        <newsContext.Provider value={{ articles, addToFavorite, favoriteArticles, removeFromFavorite, toggleNewsView, gridView, loading, favLoading, toast, setNewsCat, newsCat }}>
            {children}
        </newsContext.Provider>
    )

}

export { useNewsContext, NewsContextProvider }