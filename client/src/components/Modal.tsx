import React, {useState} from 'react';
import {Field, Form, Formik, FormikHelpers} from "formik";
import '../styles/Modal.scss'
import {useTypedDispatch} from "../hooks/useTypedDispatch";
import {createHero, editHero} from "../store/reducers/heroActionCreators";
import UploadImage from "./UploadImage";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {setCurrentHero, setModal, updateHero} from "../store/reducers/heroSlice";

interface ModalProps {
    modal: string,
}
interface Values {
    id: string;
    nickname: string,
    real_name: string,
    origin: string,
    superpowers: string,
    phrase: string
}
const Modal: React.FC<ModalProps> = ({modal}) => {

    const dispatch = useTypedDispatch()
    const hero = useTypedSelector(state => state.heroReducer.currentHero)
    const [myFiles, setMyFiles] = useState<File[]>([]);
    const initial = {
        id: hero?.id || '',
        nickname: hero?.nickname || '',
        real_name: hero?.real_name || '',
        origin: hero?.origin || '',
        superpowers: hero?.superpowers || '',
        phrase: hero?.phrase || '',
    }

    const closeModal = ()=>{
       dispatch(setModal('none'))
        modal==='edit' && dispatch(setCurrentHero(null))

    }

    const sendForm = (values: Values) =>{
        let formData = new FormData()
        formData.append('id', values.id)
        formData.append('nickname', values.nickname)
        formData.append('real_name', values.real_name)
        formData.append('origin', values.origin)
        formData.append('superpowers', values.superpowers)
        formData.append('phrase', values.phrase)
        formData.append('old_images', JSON.stringify(hero?.images) || '')
        for (let file of myFiles){
            formData.append('images', file);
        }
        if(modal==='add'){
            dispatch(createHero(formData))
        }else {
            dispatch(editHero(formData))
        }
        dispatch(setModal('none'))
    }

    return (
        <div className='modal'>
            <Formik
                initialValues={initial}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {
                    sendForm(values)
                    setSubmitting(false);
                }}
            >
                <Form className='modal__form'>
                    <button type='button' onClick={closeModal} className='modal__close'>&#10006;</button>
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
                        <UploadImage old_images={hero?.images} myFiles={myFiles} setMyFiles={setMyFiles}/>
                    </div>
                    <button className='myButton modal__submit' type="submit">{modal}</button>
                </Form>

            </Formik>
        </div>
    );
};

export default Modal;