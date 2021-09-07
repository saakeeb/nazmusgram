import { useState, useEffect } from "react";
import {projectStorage, projectFirestore, timestamp} from "../Firebase/config";

const useStorage = (file) =>{
    const [progress, setProgress] = useState(0);
    const [error, setEroor] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() =>{
        //refarence
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFirestore.collection('images');

        storageRef.put(file).on('stage_changed', (snap)=>{
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage); 
        }, (err)=>{
            setEroor(err);
        }, async () =>{
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({url, createdAt});
            setUrl(url);
        });
    }, [file]);

    return {progress, error, url};

}

export default useStorage;