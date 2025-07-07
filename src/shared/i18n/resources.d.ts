declare const resources: {
    readonly en: {
        readonly homepage: {
            title: string;
            aiConversation: {
                form: {
                    textAreaPlaceholder: string;
                    buttonTitle: string;
                };
                greeting: string;
            };
            quoteBlock: {
                title: string;
                refreshButtonTitle: string;
            };
        };
        readonly authpage: {
            preloaderText: string;
            form: {
                emailPlaceholder: string;
                passwordPlaceholder: string;
                signInButtonTitle: string;
                signUpButtonTitle: string;
                signInGoogleButtonTitle: string;
            };
        };
        readonly common: {
            pageNames: {
                todo: string;
                news: string;
                weather: string;
                auth: string;
            };
            homeButtonTitle: string;
            logoutButtonTitle: string;
            loginButtonTitle: string;
            pagination: {
                prevBtnName: string;
                nextBtnName: string;
            };
            searchForm: {
                buttonName: string;
            };
        };
        readonly newspage: {
            title: string;
            searchForm: {
                placeholder: string;
            };
        };
        readonly todopage: {
            title: string;
            addTaskButtonName: string;
            showHideButton: {
                showName: string;
                hideName: string;
                titleOnHoverShow: string;
                titleOnHoverHide: string;
            };
            addTaskForm: {
                title: string;
                submitButtonName: string;
            };
            editTaskForm: {
                title: string;
                submitButtonName: string;
            };
            baseTaskForm: {
                titleLabel: string;
                titlePlaceholder: string;
                deadlineLabel: string;
                categoryLabel: string;
                descriptionLabel: string;
                descriptionPlaceholder: string;
                cancelButtonName: string;
            };
            tasksList: {
                listTitle: string;
                descriptionTitle: string;
                descriptionPlaceholder: string;
                emptyListMessage: string;
                emptyDescription: string;
            };
            taskItem: {
                editButtonName: string;
                deleteButtonName: string;
            };
        };
        readonly weatherpage: {
            title: string;
            header: string;
            country: string;
            currentCity: string;
            temperature: string;
            windSpeed: string;
            description: string;
            searchFormPlaceholder: string;
        };
    };
    readonly ru: {
        readonly homepage: {
            title: string;
            aiConversation: {
                form: {
                    textAreaPlaceholder: string;
                    buttonTitle: string;
                };
                greeting: string;
            };
            quoteBlock: {
                title: string;
                refreshButtonTitle: string;
            };
        };
        readonly authpage: {
            preloaderText: string;
            form: {
                emailPlaceholder: string;
                passwordPlaceholder: string;
                signInButtonTitle: string;
                signUpButtonTitle: string;
                signInGoogleButtonTitle: string;
            };
        };
        readonly common: {
            pageNames: {
                todo: string;
                news: string;
                weather: string;
                auth: string;
            };
            homeButtonTitle: string;
            logoutButtonTitle: string;
            loginButtonTitle: string;
            pagination: {
                prevBtnName: string;
                nextBtnName: string;
            };
            searchForm: {
                buttonName: string;
            };
        };
        readonly newspage: {
            title: string;
            searchForm: {
                placeholder: string;
            };
        };
        readonly todopage: {
            title: string;
            addTaskButtonName: string;
            showHideButton: {
                showName: string;
                hideName: string;
                titleOnHoverShow: string;
                titleOnHoverHide: string;
            };
            addTaskForm: {
                title: string;
                submitButtonName: string;
            };
            editTaskForm: {
                title: string;
                submitButtonName: string;
            };
            baseTaskForm: {
                titleLabel: string;
                titlePlaceholder: string;
                deadlineLabel: string;
                categoryLabel: string;
                descriptionLabel: string;
                descriptionPlaceholder: string;
                cancelButtonName: string;
            };
            tasksList: {
                listTitle: string;
                descriptionTitle: string;
                descriptionPlaceholder: string;
                emptyListMessage: string;
                emptyDescription: string;
            };
            taskItem: {
                editButtonName: string;
                deleteButtonName: string;
            };
        };
        readonly weatherpage: {
            title: string;
            header: string;
            country: string;
            currentCity: string;
            temperature: string;
            windSpeed: string;
            description: string;
            searchFormPlaceholder: string;
        };
    };
};
export type Namespaces = keyof (typeof resources)['en'];
export declare const namespaces: Namespaces[];
export default resources;
