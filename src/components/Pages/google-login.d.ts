declare module 'react-google-login' {
    import { Component } from 'react';

    export interface GoogleLoginProps {
        clientId: string;
        buttonText?: string;
        onSuccess: (response: any) => void;
        onFailure: (response: any) => void;
        cookiePolicy?: string;
        render: (renderProps: { onClick: () => void; disabled?: boolean }) => JSX.Element;
    }

    export class GoogleLogin extends Component<GoogleLoginProps> { }
}
