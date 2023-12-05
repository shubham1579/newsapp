import { createContext, useContext, useEffect, useState } from "react";
import { NEWS_API_KEY } from "../constant/apiKey";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firestore";
import { useAuth } from "./authContext";

const newsContext = createContext();

function useNewsContext(){
    const value = useContext(newsContext);
    return value;
}

const NewsContextProvider = ({ children }) => {

    const [articles, setArticles] = useState([]);
    const [favoriteArticles, setFavoriteArticles] = useState([]);
    const [gridView, setGridView] = useState(false);

    const { userId } = useAuth();

    useEffect(() => {

        fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${NEWS_API_KEY}`)
        .then((res) => res.json())
        .then((res) => setArticles(res.articles))
        .catch((err) => console.log(err))

    }, []);

    useEffect(() => {
        if(userId){
            onSnapshot(collection(db, `favorites/${userId}/myFavorites`), (snapshot) => {
                const articlesFromDB = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });
    
                // Sorting the images on the basis of the creation time
                const sortedArticles = [...articlesFromDB].sort((a, b) => {
                    return new Date(b.addedAt) - new Date(a.addedAt);
                });
    
                setFavoriteArticles(sortedArticles);
            });
        }
    }, [userId]);

    const addToFavorite = async (article) => {
        const articleData = {
            article,
            addedAt: Date.now()
        }

        await addDoc(collection(db, `favorites/${userId}/myFavorites`), articleData);
    }

    const removeFromFavorite = async (id) => {
        await deleteDoc(doc(db, `favorites/${userId}/myFavorites`, id));
    }

    const toggleNewsView = () => {
        setGridView(!gridView);
    }


    return (
        <newsContext.Provider value={{ articles, addToFavorite, favoriteArticles, removeFromFavorite, toggleNewsView, gridView }}>
            {children}
        </newsContext.Provider>
    )

}

export { useNewsContext, NewsContextProvider }