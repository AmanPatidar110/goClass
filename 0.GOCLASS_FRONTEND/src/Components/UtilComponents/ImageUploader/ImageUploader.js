import { React, useContext, useEffect, useState } from 'react';

import "./ImageUploader.css";

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { StripContext } from '../../../App';



function ImageUploader(props) {



    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const [, setOpenStrip, stripMessage, setStripMessage] = useContext(StripContext)

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {

        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile]);


    const onFileChange = (e) => {
        console.log(e.target.files[0]);

        const typeArray = [
            'image/png',
            'image/jpeg',
            'image/jpg'
        ]
        const fileType = (e.target?.files[0])?.type;

        if(!typeArray.includes(fileType)) {
            setOpenStrip(true);
            setStripMessage("Please select appropriate file type");
            return;
        }

        props.setImage(e.target.files[0]);

        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])

    }





    return (
        <div className="ImageUploader">
            <input className="file-upload" type="file" onChange={(e) => onFileChange(e)} />
            {!props.image ? (<AddAPhotoIcon className="personIcon" />) : (<img src={preview} alt="profileImg" className="profileImg" ></img>)}
            <PhotoCameraIcon className="uploader" />
        </div>
    )
}

export default ImageUploader
