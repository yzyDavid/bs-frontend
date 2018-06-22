export interface Word {
    word: string;
    meaning: string;
    remainTimes?: number;
};

export interface StudyState extends Word {
    todays: Word[];
    showMeaning: boolean;
    showModal: boolean;
};

export interface Wordbook {
    id: number;
    wordbookName: string;
}

export interface ManagementState {
    myWords: any[];
    customWords: any[];
    wordbooks: Wordbook[];
    loading: boolean;
};

export interface DashboardState {
    recordDays: number;
    totalToStudy: number;
    totalStudied: number;
    totalWords: number;
    todayToStudy: number;
}
