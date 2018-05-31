export interface Word {
    word: string;
    meaning: string;
    remainTimes?: number;
};

export interface StudyState extends Word {
    todays: Word[];
    showMeaning: boolean;
};

export interface Wordbook {
    id: number;
    wordbookName: string;
}

export interface ManagementState {
    myWords: any[];
    wordbooks: Wordbook[];
};
