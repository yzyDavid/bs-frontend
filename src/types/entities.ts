export interface Word {
    word: string;
    meaning: string;
};

export interface StudyState extends Word {
    todays: Word[];
};
