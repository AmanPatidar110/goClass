import { React, useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { StripContext } from '../../../App';

import './FileUploader.css'
import { useRef } from 'react';

function FileUploader(props) {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const inputRef = useRef();

    const [, setOpenStrip, stripMessage, setStripMessage] = useContext(StripContext);

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

        // const typeArray = [
        //     'image/png',
        //     'image/jpeg',
        //     'image/jpg',

        // ]
        // const fileType = (e.target?.files[0])?.type;

        // if (!typeArray.includes(fileType)) {
        //     setOpenStrip(true);
        //     setStripMessage("Please select appropriate file type");
        //     return;
        // }

        props.setFile(e.target.files[0]);

        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])

    }

    const uploaderClicked = () => {
        inputRef.current.click();
    }




    return (
        <div className="FileUploader" onClick={uploaderClicked}>
            <input className="file-upload" ref={inputRef} type="file" onChange={(e) => onFileChange(e)} />
            <Button className="upload_Button"  variant="contained" color="default"startIcon={<CloudUploadIcon />}> Upload </Button>
        </div>
    )
       
}

export default FileUploader
