import React, {useEffect, useRef, useState} from 'react';
import '../styles/UploadImage.scss'
interface UploadImageProps{
    myFiles: File[];
    setMyFiles: (myFiles: File[])=>void;
    old_images?: string[];
}
const UploadImage: React.FC<UploadImageProps> = ({setMyFiles, myFiles, old_images}) => {

     const filePicker = useRef<any>(null);
     const [previewUrl, setPreviewUrl] = useState<string[]>([]);

     useEffect(()=>{
         return () =>{
             previewUrl.map(url=>URL.revokeObjectURL(url))
         }
     })
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
             <div className='images__new'>{old_images?.map((url, i)=>
                 <div key={i} className={'images__preview'}>
                     <img
                         src={url}
                         alt="oops"/>
                 </div>
             )}</div>
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
             <div className='images__new'>
                 {previewUrl.map((url, i)=>
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