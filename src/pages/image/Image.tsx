import React, { useState, ChangeEvent } from "react"
import './Image.css';
const Image = () => {

    const [imageUrl, setImageUrl] = useState('');

    const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) setImageUrl(URL.createObjectURL(files[0]))

        console.log(e.target.files);
    }

    return (<>
        <div className="container">
            <div>
                <img src={imageUrl} alt='Selected Image'></img>
                <input type="file" onChange={uploadImage} />
            </div>

        </div>
    </>)
}

export default Image;