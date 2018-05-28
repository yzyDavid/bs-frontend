export interface Word {
    word: string;
    meaning: string;
    remainTimes?: number;
};

export interface StudyState extends Word {
    todays: Word[];
    showMeaning: boolean;
};
