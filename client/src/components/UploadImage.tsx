import React, {LegacyRef, useRef, useState} from 'react';
import '../styles/UploadImage.scss'
interface UploadImageProps{
    myFiles: File[];
    setMyFiles: (myFiles: File[])=>void;
}
const UploadImage: React.FC<UploadImageProps> = ({setMyFiles, myFiles}) => {

     const filePicker = useRef<any>(null);
    const [previewUrl, setPreviewUrl] = useState<string[]>([]);
     function dropHandler(event: any) {
         event.preventDefault();
         event.stopPropagation();
         const files = event.dataTransfer?.files || event.target.files;
         if (files[0] !== undefined) {
             const urls: string[] = []
             for(let file of files) {
                 urls.push(URL.createObjectURL(file))
             }
             setPreviewUrl(urls);
             setMyFiles(files)
         }
     }
     const removeNewImage = (url:string, i: number) => {
         setPreviewUrl(previewUrl.filter((img)=>img!==url))
         setMyFiles([...myFiles].filter((file, index)=>index!=i))
         URL.revokeObjectURL(url)
    }
     function dragEnterHandler(event: any) {
         event.preventDefault()
         event.stopPropagation()
     }
     function dragLeaveHandler(event: any) {
         event.preventDefault();
         event.stopPropagation();
     }

     return (
         <div className='modal__images images'>
             <input
                 type="file"
                 className='images__hidden'
                 ref={filePicker}
                 multiple
                 onChange={dropHandler}
                 accept="image/*, .jpg"
             />
             <div className='images__title'>Upload a .jpg images of hero </div>
             <div
                 onDrop={dropHandler}
                 onClick={() => filePicker?.current && filePicker.current.click()}
                 onDragEnter={dragEnterHandler}
                 onDragLeave={dragLeaveHandler}
                 onDragOver={dragEnterHandler}
                 className='images__dropbox' >
             </div>
             <div>New Images</div>
             <div className='images__new'>{previewUrl.map((url, i)=>
                 <div key={i} className={'images__preview'}>
                     <img
                         src={url}
                         alt="oops"/>
                     <div onClick={()=>removeNewImage(url, i)} className="images__close">&#10006;</div>
                 </div>
             )}</div>
         </div>
     );
 };

 export default UploadImage;
//
// const UploadImage = () => {
//
//     const filePicker = useRef<any>(null);
//     const [isDragEnter, setDragEnter] = useState(false)
//     const [previewUrl, setPreviewUrl] = useState<string>();
//     const [isFileFetching, setIsFileFetching] = useState<boolean>(false);
//
//     const [result, setResult] = useState<Number>()
//     const uploadFile = async() =>{
//         try {
//             if(myFile !== undefined){
//                 setIsFileFetching(true)
//                 let formData = new FormData();
//                 formData.append("file", myFile);
//                /* const response = await api.uploadFile(formData);
//                 setIsFileFetching(false)
//                 if(response.data.approved === 1){
//                     setResult(1)
//                     setMyFile(undefined);
//                     setPreviewUrl(undefined);
//                 }else{
//                     setResult(2);
//                 }*/
//
//             }
//         } catch (error) {
//             console.log(error);
//             setMyFile(undefined);
//             setResult(2)
//         }
//     }
//
//
//     function dragEnterHandler(event: any) {
//         event.preventDefault()
//         event.stopPropagation()
//         setDragEnter(true)
//     }
//
//     function dragLeaveHandler(event: any) {
//         event.preventDefault();
//         event.stopPropagation();
//         setDragEnter(false);
//     }
//
//     function dropHandler(event: any) {
//         event.preventDefault();
//         event.stopPropagation();
//         const file = event.dataTransfer?.files[0] || event.target.files[0];
//         if (file !== undefined) {
//             setPreviewUrl(URL.createObjectURL(file));
//             setMyFile(file);
//             URL.revokeObjectURL(file);
//         }
//         setDragEnter(false);
//     }
//
//     return (
//         <div className={'img'}>
//             <div className={'img__title'}>
//                 Upload a .jpg images of hero
//             </div>
//             <input
//                 type="file"
//                 className={'hidden'}
//                 ref={filePicker}
//                 onChange={dropHandler}
//                 accept="image/*, .png, .jpg, .gif"
//             />
//             <div
//                 onDrop={dropHandler}
//                 onClick={() => filePicker.current && filePicker.current.click()}
//                 onDragEnter={dragEnterHandler}
//                 onDragLeave={dragLeaveHandler}
//                 onDragOver={dragEnterHandler}
//                 className={
//                     result === 2
//                         ? `${'img__dropbox'} ${'img__dropbox_error'}`
//                         : 'img__dropbox'
//                 }
//             >
//                 {previewUrl ? (
//                     <div className={'img__previewContainer'}>
//                         <img
//                             className={'img__preview'}
//                             src={previewUrl}
//                             alt="oops"
//                         />
//                     </div>
//                 ) : !isDragEnter ? (
//                     <p className={'img__instruction'}>
//                         <span>Drag here</span> your file or <span>Click here</span> to
//                         upload
//                     </p>
//                 ) : (
//                     <p className={'img__instruction'}>
//                         <span>Drop File</span>
//                     </p>
//                 )}
//             </div>
//
//             <div className={'img__files'}>
//                 {myFile ? `Image File Name: ${myFile.name}` : "No file selected"}
//             </div>
//             {myFile && result !== 2 && (
//                 <button
//                     onClick={uploadFile}
//                     className={isFileFetching?'img__uploading':'img__upload'}
//                 >
//                     {isFileFetching ? (
//                         <>
//                             <>Uploading...</>
//                                 <></>
//                         </>
//                     ) : (
//                         "Upload photo"
//                     )}
//                 </button>
//             )}
//
//         </div>
//     );
// };
//
// export default UploadImage;
