import * as React from 'react';
type Props = {
    onOpenTaskForm: () => void;
    isCompletedTasksHidden: boolean;
    onClickHideShowButton: () => void;
};
export declare const HeaderButtons: React.FC<Props>;
export {};
