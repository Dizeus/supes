import React, {useState} from 'react';
import {Field, Form, Formik, FormikHelpers} from "formik";
import '../styles/Modal.scss'
import {useTypedDispatch} from "../hooks/useTypedDispatch";
import {createHero, editHero} from "../store/reducers/heroActionCreators";
import UploadImage from "./UploadImage";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {setCurrentHero, setModal} from "../store/reducers/heroSlice";

interface Values {
    id: string;
    nickname: string,
    real_name: string,
    origin: string,
    superpowers: string,
    phrase: string
}
const Modal = () => {

    const dispatch = useTypedDispatch()
    const {currentHero , modal} = useTypedSelector(state => state.heroReducer)
    const [myFiles, setMyFiles] = useState<File[]>([]);
    const initial = {
        id: currentHero?.id || '',
        nickname: currentHero?.nickname || '',
        real_name: currentHero?.real_name || '',
        origin: currentHero?.origin || '',
        superpowers: currentHero?.superpowers || '',
        phrase: currentHero?.phrase || '',
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
        formData.append('old_images', JSON.stringify(currentHero?.images) || '')
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
                <Form data-testid='modal' className='modal__form'>
                    <button type='button' onClick={closeModal} data-testid='closeModal' className='modal__close'>&#10006;</button>
                    <div className='modal__body'>
                        <div className='modal__inputs'>
                            <label htmlFor="nickname">Nickname</label>
                            <Field className='modal__input' id="nickname" name="nickname" placeholder="Superman..." />

                            <label htmlFor="real_name">Real Name</label>
                            <Field className='modal__input' id="real_name" name="real_name" placeholder="Clark Kent..." />
                            <label  htmlFor="superpowers">Superpowers</label>
                            <Field
                                className='modal__input'
                                id="superpowers"
                                name="superpowers"
                                placeholder="Lazers..."
                            />
                            <label htmlFor="phrase">Catch Phrase</label>
                            <Field
                                className='modal__input'
                                id="phrase"
                                name="phrase"
                                placeholder="Look in the sky..."
                            />
                            <label htmlFor="origin">Origin Description</label>
                            <Field
                                className='modal__input'
                                id="origin"
                                name="origin"
                                placeholder="Cripton - planet..."
                                component='textarea'
                            />
                        </div>
                        <UploadImage old_images={currentHero?.images} myFiles={myFiles} setMyFiles={setMyFiles}/>
                    </div>
                    <button className='myButton modal__submit' type="submit">{modal}</button>
                </Form>

            </Formik>
        </div>
    );
};

export default Modal;