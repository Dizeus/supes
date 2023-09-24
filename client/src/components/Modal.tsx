import React, {useRef, useState} from 'react';
import {Field, Form, Formik, FormikHelpers} from "formik";
import '../styles/Modal.scss'
import {IHero} from "../types/hero";
import {useTypedDispatch} from "../hooks/useTypedDispatch";
import {createHero} from "../store/reducers/heroActionCreators";
import UploadImage from "./UploadImage";

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
    const [myFiles, setMyFiles] = useState<File[]>([]);

    const empty = {
        id: hero?.id || '',
        nickname: hero?.nickname || '',
        real_name: hero?.real_name || '',
        origin: hero?.origin || '',
        superpowers: hero?.superpowers || '',
        phrase: hero?.phrase || '',
    }
    return (
        <div className={`modal${modal!=='none'?' modal_active':''}`}>
            <Formik
                initialValues={empty}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {
                    let formData = new FormData()
                    formData.append('id', values.id)
                    formData.append('nickname', values.nickname)
                    formData.append('real_name', values.real_name)
                    formData.append('origin', values.origin)
                    formData.append('superpowers', values.superpowers)
                    formData.append('phrase', values.phrase)
                    console.log(myFiles)
                    for (let file of myFiles){
                        formData.append('images', file);
                    }
                    console.log(values)
                    dispatch(createHero(formData))
                    setSubmitting(false);
                }}
            >
                <Form className='modal__form'>
                    <button onClick={()=>setModal('none')} className='modal__close'>&#10006;</button>
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
                        <UploadImage myFiles={myFiles} setMyFiles={setMyFiles}/>
                    </div>
                    <button className='myButton modal__submit' type="submit">{modal}</button>
                </Form>

            </Formik>
        </div>
    );
};

export default Modal;