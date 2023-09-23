import React, {useRef, useState} from 'react';
import {Field, Form, Formik, FormikHelpers} from "formik";
import '../styles/Modal.scss'
import {IHero} from "../types/hero";
import {useTypedDispatch} from "../hooks/useTypedDispatch";
import {createHero} from "../store/reducers/heroActionCreators";

interface ModalProps {
    hero?: IHero;
    modal: string,
    setModal: (modal: string)=>void
}
interface Values {
    id: string;
    nickname: string,
    real_name: string,
    origin: string,
    superpowers: string,
    phrase: string
}
const Modal: React.FC<ModalProps> = ({modal, setModal, hero}) => {
    const dispatch = useTypedDispatch()
    const filePicker = useRef<any>(null);
    const [myFile, setMyFile] = useState<File[]>([]);
    function dropHandler(event: any) {
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer?.files || event.target.files;
        if (files[0] !== undefined) {
            setMyFile(files)
        }
    }
    function dragEnterHandler(event: any) {
        event.preventDefault()
        event.stopPropagation()
    }

    function dragLeaveHandler(event: any) {
        event.preventDefault();
        event.stopPropagation();
    }
    const empty = {
        id: '',
        nickname: '',
        real_name: '',
        origin: '',
        superpowers: '',
        phrase: '',
    }
    return (
        <div className={`modal${modal!=='none'?' modal_active':''}`}>
            <Formik
                initialValues={empty}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {
                    console.log(values)
                    let formData = new FormData()
                    formData.append('id', values.id)
                    formData.append('nickname', values.nickname)
                    formData.append('real_name', values.real_name)
                    formData.append('origin', values.origin)
                    formData.append('superpowers', values.superpowers)
                    formData.append('phrase', values.phrase)
                    console.log(myFile)
                    for (let file of myFile){
                        formData.append('images', file);
                    }
                    console.log(formData)
                    dispatch(createHero(formData))
                    setSubmitting(false);
                }}
            >
                <Form className='modal__form'>
                    <div className='modal__body'>
                        <div className='modal__inputs'>
                            <label htmlFor="nickname">Nickname</label>
                            <Field id="nickname" name="nickname" placeholder="nickname" />

                            <label htmlFor="real_name">Real Name</label>
                            <Field id="real_name" name="real_name" placeholder="real_name" />
                            <label htmlFor="superpowers">Superpowers</label>
                            <Field
                                id="superpowers"
                                name="superpowers"
                                placeholder="Superpowers"
                            />
                            <label htmlFor="phrase">Catch Phrase</label>
                            <Field
                                id="phrase"
                                name="phrase"
                                placeholder="Catch Phrase"
                            />
                            <label htmlFor="origin">Origin Description</label>
                            <Field
                                id="origin"
                                name="origin"
                                placeholder="Description"
                                component='textarea'
                            />
                        </div>
                        <div className='modal__images'>
                            <input
                                type="file"
                                className='modal__hidden'
                                ref={filePicker}
                                multiple
                                onChange={dropHandler}
                                accept="image/*, .jpg"
                            />
                            <div
                                onDrop={dropHandler}
                                onClick={() => filePicker.current && filePicker.current.click()}
                                onDragEnter={dragEnterHandler}
                                onDragLeave={dragLeaveHandler}
                                onDragOver={dragEnterHandler}
                                className='modal__dropbox' >
                        </div>
                    </div>
                        <button onClick={()=>setModal('none')} className='modal__close'>&#10006;</button>
                    </div>
                    <button className='myButton modal__submit' type="submit">{modal}</button>
                </Form>

            </Formik>
        </div>
    );
};

export default Modal;