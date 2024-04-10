import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField } from '@mui/material';
import * as React from 'react';
import { AiOutlineMenuFold } from "react-icons/ai";
import { Form } from 'react-router-dom';
import { AvatarButtonTooltip } from '../../../Components/UI/AvatarButtonTooltip';
import { useFilterContext } from '../../../Hooks/useFilterContext';
import { useToggle } from '../../../Hooks/useToggle';

type LoginDialogProps = {};
export const LoginDialog = (props: LoginDialogProps) => {
    const [open, modal] = useToggle(false);
    const { auth } = useFilterContext();
    return (
        <>
            <AvatarButtonTooltip
                icon={ <AiOutlineMenuFold color={ '#000000' } /> }
                tooltip_title='Login'
                action={ modal.toggle } />
            <Dialog
                open={ open }
                onClose={ modal.off }
                keepMounted
            >
                <DialogTitle>Autorization</DialogTitle>
                <DialogContent>
                    <Form onSubmit={ (event: React.FormEvent<HTMLFormElement>) => {
                        // event.preventDefault()
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        // auth.login(formJson.login, formJson.pass)
                        console.log(formJson);
                        modal.off();

                    } }

                        id='authform'
                    >

                        <InputLabel id='name-input-label' htmlFor='name-input'>Login</InputLabel>
                        <TextField variant='filled' name='login' id='name-input' />

                        <InputLabel id='pass-input-label' htmlFor='pass-input'>Password</InputLabel>
                        <TextField variant='filled' name='pass' id='pass-input' />
                    </Form>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' form='authform'>Submit</Button>
                    <Button type='reset'>Reset</Button>
                    <Button onClick={ modal.off }>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
