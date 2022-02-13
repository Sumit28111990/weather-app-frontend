import React, { useState, ChangeEvent } from "react"
import Http from "../../utils/http";
import './Image.css';
const Image = () => {

    const [imageUrl, setImageUrl] = useState('');

    const [shortUrl, setShortUrl] = useState('');

    const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            setImageUrl(URL.createObjectURL(files[0]))
            Http.upload_image(files[0]).then(url => {
                setShortUrl(url);
            })
        }

    }


    return (<>
        <div className="container">
            <div>
                <div>
                    <img src={imageUrl} alt='Selected Image'></img>
                </div>
                <div>
                    <div>
                        <a href={shortUrl}>Image URL</a>
                    </div>
                    <div>
                        <input type="file" onChange={uploadImage} />
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Image;