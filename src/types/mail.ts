export interface MailGenContent {
    body: {
        name: string;
        intro: string;
        action: {
            instructions: string;
            button: {
                color: string;
                text: string;
                link: string;
            };
        };
        outro: string;
    };
}
