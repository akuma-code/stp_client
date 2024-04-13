import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField } from '@mui/material';
import * as React from 'react';
import { AiOutlineMenuFold } from "react-icons/ai";
import { Form } from 'react-router-dom';
import { AvatarButtonTooltip } from '../../../Components/UI/AvatarButtonTooltip';
import { useFilterContext } from '../../../Hooks/useFilterContext';
import { useToggle } from '../../../Hooks/useToggle';
import { routePaths } from '../../routePath';
import { observer } from 'mobx-react-lite';

type LoginDialogProps = {};
export const LoginDialog = observer((props: LoginDialogProps) => {
    const [open, modal] = useToggle(false);
    const { auth } = useFilterContext();
    return (
        <>
            <AvatarButtonTooltip
                icon={ <AiOutlineMenuFold color={ '#000000' } /> }
                tooltip_title='Дополнительно'
                action={ modal.toggle } />
            <Dialog
                open={ open }
                onClose={ modal.off }
                keepMounted
            >
                <DialogTitle>Панель админа</DialogTitle>
                <DialogContent>
                    <Form onSubmit={ (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault()
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        // auth.login(formJson.login, formJson.pass)
                        auth.login(formJson.pass)
                        console.log(formJson);
                        modal.off();
                        // return formData
                    } }
                        action={ routePaths.old }
                        id='authform'
                    >

                        {/* <InputLabel id='name-input-label' htmlFor='name-input'>Login</InputLabel>
                        <TextField variant='filled' name='login' id='name-input' /> */}

                        <InputLabel id='pass-input-label' htmlFor='pass-input' >Введите пароль</InputLabel>
                        <TextField variant='filled' name='pass' id='pass-input' type='password' size='small' autoComplete='on' />
                    </Form>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' form='authform'>ОК</Button>
                    <Button type='reset' form='authform'>Сбросить</Button>
                    <Button onClick={ modal.off }>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </>
    );
})

LoginDialog.displayName = '__Login Window'